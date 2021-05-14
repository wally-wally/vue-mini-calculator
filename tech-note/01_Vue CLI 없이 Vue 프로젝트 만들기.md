# 01. Vue CLI 없이 Vue 프로젝트 만들기

<br>

## :one: Opening

- 회사나 개인적으로 Vue.js를 이용해서 프론트엔드 개발을 자주 하고 있는데 그 때 Vue-CLI를 이용해서 프로젝트를 진행하고 있다.
- Vue-CLI 내부적으로 명령어 하나만 입력하면 자동으로 여러 가지 옵션들을 설정해주기 때문에 상당히 편리하다.
- 하지만 Vue-CLI로 만들어진 프로젝트의 내부 구조가 어떻게 이루어져있는지 모른다면 추후 추가적으로 커스텀해야하는 경우에 당황하여 어려움을 겪는 상황이 존재할 것이다.
- 그래서 이번 간단한 덧, 뺄셈 계산기 프로젝트를 통해서 직접 vue와 관련된 webpack 설정들을 직접 해보면서 vue 프로젝트를 어떻게 구성하는지 살펴보는 시간을 가졌다.

<br>

## :two: 필요한 라이브러리 설치

:star:  <b>`package.json`</b>

```json
{
  "name": "vue-mini-calculator",
  "version": "1.0.0",
  "description": "Mini Calculator using Vue.js without CLI",
  "main": "webpack.config.js",
  "scripts": {
    "serve": "webpack-dev-server --mode development",
    "build": "webpack"
  },
  "author": "wally-wally",
  "license": "ISC",
  "dependencies": 
    "vue": "^2.6.12"
  },
  "devDependencies": {
    "@babel/core": "^7.14.2",
    "@babel/preset-env": "^7.14.2",
    "babel-loader": "^8.2.2",
    "css-loader": "^5.2.4",
    "html-webpack-plugin": "^4.4.0",
    "vue-loader": "^15.9.7",
    "vue-style-loader": "^4.1.3",
    "vue-template-compiler": "^2.6.12",
    "webpack": "^4.44.0",
    "webpack-cli": "^3.3.0",
    "webpack-dev-server": "^3.11.0"
  }
}
```

- dependencies

  - `vue`
    - vue 프로젝트 구성시 필수적으로 설치해야하는 라이브러리

- devDependencies

  - `webpack`, `webpack-cli`
    - webpack을 구성하기 위해 두 라이브러리는 한 쌍으로 같이 꼭 설치해야 하며 webpack 관련 명령어를 실행하기 위해 `webpack-cli` 라이브러리를 함께 설치해줘야 한다.
  - `webpack-dev-server`
    - 실제 배포하기 전 로컬에서 개발 서버를 실행하여 프로젝트 실행 화면을 볼 때 필요하다.
  - `vue-loader`, `vue-template-compiler`
    - webpack 환경에서 vue 파일을 불러와 javascript 언어로 변환할 때 사용되고 여기도 마찬가지로 두 라이브러리가 한 쌍으로 같이 설치하는 것이 좋다.
    - cf) 대부분의 경우 `vue-template-compiler` 는 `vue-loader`와 함께 사용하며 매우 구체적인 빌드 환경을 구성해야하는 경우에는 단독으로 사용할 수 있다고 `vue-template-compiler` 공식 문서에 나와있다.

  - `css-loader`, `vue-style-loader`
    - `css-loader`: css 파일들을 읽어서 javascript에서 사용 가능한 string 형태로 반환해주는 역할
    - `vue-style-loader` : 일반적인 경우에는 `style-loader`를 사용하여  `css-loader`가 반환해준 값을 실제로 dom에 `<style>` 태그로 넣어주는데 `vue.js` 환경에서는 `vue-style-loader` 를 사용하면 된다.

  - `html-webpack-plugin`
    - entry point로 지정된 html 파일을 가져와 번들링된 javascript 파일을 삽입해주는 기능을 한다.
    - 그리고 나서 dist 폴더에 복사한다.
  - `babel-loader`, `@babel/core`, `@babel/preset-env`
    - `babel-loader` : babel과 webpack을 연결해주는 것 / `babel-loader` 만 설치하면 아무런 동작을 하지 않는다. 프로젝트 루트 경로에 `.babelrc` 파일을 만들거나 `webpack` 설정 파일에 ES6 코드를 트랜스파일링하기 위한 플러그인과 프리셋을 설정해줘야 한다.
    - `@babel/core` : 기본적인 babel(최신 문법 바꿔주는 babel), 트랜스파일링시 사용되는 코어 모듈
    - `@babel/preset-env` : 현재 사용중인 컴퓨터의 환경(브라우저)에 맞게 알아서 바꿔주는 것

> [참고] 바벨 관련 플러그인, 프리셋 설정 방법
>
> ```JSON
> // (1) `.babelrc` 파일 작성
> {
>   "presets": ["@babel/preset-env"]
> }
> ```
>
> ```javascript
> module.exports = {
>   module: {
>     rules: [
>       {
>         test: /\.js$/,
>         exclude: /node_modules/,
>         use: {
>           loader: "babel-loader",
>           options: {
>             presets: ["@babel/preset-env"]
>           }
>         }
>       }
>     ]
>   }
> };
> ```

> [참고] `Error: Cannot find module 'webpack-cli/bin/config-yargs'` 해결
>
> ![error](https://user-images.githubusercontent.com/52685250/118284548-8379d700-b50b-11eb-99a8-323485e64e6a.PNG)
>
> - `webpack`, `webpack-cli`, `webpack-dev-server`를 최신버전으로 설치하고 `npm run serve` 명령어를 입력하면 위와 같은 에러 메시지를 볼 수 있다.
>
> - `webpack-cli` 에 `config-yargs` 라는 모듈을 찾을 수 없다는 에러인데 이는 `webpack`과 관련된 라이브러리의 버전이 서로 호환되지 않아서 해당되는 모듈을 찾지 못하는 에러 현상이다.
>
> - 그래서 서로 호환되는 버전을 맞추기 위해 주로 아래와 같은 버전으로 세팅한다고 한다.
>
>   ```json
>   "devDependencies": {
>     "webpack": "^4.44.0",
>     "webpack-cli": "^3.3.0",
>     "webpack-dev-server": "^3.11.0"
>   }
>   ```
>
> - 설치하려는 라이브러리들의 <b><u>버전 관리</u></b>도 매우 중요한 포인트이다.

<br>

## :three: `webpack.config.js`

```javascript
module.exports = {
  entry: {},
  module: {},
  plugins: {},
  output: {},
}
```

| 요소    | 내용                                                         |
| ------- | ------------------------------------------------------------ |
| entry   | <ul><li>여러 js 파일들의 시작점 => 웹팩이 파일을 읽어 들이기 시작하는 부분</li><li>전체 애플리케이션 설치, 필요 라이브러리를 로딩하는 로직을 포함</li><li>웹팩으로 빌드(변환)할 대상 파일을 지정</li></ul> |
| module  | <ul><li>웹팩은 JS 만 변환 가능하기 때문에 HTML, CSS 등은 모듈을 통해서 웹팩이 이해할 수 있도록 변환이 필요하다.</li><li>변환 내용을 담는 곳</li></ul> |
| plugins | <ul><li>웹팩을 통해 번들된 결과물을 추가로 처리하는 부분</li><li>ex) 결과물의 사이즈를 줄이거나 결과물(기본적으로 JS)을 기타 CSS, HTML 파일로 분리하는 기능 등이 있음</li></ul> |
| output  | <ul><li>여러 js 파일을 <b>하나로 만들어 낸 결과물</b></li><li>결과물의 위치, 파일명 등 세부 옵션을 설정</li></ul> |

<br>

## (1) `entry`

```javascript
entry: {
  app: path.join(__dirname, 'src', 'main.js'),
},
```

- 엔트리 포인트는 단순히 `entry: './src/main.js'` 형태로 작성하면 하나의 포인트만 생성되지만 위 코드와 같이 object 형태로 작성하면 key 값으로 설정된 이름을 기준으로 여러 개의 엔트리 포인트를 만들 수 있다.
- `path.join()` 함수는 인자 값으로 들어온 string 값 들을 이어 붙여서 하나의 url 주소를 만들어주는 역할을 한다.
  - 여기서 `__dirname` 은 프로젝트의 최상위 위치(entry directory)를 의미한다.
    - 만약, django를 해본 경험이 있다면 `BASE_DIR`과 같은 역할이라고 생각하면 된다.

<br>

### (2) module

```javascript
// 파일 확장자명 정규 표현식 모음
const vueRegex = /\.vue$/;
const javascriptRegex = /\.js$/;
const cssRegex = /\.css$/;
```

```javascript
// webpack.config.js의 module 부분 발췌
module: {
  rules: [
    {
      test: vueRegex,
      use: 'vue-loader',
    },
    {
      test: javascriptRegex,
      exclude: /node_modules/,
      use: 'babel-loader',
    },
    {
      test: cssRegex,
      use: [
        'vue-style-loader',
        'css-loader'
      ],
    },
  ]
},
```

- webpack이 이해할 수 있도록 변환해주는 역할을 하는 loader를 설정할 때 `module` 부분에 작성한다.
- `rules` 라는 배열로 선언하여 각 파일별로 어떤 로더를 사용할 것인지 설정할 수 있다.
- `test`에는 로딩할 파일을 확장자명 형태의 정규 표현식을 작성하고 `use`에는 적용할 로더를 설정한다.
  - 만약 여러 개의 로더를 적용할 때는 배열 형태로 작성하고 이 때 <b>작성하는 로더의 순서가 매우 중요하니 이 점 유의하자!</b>

(작성중...)