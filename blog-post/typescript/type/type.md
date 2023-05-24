---
slug: "/typescript/type"
date: "2023-05-24"
title: "typescript type"
categories: ["Typescript"]
desc: "타입스크립트 타입 종류"
topbg: "./topbg.png"
thumbnail: "./thumbnail.png"
---

# 타입스크립트에서 지원하는 type 종류

## 1. 기본 타입

다른 타입의 메소드를 사용하면 에러가 발생한다.

### number

```ts {numberLines}
let num1: number = 123;
let num2: number = -123;
let num3: number = 0.123;
let num4: number = -0.123;
let num5: number = Infinity;
let num6: number = -Infinity;
let num7: number = NaN;

num1 = "123"; // type error
num1.toUpperCase(); // string methord error
```

### string

```ts {numberLines}
let str1: string = "hello";
let str2: string = "'hello'";
let str3: string = `hello`;
let str4: string = `hello ${str1}`;

str = 1; // type error
str1.toFixed(); // number method error
```

### bollean

```ts {numberLines}
let bool1: boolean = true;
let bool2: boolean = false;
```

### null

```ts {numberLines}
let null1: null = null;
```

### undefined

```ts {numberLines}
let unde1: undefined = undefined;
```

### 리터럴 타입

해당 value를 타입으로 지정하고, 만일 다른 value를 사용하면 에러가 발생한다.

```ts {numberLines}
let numA: 10 = 10;
numA = 12; // number 10 만 허용

let strA: "hello" = "hello";
strA = "h"; // string "hello" 만 허용

let boolA: true = true;
boolA = false; // boolean true만 허용
```

## 2. 배열, 튜플

### 배열

```ts {numberLines}
let numArr: number[] = [1, 2, 3, 4];

let stringArr: string[] = ["hi", "name", "age"];

let boolArr: Array<boolean> = [true, false, false];

// 배열 요소 타입이 여러가지인 경우
let multiArr: (number | string)[] = [1, "hello"];

// 다차원 배열의 타입 정의
let doubleArr: number[][] = [
  [1, 2, 3],
  [4, 5],
];
```

### 튜플

- 타입 스크립트에만 사용 하는 배열 타입
- 길이와 타입이 고정된 배열

```ts {numberLines}
let tup1: [number, number] = [1, 2]; // 배열 index가 2이고 타입은 number
tup1 = [1, 2, 3]; // index가 갯수가 2이상이므로 에러 발생
tup1 = ["1", "2"]; // type이 string여서 에러 발생
```

#### 여러 타입을 가진 튜플

```ts {numberLines}
let tup2: [number, string, boolean] = [1, "2", true];
tup2 = [1]; // index가 하나인 요소를 선언하여 에러 발생
tup2 = ["2", 1, true]; // type 순서가 잘못되어 에러 발생
```

#### 주의해야 할 튜플

튜플을 js로 변환하면 배열로 변경된다.

그렇기 때문에 배열 메서드를 사용하면 튜플의 기능이 없어지므로 사용에 주의해야 한다.

```ts {numberLines}
let tup2: [number, string, boolean] = [1, "2", true];
tup2.push(1);
console.log(tup2); // [ 1, '2', true, 1 ]
```

#### 튜플을 사용하는 이유?

- 배열에 다른 요소를 추가할 경우 지정한 타입으로 선언하지 않으면, 자바스크립트에서는 에러를 발생시키지 않아 문제가 발생한다.

- 타입스크립트의 튜플을 사용하여 선언하면 이러한 문제점을 해결할 수 있다.

```ts {numberLines}
const users: [string, number][] = [
  ["user1", 1],
  ["user2", 2],
  ["user3", 3],
  ["user4", 4],
  [5, "h"], // number와 string인 요소를 추가혀면 오류를 발생 시킨다.
];
```

## referance

- [한입 타입스크립트 - 원시타입과 리터럴타입](https://ts.winterlood.com/3cb27a06-78ac-499d-9270-2ebabe8c769c)
- [한입 타입스크립트 - 배열과 튜플](https://ts.winterlood.com/43888ee0-9227-4a8d-994e-2336ee78bfcf)
