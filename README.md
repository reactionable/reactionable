<p align="center">
  <a href="/" target="_blank"><img src="https://repository-images.githubusercontent.com/215304880/02830f80-f11d-11e9-893a-20a50b13e17c" width="600"></a>
  <br/><br/>
  <a href="https://github.com/reactionable/reactionable/actions?query=workflow%3A%22Continuous+Integration%22" target="_blank"><img alt="Continuous integration" src="https://github.com/reactionable/reactionable/workflows/Continuous%20Integration/badge.svg"></a>
  <a href="https://codecov.io/gh/reactionable/reactionable" target="_blank"><img alt="Coverage Status" src="https://codecov.io/gh/reactionable/reactionable/branch/master/graph/badge.svg"></a>
  <a href="https://reactionable.github.io/reactionable/docs" target="_blank"><img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" /></a>
  <a href="https://github.com/reactionable/reactionable/blob/master/LICENSE" target="_blank"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" /></a>
  <a href="https://www.npmjs.com/search?q=%40reactionable" target="_blank"><img alt="npm" src="https://img.shields.io/npm/v/@reactionable/core"></a>
  <a href="CONTRIBUTING.md" target="_blank"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
  <a href="https://github.com/sponsors/neilime"><img src="https://img.shields.io/badge/%E2%9D%A4-Sponsor-ff69b4" alt="Sponsor"></a>
  <a href="https://github.com/reactionable/reactionable"><img alt="GitHub stars" src="https://img.shields.io/github/stars/reactionable/reactionable?logo=github"></a>
</p>

### 🏠 [Homepage](https://reactionable.github.io/reactionable/)

### 📖 [Documentation](https://reactionable.github.io/reactionable/docs)

### ✨ [Demo](https://reactionable.github.io/reactionable/storybook)

## Helping Project

❤️ If this project helps you reduce time to develop and/or you want to help the maintainer of this project. You can [sponsor](https://github.com/sponsors/neilime) him. Thank you !

## Contributing

👍 If you wish to contribute to **Reactionable**, please read the [CONTRIBUTING.md](CONTRIBUTING.md) file, PRs are Welcome !

## Install

```sh
npm install @reactionable/core
```

Or with `yarn`

```sh
yarn add @reactionable/core
```

## Dev

### Use reactionable in local

#### 1. In **reactionable** dir

```bash
yarn run link;
yarn start
```

#### 2. In react app dir

```bash
for package in react react-dom aws-amplify @reactionable/core @reactionable/ui-bootstrap @reactionable/amplify; do yarn link $package; done;
yarn start;
```

#### 3. Remove links when finish

```bash
for package in react react-dom aws-amplify @reactionable/core @reactionable/ui-bootstrap @reactionable/amplify; do yarn unlink $package; done;
```

### Run tests

```sh
yarn test
```

### Run storybook

```sh
yarn storybook
```

Visit: http://localhost:6006/

## Author

👤 **ESCEMI <contact@escemi.com>**

- Website: https://www.escemi.com
- Sponsor: https://github.com/sponsors/neilime
- Github: [@reactionable](https://github.com/reactionable)
- LinkedIn: [@https:\/\/www.linkedin.com\/company\/escemi](https://linkedin.com/in/https://www.linkedin.com/company/escemi)

## 📝 License

Copyright © 2020 [ESCEMI <contact@escemi.com>](https://www.escemi.com).<br />
This project is [MIT](https://github.com/reactionable/reactionable-cli/blob/master/LICENSE) licensed.
