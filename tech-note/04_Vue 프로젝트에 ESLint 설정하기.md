# 04. Vue 프로젝트에 ESLint 설정하기

<br>

## :one: 필요한 라이브러리 설치하기

```bash
npm i -D eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue
```

- `eslint` : eslint 설정을 하기 위한 기본 라이브러리
- `eslint-plugin-vue` : vue에서 공식으로 권고하는 eslint plugin
  - `vue` 파일 안에 있는 `template`과 `script` 단을 검사한다.
  - 주로 문법 오류를 찾거나 `Vue Directives` 규칙에 어긋나거나 `Vue Style Guide`에 어긋나는지 확인한다. ([Vue Directives 참고 공식 문서](https://vuejs.org/v2/api/#Directives) / [Vue Style Guide 참고 공식 문서](https://vuejs.org/v2/style-guide/))

- `eslint-config-prettier`, `eslint-plugin-prettier`
  - `eslint`가 제공하는 formatting 기능보다 더 강화된 formatting을 제공하는 `prettier`가 있다.
  - 다만, `eslint`와 `prettier`를 동시에 설치하면 서로 충돌되는 옵션이 생길 수 있기 때문에 `eslint`를 base로 하고 이를 기준으로 `prettier` 관련 옵션들을 통합하는 방식으로 구성하는 것이 대부분이다.
  - 그래서 `prettier` 라이브러리를 단독으로 설치하는 대신에 `eslint-config-prettier`와 `eslint-plugin-prettier` 두 라이브러리를 추가로 설치하여 eslint가 적용될 때 통합으로 동시에 적용시킬 수 있다.

<br>

## :two: `eslint` 설정 - `.eslintrc.js`

```javascript
module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: true,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 120,
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
```

- `root`
  - 현재 폴더 위치를 기준으로 하위의 파일에 린트를 적용한다.
  - `root: true` 옵션을 작성하면 현재 `eslintrc` 파일을 기준으로 ESLint 규칙을 적용할 수 있다.
- `env`
  - 프로젝트의 사용 환경(ex. `node`, `jest` etc)을 작성한다.
  - 참고로`node: true` 옵션을 추가해야 `process.env.NODE_ENV`와 같은 값들을 올바르게 인식할 수 있다.
- `parserOptions`
  - 자바스크립트 버전(`ecmaVersion`), 모듈 사용 여부를 작성한다.
  - 참고로 위와 같이 `parser: 'babel-eslint'` 옵션을 추가하면 `import`, `export`와 같은 ES6 문법을 에러 없이 사용할 수 있다. ([참고 문서](https://eastflag.co.kr/frontend/frontend-webpack/babel-%EA%B3%BC-eslint-%EC%84%A4%EC%A0%95/))
  - 그렇기 때문에 `npm i -D babel-eslint` 명령어로 `babel-eslint` 라이브러리를 추가로 설치하자.

- `extends`

  - 린트의 기본으로 설정한 문법 규칙 외에 추가적인 규칙들을 적용할 때 `extends`의 배열에 추가하면 된다.(확장 설정)
  - 즉, 다른 사람들이 미리 정해놓은 규칙을들 추가한다고 생각하면 된다.

  - `eslint:recommended` : eslint 공식 홈페이지에서 제공하는 기본 base 규칙 ([ESLint 기본 규칙 공식 문서](https://eslint.org/docs/rules/))
  - `plugin:vue/essential` : base 규칙과 함께 에러를 내는 코드와 예상하지 못한 결과를 발생하는 코드를 예측
  - `plugin:prettier/recommended` : prettier 관련 권고 규칙 추가

- `plugins`
  - npm 으로 설치하여 사용할 수 있는 확장 규칙을 의미한다.
  - 유명한 플러그인으로 `prettier`, `import`, `jsx-a11y` 등이 있다.

- `rules`

  - 린트를 실행할 때 사용자가 임의로 규칙을 추가하여 검사에서 제외하거나 추가하는 속성이다.
  - `prettier/prettier` 를 key 값으로 설정하고 value로 위 예시와 같이 배열 형태로 설정을 선언하면 prettier의 기본 규칙을 원하는 대로 커스텀할 수 있다.
  - 이 때 첫 번째 원소에는 두 번째 원소에 작성한 설정들에 어긋날 때 어떻게 처리할 것인지 결정할 수 있다.
    - `0 또는 'off'` : 에러 검출을 하지 않음
    - `1 또는 'warn'` : 경고 표시
    - `2 또는 'error'` : 에러 표시

  - [prettier 참고 공식 문서](https://prettier.io/docs/en/options.html)를 보고 개인 선호에 따라 prettier 문법 규칙을 적용하면 된다.

<br>

## :three: `.eslintignore`

```text
node_modules
dist
```

- `.eslintrc.js` 파일과 동일한 루트 디렉토리 위치에 위와 같은 `.eslintignore` 파일을 구성하면 여기에 작성된 위치의 파일들은 ESLint를 적용하지 않겠다는 의미이다.

<br>

## :four: auto fix

- 지금까지 설정된 ESLint 규칙을 적용하기 위해 `package.json`에 새로운 명령어를 다음과 같이 추가하면 된다.

```json
{
  "scripts": {
    "fix": "eslint --fix --ext .js,.vue src"
  }
}
```

- 위와 같이 작성한 후 `npm run fix` 명령어를 입력하면 `.eslintignore`에 설정된 디렉토리 외의 모든 파일에 설정한 ESLint 규칙이 적용된다.
  - `--fix` 옵션으로 ESLint 규칙에 어긋나는 부분은 자동으로 수정해준다.

- 그리고 추가적으로 VSCode의 extension으로 prettier가 설치되어 있다면 비활성화하고 루트 디렉토리에 `.vscode` 폴더 생성 후 그 안에 `settings.json` 파일을 생성하여 아래와 같은 내용을 작성한다.

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

- 이와 같이 하는 이유는 파일을 수정하고 저장할 때 ESLint 규칙에 맞도록 자동으로 수정해주고 수동으로 설정한 ESLint rule과 별도로 설치한 prettier extension의 설정과 충돌이 날 수 있는 우려가 있기 때문에 ESLint extension만 설치하고 prettier extension은 비활성화하는 것을 추천한다.

