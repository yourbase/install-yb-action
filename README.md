# Install yb GitHub Action

This GitHub Action installs [yb][], the [YourBase][] build tool, into your
GitHub Action runner.

[yb]: https://github.com/yourbase/yb
[YourBase]: https://yourbase.io/

## Usage

```yaml
name: Build
jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
    - name: Check out code
      uses: actions/checkout@v2
    - name: Install yb
      uses: yourbase/install-yb-action@main
      with:
        # Pin to a specific version of yb. If omitted, defaults to the latest release.
        version: v0.6.3
    - name: Build
      run: yb build
```

## Inputs

### `version`

Version tag of yb to install (like v0.6.1)

### `token`

GitHub access token to use inside the [yb][] build environment. Defaults to
`${{ github.token }}`.

## Contributing

We welcome contributions to this project! Please see the [contributor's guide][]
for more information.

[contributor's guide]: CONTRIBUTING.md

## License

This project is licensed under an [Apache 2.0 license](LICENSE).
