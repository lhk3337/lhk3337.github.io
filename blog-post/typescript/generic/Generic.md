---
slug: "/typescript/generic"
date: "2023-06-08"
title: "제네릭(Generics)"
categories: ["Typescript"]
desc: "Typescript에서 Generic 다루기"
topbg: "../topbg.png"
thumbnail: "../thumbnail.png"
---

## Generic?

제네릭이란 함수나 인터페이스등 여러 유형에서 유연하고 재사용이 가능하도록 만들어 주는 타입스크립트의 기능을 말할 수 있다.

### 제네릭을 쓰지 않을 경우

매개변수에 `any`타입 선언 후, 구현부에 다양한 타입 설정하기

```ts {numberLines}
function func(value: any) {
  return value;
}
let num = func(10);
let str = func("string");

num.toUpperCase();
```

- num변수의 값은 func의 리턴 타입인 number이지만 매개변수에 any로 타입을 선언했다.
- 그렇기 때문에 string의 메서드를 선언해도 에러가 발생하지 않음.

매개변수에 `unknown`타입 선언 후, 구현부에 다양한 타입 설정하기

```ts {numberLines}
function func(value: unknown) {
  return value;
}
let num = func(10);
let str = func("string");
num.toUpperCase(); // ❌ toUpperCase는 string 메서드, 타입 에러
num.toFixed(); // ❌ toFixed는 number타입의 메서드인데 에러가 발생하였다.
```

- num이 toUpperCase()와 타입이 달라 에러를 발생시켰지만, toFixed는 타입이 같은데 에러를 발생시켰다.

타입 가드를 이용하여 타입 좁히기를 하면 에러가 발생하지 않는다.

```ts {numberLines}
function func(value: unknown) {
  return value;
}
let num = func(10);
if (typeof num === "number") {
  num.toFiexed();
}
```

위의 코드와 같이 제네릭을 사용하지 않으면 인수 타입과 리턴값의 타입이 달라진 것으로 보인다.

### 제네릭 선언

function func`<타입 변수>`(value: `타입 변수`): `타입 변수` {}

- 인수를 통해 타입이 추론

```ts {numberLines}
function func<T>(value: T): T {
  return value;
}
// type T는 함수를 호출할때 인수의 타입에 따라 정해진다.
let num = func(10); // num은 number
let str = func("string"); // str은 string
let bool = func(false); // bool은 boolean
```

- 명시적으로 정의하는 제네릭

```ts
function func<T>(value: T): T {
  return value;
}

let num = func(10); // num은 number
let str = func("string"); // str은 string

let arr = func<[number, number, number]>([1, 2, 3]); // 튜플 정의, <[number, number, number]>이 func<T>에  할당 됨
let arr = func<[number, number, number]>([1, 2, 3, 4]); // ❌ 튜플 타입과 맞지 않는 요소를 추가하면 에러 발생
```

## type variable

## map, forEach 메서드 타입 정의

## generic class

## promise & generic

## referance

- [한입 타입스크립트 핸드북](https://ts.winterlood.com/)
