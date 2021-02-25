/*
@license

Copyright 2021 YourBase Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

SPDX-License-Identifier: Apache-2.0
*/

import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import * as os from 'os';
import * as path from 'path';

import { addPath, getInput, setFailed } from '@actions/core';
import { getOctokit } from '@actions/github';

const getArchOsString = () => {
  const osName = os.platform();
  const jsArch = os.arch();
  let archName: string;
  if (jsArch === 'x64') {
    archName = 'amd64';
  } else if (jsArch === 'x32') {
    archName = '386';
  } else {
    archName = jsArch;
  }
  return `${osName}_${archName}`;
};

const runCommand = (command: string, args: string[]): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const proc = spawn(command, args, { stdio: 'inherit' });
    proc.on('exit', (code) => {
      if (code === 0) {
        resolve(undefined);
      } else {
        reject(new Error(command + ' exited unsuccessfully'));
      }
    });
  });
};

(async () => {
  try {
    const octokit = getOctokit(getInput('token'));

    const ybRepo = {owner: 'yourbase', repo: 'yb'};
    const versionTag = getInput('version');
    let release;
    if (!versionTag || versionTag === 'latest') {
      release = (await octokit.repos.getLatestRelease({
        ...ybRepo
      })).data;
    } else {
      release = (await octokit.repos.getReleaseByTag({
        ...ybRepo,
        tag: versionTag,
      })).data;
    }
    const archOsString = getArchOsString();
    console.log('Using yb version %s for %s', release.tag_name, archOsString);

    const home = os.homedir();
    const destdir = path.join(home, 'yb-' + release.tag_name);
    let alreadyInstalled = false;
    try {
      await fs.mkdir(destdir);
    } catch (error) {
      console.log('yb already installed at %s', destdir);
      alreadyInstalled = true;
    }
    if (!alreadyInstalled) {
      const expandedDirName = `yb_${release.tag_name}_${archOsString}`;
      const assetName = expandedDirName + '.zip';
      const asset = release.assets.find((asset) => asset.name === assetName);
      if (!asset) {
        throw new Error('Could not find asset ' + assetName);
      }
      const zipFileLocation = path.join(home, assetName);
      await runCommand('curl', ['-fsSLo', zipFileLocation, asset.browser_download_url]);
      await runCommand('unzip', ['-j', '-d', destdir, zipFileLocation, expandedDirName + '/yb'])
      console.log('Installed in %s', destdir);
    }
    addPath(destdir);
  } catch (error) {
    setFailed(error);
  }
})();
