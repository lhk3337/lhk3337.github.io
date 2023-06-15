---
slug: "/typescript/conditiontype"
date: "2023-06-15"
title: "typescript 조건부 타입"
categories: ["Typescript"]
desc: "조건부 타입 설정하기"
topbg: "../topbg.png"
thumbnail: "../thumbnail.png"
---


## 1. 조건부 타입
조건에 따라 타입을 정할 수 있는 문법

```ts {numberLines}
type A = number extends string ? string : number;
```
type A는 string이 number타입의 슈퍼타입이 아니라서 false인 number타입으로 추론된다.

#### 객체타입에서 조건부 타입 선언하기
```ts {numberLines}
type ObjA = { a: number };
type ObjB = { a: number; b: string };
type B = ObjB extends ObjA ? number : string;
```
ObjA는 Objb의 super type이어서 `true`인 `number`타입으로 추론된다.

#### 제네릭을 이용한 조건부 타입 선언하기
```ts {numberLines}
type StringNumberSwitch<T> = T extends number ? string : number;
let varA: StringNumberSwitch<number>; // <T> 타입변수에 number 타입, let varA: string
let varB: StringNumberSwitch<string>; // <T> 타입변수에 string 타입, let varB: number
```

#### 문자열의 공백을 제거하는 함수 예시
```ts {numberLines}
function removeSpace(text: string) {
  return text.replaceAll(" ", "");
}

let result = removeSpace("hello good moring");
result.toUpperCase();
```
여기에서 removeSpace의 매겨변수 text타입에 `undefiend` 및 `null`이 있을경우
```ts {numberLines}
function removeSpace(text: string | undefined | null) {
  return text.replaceAll(" ", ""); // ❌ text는 undefined 및 null일 수 있음
}
let result = removeSpace("hello good moring");
```

타입가드를 이용하면

```ts {numberLines}
function removeSpace(text: string | undefined | null) {
  if (typeof text === "string") {
    return text.replaceAll(" ", "");
  } else {
    return undefined;
  }
}

let result = removeSpace("hello good moring");
```
하지만 result 타입이 string | undefined로 추론되어, 조건부 타입을 이용해 타입을 정할 수 있다.

```ts {numberLines}
function removeSpace<T>(text: T): T extends string ? string : undefined {
  if (typeof text === "string") {
    return text.replaceAll(" ", ""); // ❌
  } else {
    return undefined; // ❌
  }
}
let result = removeSpace("hello good moring");
result.toUpperCase();
```
타입변수 T는 함수 내부에서 `unkown`타입으로 선언되었기 때문에, 조건부 타입의 결과를 알 수 없어 return 타입에 any로 타입 단언을 한다.

```ts {numberLines}
function removeSpace<T>(text: T): T extends string ? string : undefined {
  if (typeof text === "string") {
    return 0 as any; // 문제 감지 못함
  } else {
    return undefined as any;
  }
}

let result = removeSpace("hello good moring");
// string

let result2 = removeSpace(undefined);
// undefined
```

하지만 any로 타입단언을 하면 타입 검사를 무시하게 되어 함수 오버로딩을 사용하면 함수내 조건부 타입의 추론이 가능한다.

```ts {numberLines}

function removeSpace<T>(text: T): T extends string ? string : undefined;
function removeSpace(text: any) {
  if (typeof text === "string") {
    return text.replaceAll(" ", "");
  } else {
    return undefined;
  }
}

let result = removeSpace("hello good moring");
// string
result.toUpperCase();

let result2 = removeSpace(undefined);
// undefined
```

## 2. 분산적인 조건부 타입

## 3. infet


## referance

- [한입 타입스크립트 핸드북](https://ts.winterlood.com/)
