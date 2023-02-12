---
slug: "/js/closure"
date: "2023-02-01"
title: "Closure"
categories: ["Javascript"]
desc: "javascript 클로저 개념"
thumbnail: "./thumbnail.png"
---

> 클로저는 어떤 함수에서 선언한 변수를 참조하는 내부함수를 외부로 전달할 경우, 함수의 실행 컨텍스트가 종료된 후에도 해당 변수가 사라지지 않는 현상

```jsx
function plusFactory(init) {
  function plus(number) {
    return init + number; // init가 Closure
  }
  return plus;
}

let plus1 = plusFactory(1);
console.log(plus1(1));
console.log(plus1(2));

let plus2 = plusFactory(2);
console.log(plus2(1));
console.log(plus2(2));
```

클로저 문제 : 스코프, 비동기, var

클로저가 문제가 아님

클로저를 사용해서 해결하는 문제

for문(반복문)과 비동기를 함께 사용하면 종종 발생

문제 : var와 for와 비동기의 환상적 콜라보

### 해결별

- var 유지하려면 → 즉시실행함수로 클로저 생성
- var를 let으로 수정

```jsx
function a() {
  for (var i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}

a();
// 5 5 5 5 5
```

```jsx
function a() {
  for (var i = 0; i < 5; i++) {
    (function (j) {
      setTimeout(() => {
        console.log(j);
      }, i * 1000);
    })(i);
  }
}

a();

function a() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}

a();

// 0 1 2 3 4
```

## 참조 : CORE JavaScript, 생활 코딩, 제로초
