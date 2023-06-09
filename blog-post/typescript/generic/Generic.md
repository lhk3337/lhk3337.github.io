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

```ts {numberLines}
function func<T>(value: T): T {
  return value;
}

let num = func(10); // num은 number
let str = func("string"); // str은 string

let arr = func<[number, number, number]>([1, 2, 3]);
// 튜플 정의, <[number, number, number]>이 func<T>에  할당 됨
let arr = func<[number, number, number]>([1, 2, 3, 4]);
// ❌ 튜플 타입과 맞지 않는 요소를 추가하면 에러 발생
```

## type variable

### example 1

배열 타입

```ts {numberLines}
function swap<T, U>(a: T, b: U): (T | U)[] {
  return [b, a];
}

const [a, b] = swap("1", 2);
```

### example 2

배열의 0번째 요소 타입

```ts {numberLines}
function returnFirstValue<T>(data: T[]): T {
  return data[0];
}
let num = returnFirstValue([0, 1, 2]); // let num: number
let str = returnFirstValue(["hl", false, "hello", "good"]); // let str: string | boolean
```

```ts {numberLines}
function returnFirstValue<T>(data: [T, ...unknown[]]): T {
  return data[0];
}

function returnFirstValue<T, U>(data: [T, ...U[]]): T {
  return data[0];
}

let num = returnFirstValue([0, 1, 2]); // let num: number
let str = returnFirstValue(["hl", false, "hello", "good"]); // let str: string
```

### example 3

타입 변수 조건

```ts {numberLines}
function getLength<T extends { length: number }>(data: T) {
  return data.length;
}
let var1 = getLength([1, 2, 3]);
let var2 = getLength("12345");
let var3 = getLength({ length: 10 });
let var4 = getLength(10); // ❌ 해당하는 length property가 없기 때문에 에러 발생
```

## map, forEach 메서드 타입 정의

### map()

```ts {numberLines}
const arr = [1, 2, 3];

function map<T>(arr: T[], callback: (item: T) => T): T[] {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}

map(arr, (it) => it.toString());
// ❌ 타입변수 T는 number 타입인데 리턴타입은 string여서 에러가 발생하였다.
```

map 메서드는 새로운 배열을 리턴하므로 원본 배열과 같은 타입으로 나오지 않을 수도 있다.

```ts {numberLines}
const arr = [1, 2, 3];
function map<T, U>(arr: T[], callback: (item: T) => U): U[] {
  // map 메서드는 인수로 배열의 타입이 콜백함수로 실행되어 리턴 된다.
  // 이때 새로운 배열 타입으로 될 수 있기 때문에 타입변수 U를 선언하였다.
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}

map(arr, (it) => it.toUpperCase()); // ✅ ["1", "2", "3"]
```

### forEach()

```ts {numberLines}
const arr2 = [1, 2, 3];

function forEach<T>(arr: T[], callback: (item: T) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}
forEach(arr2, (it) => {
  console.log(it.toFixed());
});

forEach(["123", "456"], (it) => {
  console.log(parseInt(it));
});
```

## generic class

## promise & generic

## referance

- [한입 타입스크립트 핸드북](https://ts.winterlood.com/)
