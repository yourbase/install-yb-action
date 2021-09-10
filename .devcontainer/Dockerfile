# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.192.0/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 14, 12
ARG VARIANT="16-buster"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

RUN \
  curl -fsSLo /usr/share/keyrings/yourbase.asc https://apt.yourbase.io/signing-key.asc && \
  echo "deb [arch=amd64 signed-by=/usr/share/keyrings/yourbase.asc] https://apt.yourbase.io stable main" > /etc/apt/sources.list.d/yourbase.list && \
  apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends yb
