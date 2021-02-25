# Install yb GitHub Action

This GitHub Action installs [yb][], the [YourBase][] build tool, into your
GitHub Action runner.

[yb]: https://github.com/yourbase/yb
[YourBase]: https://yourbase.io/

## Usage

```yaml
- name: Install yb
  uses: yourbase/install-yb-action@main
  with:
    # Pin to a specific version of yb. If omitted, defaults to the latest release.
    version: v0.6.1
- name: Build
  run: yb build
```

## Inputs

### `version`

Version tag of yb to install (like v0.6.1)

### `token`

GitHub access token for reading the [yourbase/yb][yb] repository


## Contributing

We welcome contributions to this project! Please see the [contributor's guide][]
for more information.

[contributor's guide]: CONTRIBUTING.md

## License

This project is licensed under an [Apache 2.0 license](LICENSE).
