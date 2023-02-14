<br />
<h1 align="center">
<image src="./docs/icon.png" width="50" /> <br />
Gatsby로 BLOG 만들기
</h1>

## Gatsby를 선택한 이유

- 예전에 jeklly를 이용하여 blog를 만들었는데 jeklly에 사용하는 Ruby 사용이 익숙하지 않고, 검색을 해도 많은 자료가 없어서 완성 후 블로그 기능을 업데이트 하기가 어려웠습니다.
- Gatsby는 React 환경을 제공하기 떄문에, 익숙한 개발 환경에서 블로그를 만들 수 있다고 생각하였습니다.

## Use Stack

| Kinds               | Description                                                                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Framework & Library | <img src="https://img.shields.io/badge/Gatsby.js-663399?style=for-the-badge&logo=Gatsby&logoColor=white" /> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" /> |
| Language            | <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />                                                                                                   |
| CSS framework       | <img src="https://img.shields.io/badge/tailwind CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />                                                                                                |
| Deploy              | <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">                                                                                                             |

## 코드 실행 하기

```shell
npm install
npm start
```

localhost:8000 접속

## 목차

- [design](#design)
- [기능](#기능)
- [구현](#구현)

## Design

- ### [figma Design](https://www.figma.com/file/ngSymMJadxkT4UCs4lWVAl/tech-blog?node-id=1%3A2&t=5fpGpKMTXQFCVQTt-1)

## 기능

### 1. 반응형

화면 사이즈를 줄이면 블로그도 같이 크기가 변경된다.

|      nav menu       |         content         |
| :-----------------: | :---------------------: |
| ![](./docs/nav.gif) | ![](./docs/content.gif) |

### 2. 다크모드

블로그 다크모드 버튼을 클릭하게 되면 모드가 변경

|                        Full Screen                        |       mobile Screen        |
| :-------------------------------------------------------: | :------------------------: |
| <img src="./docs/fulldark.gif" width="550" height="250"/> | ![](./docs/mobiledark.gif) |

### 3. category menu horizon slider scroll

많은 카테고리 메뉴를 나열하기 위해 horizon scroll 구현

|                                      |
| ------------------------------------ |
| <img src="./docs/horizonscroll.gif"> |

### 4. Blog detail Page & comments

- category list의 항목을 클릭하면 blog페이지로 이동
- Blog Post 아래에 comments추가, utteranc.es을 이용하여 추가

|               Blog Detail Page               |                   Comments                    |
| :------------------------------------------: | :-------------------------------------------: |
| <img src="./docs/posts.gif"  width="390"  /> | <img src="./docs/comments.png" width="750" /> |

## 구현

### 레이아웃

![](./docs/layout.png)

### 폴더별 구조

```bash
├── blog-post
├── public
├── node_modules
├── gatsby-browser.ts
├── gatsby-config.ts
├── gatsby-node.ts
├── gatsby-ssr.ts
├── package.json
├── postcss.config.js
├── src
│   ├── components
│   ├── gatsby-types.d.ts
│   ├── hooks
│   ├── index.d.ts
│   ├── libs
│   ├── pages
│   └── styles
├── static
│   └── assets
├── tailwind.config.js
└── tsconfig.json
```

| 폴더                    | 역할                                                                        |
| ----------------------- | --------------------------------------------------------------------------- |
| `blog-post`             | 블로그 포스팅에 관련된 content md형식                                       |
| `public`                | 빌드된 파일을 배포하기 위해 저장                                            |
| `gatsby-browser.ts`     | Gatsby 브라우저 API 사용 설정 파일                                          |
| `gatsby-config.ts`      | Gatsby 설정파일, 블로그 정보 설정 및 추가 된 플러그인을 설정 하기 위한 파일 |
| `gatsby-node.ts`        | Gatsby node api 설정파일                                                    |
| `gatsby-ssr.ts`         | Gatsby server side rendering api 설정 파일                                  |
| `src`                   | 대부분의 gatsby 코드가 여기에 속한다                                        |
| `src/components`        | layout 및 공용으로 사용 할 수 있는 component를 설정                         |
| `src/hooks`             | 블로그 내에서 사용할 수 있는 hooks를 저장                                   |
| `src/libs`              | 공통으로 사용 할 수 있는 함수를 저장                                        |
| `src/pages`             | pages 하위의 디렉토리 이름에 따라 라우팅이 결정                             |
| `src/styles`            | tailwind 환경에서 css을 사용 할수 있도록 설정한 root css 파일               |
| `src/gatsby-types.d.ts` | Gatsby graphql query의 타입이 저장                                          |
| `src/index.d`           | typescript 예외적인 타입을 custom 설정                                      |
| `static`                | 블로그에 사용할 로컬 이미지 파일을 저장                                     |
| `tailwind.config.js`    | tailwind css를 설정할 수 있는 파일                                          |
| `tsconfig.json`         | typescript를 설정할 수 있는 파일                                            |

### nav 메뉴 url에 따라 border 표시하기

### 다크모드 라이트 모드

### 카테고리 메뉴 설정

### 자동 배포 설정

## 이슈

## 블로그 만들면서 배운 점
