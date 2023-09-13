## Requirements

- `node` version >=14.17.1
- **windows os only:** [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) have been installed
- **mac os only:** Command Line Tools (CLT) for Xcode: xcode-select --install, [developer.apple.com/downloads](http://developer.apple.com/downloads) or [Xcode 3](https://apps.apple.com/us/app/xcode/id497799835)
- **arch linux os only:** [base-devel](https://archlinux.org/groups/x86_64/base-devel/) have been installed

## Getting started

Clone the repository
```zsh
git clone git@code.guanmai.cn:fe-x/gm_electron_x_mes.git
# or git clone https://code.guanmai.cn/fe-x/gm_electron_x_mes.git
```

Switch to the repo folder
```zsh
cd gm_electron_x_mes
```

Install dependencies **(If you are blocked by GFW, please read the [QA](#qa) section)**
```zsh
yarn install
```

Runs the app in the development mode
```zsh
yarn start
```

## Build

Building an electron application is restricted by the operating system. You can only build the electron desktop application of the system on the corresponding system, but it is possible to build it through a virtual machine and docker.
```zsh
yarn dist
```

**Note: If you have added [these plugins](#enhance-your-development-experience) to your editor, you rarely need to manually execute any of the above code specification related commands.**

## Enhance your development experience

The [vscode](https://code.visualstudio.com/) editor extensions listed below can enhance your development experience, and other editors should have similar plugins.

- [css modules](https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules)
- [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [dotenv](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
- [npm Dependency Links](https://marketplace.visualstudio.com/items?itemName=herrmannplatz.npm-dependency-links)
- [SVG Language Support](https://marketplace.visualstudio.com/items?itemName=jock.svg)

## Learn More

## QA
Q: `yarn upgrade` does not update package.json

A: ref https://github.com/yarnpkg/yarn/issues/2042
```zsh
yarn global add npm-check-updates
ncu -u
yarn install --check-files
ncu -u
```

Q: What to do if the dependencies cannot be downloaded due to network problems

A: ref https://npm.taobao.org/mirrors

First execute the following command to add the mirror, and then use `yarn install` to download the dependencies

```zsh
yarn config set registry https://registry.npm.taobao.org -g
yarn config set disturl https://npm.taobao.org/dist -g
yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/ -g
yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ -g
yarn config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/ -g
```

if it still does not work, you can try to use `yarn --ignore-optional` to skip the download of optional dependencies


