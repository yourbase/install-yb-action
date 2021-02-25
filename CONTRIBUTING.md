# Developing install-yb-action

First, generate a new personal access token to access the yourbase/yb repository:
https://github.com/settings/tokens/new?scopes=public_repo

GitHub Actions inputs are passed in as environment variables starting with
`INPUT_` and this action is a Node.js script, so you can test the action locally
using yb. (How circular!)

```shell
yb build --no-container &&
yb run --no-container -e INPUT_TOKEN=${TOKEN?} -- node dist/index.js
```
