---
slug: "/tailwind/setup"
date: "2023-02-02"
title: "React환경에서 tailwind 설치하기"
categories: ["Tailwind"]
---

## 설치법

```bash
npm i -D tailwindcss postcss autoprefixer postcss-loader

npx tailwindcss init -p
// postcss.config, tailwind.config 생성됨
```

> Root 폴더에 `postcss.config.js` 생성후 아래와 같이 입력

```jsx
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

> Root 폴더에 `tailwind.config.js` 생성후 아래와 같이 입력

### **React**

```jsx
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // 이 경로에 tailwind를 사용
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### nextJS

```jsx
module.exports = {
  content: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"], // 이 경로에 tailwind를 사용
  theme: {
    extend: {},
  },
  plugins: [],
};
```

/page/\*_/_.{js,jsx,ts,tsx} page폴더안의 모든 폴더의, 나열된 확장자 중 하나를 가지는 모든 파일을 말함

## tailwind css 적용하는 법

### **React**

src / index.css에 아래와 같이 입력

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

src / Index.js

```jsx
import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
**import "./index.css";**

const root = document.querySelector("#root");

ReactDom.render(<App/>,root);
```

src / App.js

```jsx
function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
```

### NextJS

styles / globals.css

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

pages / \_app.js

```jsx
**import '../styles/globals.css'**
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
```

> text-3xl

font-size: 1.875rem; /_ 30px _/
line-height: 2.25rem; /_ 36px _/

> font-bold

font-weight: 700;

> underline

text-decoration-line: underline;

![출력 결과](hello.png)
