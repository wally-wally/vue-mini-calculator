# 02. Vue 프로젝트에서 Sass 사용하기

<br>

## :one: 에러 메시지 확인

- 지금까지 구성된 환경에서 Sass를 사용하기 위해 아래와 같이 코드를 작성했다.

```scss
// src/assets/scss/style.scss(외부 scss 파일 불러오는 형태로 구성)

$fontLight: 300;
$fontBold: 600;

$color-primary: blue;
$color-warning: orange;
$color-error: crimson;
$color-success: green;
$color-info: gray;
```

```vue
<template>
  <div>
    <h1>Mini Calculator</h1>
  </div>
</template>

<style lang="scss" scoped>
@import './assets/scss/style.scss';

h1 {
  font-weight: $fontBold;
  color: $color-error;
}
</style>
```

> 참고로 `vue` 파일 내에서 `scss` 파일을 위와 같이 불러올 수 있고 `main.js` 상단에 `import './assets/scss/style.scss';` 와 같이 작성하여 외부 `scss` 파일을 불러올 수 있다.

- 위와 같이 코드를 구성한 후 `npm run serve` 로 로컬에서 서버를 구동하면 아래와 같은 에러 메시지가 출력되는 것을 볼 수 있다.

![01](https://user-images.githubusercontent.com/52685250/118351854-3c3a2780-b599-11eb-8ebe-fc4049572eab.PNG)

- 즉, Sass를 사용하기 위한 추가적인 loader를 설치해야하는 의미이다.

<br>

## :two: 필요한 라이브러리 설치

- sass를 사용하기 위해서는 아래 명령어와 같이 `node-sass`와 `sass-loader` 라이브러리를 설치해야한다.

```bash
npm i -D node-sass sass-loader
```

- `node-sass` : sass를 다룰 수 있는 node program 즉, `sass-loader`를 구동하는데 필요한 패키지 등이 `node-sass`에 있다. (sass/scss를 css로 컴파일 해주는 패키지)
- `sass-loader` : 실질적으로 webpack에서 sass를 읽는데 필요한 loader
  - 참고로 `node-sass`는 현재 유지 관리는 되고 있으나 폐지되었으므로 `dart-sass`를 사용하라는 이야기가 `node-sass`의 공식 repository에도 나와있다.

<br>

## :three: `webpack.config.js`에 `sass-loader` 추가

```javascript
{
  test: cssRegex,
  use: [
    'vue-style-loader',
    'css-loader'
  ],
},
```

- 우리는 저번 시간에 `webpack.config.js`의 `module` 부분에 위와 같이 `css` 파일과 관련된 loader 설정을 살펴본 적이 있다.
- 기존에는 `.css` 파일에만 적용했지만, 이제는 `.sass`, `.scss` 파일에 `sass-loader`를 적용시킬 것이다.

```javascript
const sassRegex = /\.s[ac]ss$/; // '.sass', '.scss' 파일에 적용

module.exports = {
  // 생략

  module: {
    rules: [
      // 생략
      {
        test: sassRegex,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  // 생략
};
```

- 기존에 `cssRegex`로 설정되어 있는 구문을 위와 같이 수정하면 된다.
- 이 때 중요한 것을 `use`에 작성한 loader들의 작성 순서이다. `use` 배열에 여러 개의 loader 들이 작성되어 있다면 뒤에 있는 loader에서  앞에 있는 loader로 차례대로 실행됨을 유의해야 한다. 위에 작성된 코드를 예로 들어 `sass` 파일이 어떻게 로드되는지 설명하면 다음과 같다.
  - `sass-loader`를 통해 sass 파일을 css 파일로 컴파일 - (1)
  - `css-loader`를 통해 css 파일들을 읽어서 javascript에서 사용 가능한 string 형태로 변환 - (2)
  - `(vue-)style-loader`를 통해 `css-loader`가 변환해준 값을 실제로 DOM에 `<style>` 태그로 넣음 - (3)

<br>

## :four: `sass-loader`, `node-sass` 버전 호환 관련 에러 해결하기

- `loader` 까지 설정하고 나서 `npm run serve`로 서버를 구동하면...

![02](https://user-images.githubusercontent.com/52685250/118351224-b072cc00-b595-11eb-8c47-cc85c5bc81eb.PNG)

- 따단! 새로운 에러 메시지가 출력되는 것을 볼 수 있다.
- 이 에러는 `sass-loader`와 `vue` 라이브러리 간에 버전이 서로 호환되지 않아서 생기는 문제이다.
- 우리는 앞에서 `sass-loader`를 설치할 때 특정 버전을 명시하지 않고 그냥 설치했기 때문에 최신 버전인 11 버전으로 설치된 것을 `package.json` 에서 볼 수 있다.
- 그래서 현재 프로젝트에 설치된 `vue` 라이브러리의 버전인 2.6.12와 올바르게 호환하기 위해 `sass-loader`를 10 버전 대역으로 다운그레이드 시켜서 재설치했다.

```bash
npm uninstall -D sass-loader
npm i -D sass-loader@10.1.1
```

- 그리고 나서 `npm run serve` 로 서버를 다시 구동하면 이번에는 `node-sass` 버전을 재조정하라는 에러 메시지가 출력된다.

![02](https://user-images.githubusercontent.com/52685250/118351919-8e7b4880-b599-11eb-8fa9-743a703a11d1.PNG)

- 그래서 기존의 6 버전의 `node-sass` 라이브러리를 삭제하고 5 버전의 `node-sass`를 재설치한 후 로컬에서 서버를 재구동했더니 아래 사진과 같이 스타일 속성들이 올바르게 적용된 것을 볼 수 있다.

```bash
npm uninstall -D node-sass
npm i -D node-sass@5.0.0
```

![03](https://user-images.githubusercontent.com/52685250/118351967-d1d5b700-b599-11eb-8704-790e7949bafc.PNG)

- 저번 시간에 살펴본 `webpack` 관련 버전 호환 이슈 해결과 이번 `sass` 관련 라이브러리들의 버전 호환 이슈 해결과 같이 프로젝트의 규모가 커지고 관리해야하는 라이브러리가 많아지게 될 때 꼭! 잊지 말고 각 라이브러리들의 <b><u>버전을 철저하게 관리</u></b>하는 것이 매우 중요하다!

<br>

## :five: `sass-loader`에 entry file 경로 설정하기

- 이번에는 `vue` 파일이나 `main.js`에 `scss` 파일을 불러오는 방식말고 `sass-loader` 옵션 설정에서 entry file을 불러오는 방식을 알아보도록 하자. (우선, 기존에 `App.vue`나 `main.js`에서 `style.scss` 파일 불러오는 구문을 제거하자.)

```javascript
// webpack.config.js의 module에서 sass 관련 설정 부분만 발췌

{
  test: sassRegex,
  use: [
    'vue-style-loader',
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        additionalData: `
          @import './src/assets/scss/style.scss';
        `
      },
    },
  ],
},
```

- 기존에 `webpack.config.js`의 `module`에서 `sass-loader` 불러온 구문을 제거하고 위와 같이 객체 형태로 작성한 `sass-loader` 상세 옵션을 작성하면 된다.
- `loader` 에는 적용할 loader 명을 작성하면 되고, `options`에는 `loader`에 작성한 로더의 상세 옵션을 작성하면 된다.
  - 이 때 `sass-loader`의 `options`에 여러 가지 옵션이 올 수 있는데 그 중 `additionalData`는 불러올 `sass` 및 `scss` 파일의 entry point를 지정할 수 있다.
  - 즉, 이 옵션에다가 기존에 `import`로 불러오는 구문을 여기에 작성하면 된다.
- 참고로 `webpack` 의 각 로더에 사용할 수 있는 옵션 값들은 공식 문서를 직접 살펴보면서 필요한 것을 가져다가 쓰면 된다.
  - `webpack`과 각 로더의 버전이 계속해서 업데이트되고 그에 따라 설정하는 옵션명들이 바뀌기 때문에 <b><u>항상 공식 문서를 살펴보는 습관</u></b>을 꼭 길들이도록 하자!

<br>

---

<br>

## :page_with_curl: 정리

:star: <b>`package.json`</b>

- 다른 부분 모두 동일하고 `node-sass`, `sass-loader`의 버전만 변경됨

```json
{
  "devDependencies": {
    "node-sass": "^5.0.0",
    "sass-loader": "^10.1.1",
  }
}
```

<br>

:star: <b>`webpack.config.js` > `module` > `sass-loader` 설정 부분</b>

- `cssRegex` 대신에 `sassRegex` 로 교체
- 기존에 단순히 string 형태인 `'sass-loader'`로 작성하는 것 대신에 아래와 같이 객체 형태로 `sass-loader`의 상세 옵션 작성

```javascript
const sassRegex = /\.s[ac]ss$/;

module.exports = {
  // 생략
  module: {
    rules: [
      // 생략
      {
        test: sassRegex,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @import './src/assets/scss/style.scss';
              `
            },
          },
        ],
      },
    ],
  },
};
```

