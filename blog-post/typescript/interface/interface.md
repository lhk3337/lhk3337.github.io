---
slug: "/typescript/interface"
date: "2023-06-05"
title: "Interface"
categories: ["Typescript"]
desc: "타입스크립트에서 Interface 선언하기"
topbg: "./topbg.png"
thumbnail: "./thumbnail.png"
---

## Interface

- 타입에 이름을 지어주는 문법
- interface는 객체 타입을 정의하는데 특화된 문법
- `interface name{property: type}`

#### 선언하기

```ts {numberLines}
interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "user1",
  age: 18,
};
```

#### 선택적 프로퍼티

```ts {numberLines}
interface Person {
  name: string;
  age?: number;
}

const person: Person = {
  name: "user1",
  //   age: 18, // age 프로퍼티를 선언하지 않아도 에러
};
```

#### readonly 프로퍼티

```ts {numberLines}
interface Person {
  readonly name: string; // 읽기 전용 프로퍼티
}
const person: Person = { name: "user1" };
person.name = "user2"; // ❌ 읽기 전용이라 프로퍼티값을 변경하지 못한다.
```

#### 메서트 타입
일반 함수 타입과 호출 시그니쳐 형식으로 메서드 타입을 설정할 수 있다.
```ts {numberLines}
interface Person {
  name: string;
  sayHi: () => void;
  sayHi(): void; //   sayHi: () => void와 같음, 호출 시그니쳐
}

const person: Person = {
  name: "user1",
  sayHi: function () {
    console.log("hello");
  },
};
```

#### 함수 오버로딩 
메서드의 오버로딩을 구현하려면 타입을 호출 시그니쳐로 선언하는 것을 권장

함수 타입
```ts {numberLines}
interface Person {
  sayHi:() => void
  sayHi:(a: number, b: number) => void; // ❌  
```

호출 시그니쳐
```ts {numberLines}
interface Person {
  sayHi(): void;
  sayHi(a: number, b: number): void; // ✅
```
#### 여러 타입
```ts {numberLines}
interface Func2 {
  (a: number): string;
  b: boolean;
}

const func2: Func2 = (a) => "hello";
func2.b = true;

```
#### type alias는 union, intersection이 가능하지만 interface는 직접적으로 선언하지 못한다.
```ts {numberLines}
type Type1 = number | string; // ✅
type Type2 = number & string; // ✅

interface Person {name: string; age: number} | number; // ❌
```

#### interface를 union, intersection로 선언하고 싶으면 type alias로 선언하거나 타입 주석에 직접적으로 사용해야 한다.

```ts {numberLines}
interface Person {name: string; age: number} 
type Types1 = number | string | Person;
type Types2 = number & string & Person;

const p1: Person | number = {
  name: "HH",
  sayHi: function () {
    console.log("Hi");
  },
};
```

## referance

- [한입 타입스크립트 핸드북](https://ts.winterlood.com/)
