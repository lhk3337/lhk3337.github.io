---
slug: "/js/this"
date: "2023-01-25"
title: "that"
categories: ["Javascript"]
---

# this

함수를 호출하는 객체

```jsx
var value = 1;
const circle = {
  radius: 5,
  getDiameter() {
    console.log(2 * this.radius);

    // 일반 함수
    function bar() {
      console.log(this); //window 객체
      console.log(this.value); // 전역 변수 value
    }
    bar();

    // 콜백 함수
    setTimeout(function() {
      console.log(this); //window 객체
      console.log(this.value); // 전역 변수 value, 1
    }, 1000);
  },
};
circle.getDiameter();
```

객체내에 메서드가 아닌, 일반 함수나 콜백함수를 선언하고 그 함수안에서 this를 선언하면 그 this는 window객체가 된다.

전역 객체 : window객체

```jsx
console.log(this); // window 객체
```

- 메서드 호출

- 생성자 함수 호출

- bind메서드
