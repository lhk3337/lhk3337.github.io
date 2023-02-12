---
slug: "/nextjs/desc"
date: "2023-02-01"
title: "nextjs란?"
categories: ["Nextjs"]
desc: "nextjs에 대해서 알아봅시다"
thumbnail: "./thumbnail.png"
---

next js는 Server Side Rendering

- 느린 속도로 인터넷을 이용하면 브라우저는 모든 자바스크립트와 react.js코드를 모두 가져오고 UI에 표시 (Client Side Rendering)
- 유저가 접속하면 바로 HTML을 미리 보내 생성

## 1. next js에서 routing 사용법

### next js 라우팅은 pages폴더의 파일 이름을 경로로 사용한다.

- pages의 index.js만이 root 경로가 된다.
- pages폴더의 파일이 about.js이면 경로는 **localhost:3000/about** 이 된다.

### 링크 태그는 a태그 대신 Link태그 사용

```jsx
import Link from "next/link";
<Link herf="/">Home</Link>;
```

### **만일 Link태그 안에 속성을 사용하고 싶으면 link 태그 안에 a태그를 추가한다.**

```jsx
<Link href="/">
  <a className="home">Home</a>
</Link>
```

### **현재 페이지에서 routing 정보를 확인하려면 useRouter를 사용하면 됨**

```jsx
import { useRouter } from 'next/router'
const router = useRouter();
console.log(router) // {pathname: '/', route: '/', query: {…}, asPath: '/', components: {…}, …}
...
```

## 2. CSS

### CSS Modules

css를 사용할때 `**파일명.modules.css**`로 이름을 붙여야 한다.

**NavBar.js**

```jsx
import styles from "./NavBar.module.css";

...

<a className={`${styles.link} ${router.pathname === "/" ? styles.active : ""}`}>Home</a>
// 백틱 방식
HTML -> <a class="link active">Home</a>

  <a className={[styles.link, router.pathname === "/about" ? styles.active : ""].join(" ")}>About</a>
// 배열 방식
```

**Navbar.module.css**

```css
.link {
  text-decoration: none;
}

.active {
  color: tomato;
}
```

### styles JSX

- 컴포넌트에 style jsx를 선언하면 그 컴포넌트에서만 적용되고 하위 컴포넌트나 상위 컴포넌트에 영향을 주지 않는다.
- 크롬에서 Element로 class를 확인 해보면 중복되지 않게 랜덤으로 클래스를 만든다.

```css
크롬 개발자도구에서 나타난 모습 .active.jsx-a7f96dab9380f5e4 {
  color: yellow;
}
```

styles JSX 선언하기

```jsx
....
<nav>
      <Link href="/">
        <a className={router.pathname === "/" ? "active" : ""}>Home</a>
      </Link>
      <Link href="/about">
        <a className={router.pathname === "/about" ? "active" : ""}>About</a>
      </Link>

      <style jsx>{`
        nav {
          background-color: tomato;
        }
        a {
          text-decoration: none;
        }
        .active {
          color: yellow;
        }
      `}</style>
    </nav>
....
```

## 3. Custom App

- Custom App이 가장 먼저 랜더링 됨
- global Style을 적용할 수 있음
- Custom App이 CSS를 import 할 수 있음

### nextjs에서 랜더링 순서

1. \_app.js를 자동적으로 먼저 랜더링
2. 그 후 index.js 랜더링
3. 그 다음 나머지 랜더링

**\_app.js**

```jsx
import NavBar from "../components/NavBar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} /> // about과 index component가 렌더링됨
      <style jsx global>
        {`
          a {
            color: green; // style을 전역적으로 설정하는 방법
          }
        `}
      </style>
    </>
  );
}
```

## 4. nextjs에서 head 태그 설정하기

```jsx
import Head from "next/head"; // next/head를 import해야 함

export default function Seo({ title }) {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
}
```

## 5. nextjs redirect

source 주소에서 destination주소로 Redirect 됨

### redirect 선언하기

**next.config.js**

```jsx
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/contact", // 원래 주소
        destination: "/about", // 이동할 주소
        permanent: false, // redirection이 영구적인지 아닌지 설정
      },
      {
        source: "/form",
        destination: "/submit",
        permanent: false,
      },
    ];
  },
};
```

### ID값이 포함된 주소를 redirect 하기

**next.config.js**

```jsx
...
return [
  {
    source: "/old-blog/:path",
    destination: "/new-blog/:path",
    ...
  }
]
...
// /old-blog/1212 -> /new-blog/1212 (redirect)

...
return [
  {
    source: "/old-blog/:path*",
    destination: "/new-blog/:path*",
    ...
  }
]
...
// old-blog/1212/comments/1212 -> new-blog/1212/comments/1212
// path가 긴 주소를 redirect
```

## 6. nextjs rewrite

redirect와 비슷하지만 유저가 URL변화를 볼 수 없음

**next.config.js**

```jsx
const API_KEY=precess.env.KEY
module.exports = {
  reactStrictMode: true,
  async redirects() {
    ...
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
};
```

**app.js**

```jsx
...

useEffect(() => {
  const fetchs = async () => {
    const { results } = await (await fetch("/api/movies")).json(); // 받아오는 api URL
    setMovie(results);
  };
  fetchs();
}, []);

...
```

- api/movies주소를 입력하면 api response정보를 받아옴
- api의 URL에 포함된 api key가 나오지 않게 설정하려면 rewrite를 사용하면 됨

## 7. Server Side Rendering

- html의 값이 나타남, 페이지를 로드 하기 전까지 빈 화면으로 보이고, 로드가 끝나면 한번에 모든 페이지가 나타남
- 서버 사이드 렌더링 미적용, api부분이 html에 없음

![https://user-images.githubusercontent.com/44824320/148928463-94eb0181-fefa-4985-905b-46177d122054.png](https://user-images.githubusercontent.com/44824320/148928463-94eb0181-fefa-4985-905b-46177d122054.png)

- 서버 사이드 적용, api부분이 html에 포함 되어 있음

![https://user-images.githubusercontent.com/44824320/148928455-e50e13f6-3b88-405a-9cbf-b47403ac7b99.png](https://user-images.githubusercontent.com/44824320/148928455-e50e13f6-3b88-405a-9cbf-b47403ac7b99.png)

### Server Side Rendering 설정

**\_app.js**

```jsx
export default function App({ Component, pageProps }) {
  console.log(pageProps);
// getServerSideProps에서 리런한 results의 값이 pageProps로 전달
  ...
}
```

**index.jsx**

```jsx
export default function Home({ results }) {
  // pageProps의 값이 -> results로 전달
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        <div key={movie.id} className="movie">
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      ...
    </div>
  );
}

export async function getServerSideProps() {
  // Server side rendering declaration
  const { results } = await (await fetch(`http://localhost:3000/api/movies`)).json();
  return {
    props: {
      results,
    },
  };
}
```

## 8. Dynamic Router

- `**/**` 경로는 **pages**폴더의 **index.js**
- **`/about`** 경로는 **pages**폴더의 **about.js**
- **`/movies`** 경로만 사용 할 경우 **pages**에 **movies.js**
- 만일 **`/movies`**와 **`/movies/all`** 경로를 사용할 경우(중첩)
  - **pages**에 **movies**폴더를 만들고 **index.js**(**`/movies`**), **all.js**(**`/movies/all`**)을 생성하면 됨(pages/movies/index.js || all.js)
- **`movies/121212`**를 생성하려면 **movies**폴더에 **[id].js**를 만들면 된다.
