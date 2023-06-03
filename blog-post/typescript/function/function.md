---
slug: "/typescript/function"
date: "2023-06-03"
title: "function 타입"
categories: ["Typescript"]
desc: "타입스크립트에서 함수의 타입 선언"
topbg: "./topbg.png"
thumbnail: "./thumbnail.png"
---

# 타입스크립트에서 함수의 타입 설정하기

## 함수 타입

- 함수란? 어떤 매개변수를 받고, 어떤 결과값을 반환하는지 정의
- 타입스크립트에서 함수란? 이떤 [타입의] 매개변수를 받고, 어떤 [타입의] 결과값을 변환

### 함수 타입 선언하기

매개변수와 반환값의 타입을 선언한다.

```ts {numberLines}
function func(a: number, b: number): number {
  return a + b;
}
// 리턴값의 타입은 자동 추론이 가능하기 때문에 생략이 가능하다.
```

- 화살표 함수에서 함수 타입 선언하기

```ts {numberLines}
const func = (a: number, b: number) => a + b;
```

### 함수의 매개변수

```ts {numberLines}
function introduce(name = "HK", age: number, tall?: number) {
  // 선택적 매개변수 뒤에 필수 매개변수를 선언하면 에러가 발생하여 선택적 매개변수를 제일 마지막에 위치해야한다.
  console.log(`name: ${name}`);
  if (typeof tall === "number") {
    console.log(`tall : ${tall + 10}`);
  }
}

introduce("aaa", 22, 10);
introduce("aaa", 22);
```

### 함수의 rest parameter 매개변수 타입 정의

```ts {numberLines}
function getSum(...rest: number[]) {
  let sum = 0;
  rest.forEach((v) => (sum += v));
  return sum;
}
console.log(getSum(1, 2, 3));
console.log(getSum(1, 2, 3, 4, 5));
```

```ts {numberLines}
function getSum(...rest: [number, number, number]) {
  // number array 리터럴로 선언 하기
  let sum = 0;
  rest.forEach((v) => (sum += v));
  return sum;
}
console.log(getSum(1, 2, 3));
```

## referance

- [한입 타입스크립트 핸드북](https://ts.winterlood.com/)
