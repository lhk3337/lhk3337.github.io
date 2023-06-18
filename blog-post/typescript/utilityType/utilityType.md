---
slug: "/typescript/utilitytypes"
date: "2023-06-18"
title: "유틸리티 타입"
categories: ["Typescript"]
desc: "타입스크립트가 제공하는 특수 타입"
topbg: "../topbg.png"
thumbnail: "../thumbnail.png"
---


## 1. 유틸리티 타입 
유틸리티 타입은 타입스크립트가 자체적으로 제공하는 특수한 타입들을 말한다.

예를 들어 `Readonly` 유틸리티 타입을 이용해 특정 객체 타입의 모든 프로퍼티를 읽기 전용으로 바꿀 수 있다.

```ts {numberLines}
interface Person {
  name: string;
  age: number;
}

const person: Readonly<Person> = { // Readonly Utility Type
  name: "user1",
  age: 19,
};

person.name = "1"; // ❌ 읽기 전용

// Readonly : type Readonly<T> = { readonly [P in keyof T]: T[P]; }
```

또한 `Partial` 유틸리티 타입을 이용해 특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 바꿀 수 있다.

```ts {numberLines}
interface Person {
  name: string;
  age: number;
}

const person: Partial<Person> = {
  age:  20
};

// Partial : type Partial<T> = { [P in keyof T]?: T[P] | undefined; }
```
공식 문서에서 다양한 유틸리티 타입을 확인 할 수 있다.
- [유틸리티 타입 공식 문서](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype)

## 2. Partial, Required, Readonly

## 3. Record, Pick, Omit

## 4. Exclude, Extract, ReturnType


## referance

- [한입 타입스크립트 핸드북](https://ts.winterlood.com/)