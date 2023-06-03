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

## 0. 함수 타입

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

## 1. 함수 타입 표현식과 호출 시그니쳐

### 함수 타입 표현식

- 여러개 함수에서 매개변수 타입이 같을 경우 함수 타입 표현식으로 타입 중복을 없앨 수 있다.

```ts {numberLines}
const add = (a: number, b: number) => a + b;
const min = (a: number, b: number) => a - b;
const mul = (a: number, b: number) => a * b;
```

- 함수 타입 표현식 선언

```ts {numberLines}
type Operation = (a: number, b: number) => number;
const add: Operation = (a, b) => a + b;
const min: Operation = (a, b) => a - b;
const mul: Operation = (a, b) => a * b;
```

- 타입 별칭이 아닌 직접 선언하여 사용할 수 있다.

```ts {numberLines}
const add: (a: number, b: number) => number = (a, b) => a + b;
```

### 함수 호출 시그니쳐(Call Signature)

- 함수도 객체이기 때문에, 함수를 객체처럼 타입을 별도로 정의할 수 있다.
- 호출 시그니쳐도 함수 타입 표현식과 마찬가지로 타입을 별도록 정의 할 수 있다.

```ts {numberLines}
type Operation2 = { (a: number, b: number): number };
const add: Operation2 = (a, b) => a + b;
const min: Operation2 = (a, b) => a - b;
const mul: Operation2 = (a, b) => a * b;
```

- 객체 타입을 추가하여 하이브리드 타입 정의하기

```ts {numberLines}
type Operation3 = { (a: number, b: number): number; name: string };
const mul: Operation3 = (a, b) => a * b;
mul(); // ✅
mul.name; // ✅
```

## referance

- [한입 타입스크립트 핸드북](https://ts.winterlood.com/)
