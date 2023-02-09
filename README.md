<br />
<h1 align="center">
<image src="https://user-images.githubusercontent.com/44824320/215273231-7a7f2058-b4fa-49ea-beae-7cf693b38fb6.png" width="50" /> <br />
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

## 실행

```shell
npm install
npm start
```

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
