# 03. Webpack `alias` 설정 추가하기

<br>

## :one: `alias` 설정 추가하기

- vue.js나 react를 이용해서 프로젝트를 진행할 때 다른 파일들을 불러올 때 두 가지 방법이 존재한다.
  - 상대 경로 : `import Button from '../../components/Calculator/Button.vue'`
  - 절대 경로 : `import Button from '@/components/Calculator/Button.vue'`
- 상대 경로와 같이 파일의 위치가 먼 곳에 위치한 경우 `../`와 같은 부분이 길어져 다소 복잡해질 수 있다.
- 이와 같은 문제를 해결하기 위해 `alias` 라는 별칭을 지정하여 절대 경로 방식을 설정할 수 있다.

```javascript
// webpack.config.js 하단에 resolve 옵션 추가
module.exports = {
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
}
```

- `resolve` 옵션은 webpack이 알아서 경로나 확장자를 처리할 수 있게 도와주는 옵션이다.
- `resolve`에 자주 사용되는 속성으로 `alias`, `extensions` 등이 있다.
- 지금은 사용하지 않았지만 `extensions`은 배열 형태로 확장자명을 작성하여 해당 파일들을 불러올 때는 파일명 끝에 확장자를 작성하지 않도록 해준다.

```javascript
// extensions 사용 예시
resolve: {
  extensions: ['.js', 'json', '.scss'],
}
```

- `alias`는 위 예시와 같이 특정 별칭 값을 지정하여 시작 기준 경로를 설정할 수 있다.
  - `path.join(__dirname, 'src')`와 같이 작성하면 프로젝트 루트 경로를 기준으로 `src/`와 같은 의미가 된다.