---
slug: "/typescript/conditiontype"
date: "2023-06-17"
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
조건부 타입 변수에 유니온 타입을 할당하면, 할당된 내부의 모든 타입이 분리된다.

```ts {numberLines}
type StringNumberSwitch<T> = T extends number ? string : number;

let c: StringNumberSwitch<number | string>;
```
- let c는 분리되어 아래와 같이 두가지 유니언 타입을 가지게 된다.
- StringNumberSwitch<number>
- StringNumberSwitch<string>

타입의 단계로 살펴보면

```ts {numberLines}
type StringNumberSwitch<T> = T extends number ? string : number;
let d: StringNumberSwitch<boolean | number | string>;
```

#### 1단계

StringNumberSwitch\<boolean\> | <br /> 
StringNumberSwitch\<number\> | <br /> 
StringNumberSwitch\<string\>

#### 2단계

 boolean extends number ? string : number => number | <br />
 number extends number ? string : number => string | <br />
 string extends number ? string : number => number

#### 결과
number | string

분산적인 조건 타입을 작동하지 않기 위해 선언하기
```ts {numberLines}
type StringNumberSwitch<T> = [T] extends [number] ? string : number;
let d: StringNumberSwitch<boolean | number | string>;
```
let d는 number 타입
### 또다른 예제
```ts {numberLines}
type Exclude<T, U> = T extends U ? never : T;
type A = Exclude<number | string | boolean, string>;
```

#### 1단계
Exclude<number, string> | <br />
Exclude<string, string> | <br />
Exclude<boolean, string>

#### 2단계

number | <br />
never | <br />
boolean

#### 결과
- 타입 A의 타입은 number | boolean
- T와 U가 같은 타입이면 그 타입을 배제 시킨다.


```ts {numberLines}
type Extract<T, U> = T extends U ? T : never;

type B = Extract<number | string | boolean, string>;
```

#### 1 단계
Extract<number, string> |
Extract<string, string> |
Extract<boolean, string>

#### 2단계
 never | string | never

#### 결과
- 타입B의 타입은 string
- T와 U가 같은 타입이면 그 타입만 추론한다.


## 3. infer
- inference -> 추론하다
- 조건부 타입에서 특정 타입을 추론할 수 있는 문법

```ts {numberLines}
type FuncA = () => string;
type FuncB = () => number;

type ReturnType<T> = T extends () => string ? string : never;

type A = ReturnType<FuncA>; // string
type B = ReturnType<FuncB>; // never
```

FuncA,B의 함수 리턴 타입이 ReturnType 타입의 `extends () => string`의 서브타입이면 조건부 타입에 의해 true면 `string` false면 `never`타입 
- type A는 ReturnType에 FuncA를 선언하면 조건부 타입에 의해 `string`이 된다.

- type B는 ReturnType에 FuncA를 선언하면 조건부 타입에 의해 `never`가 된다.

type A와 type B의 리턴 타입이 FuncA와 FuncB의 타입과 같게 하려면 `infer`를 사용한다.

```ts {numberLines}
type FuncA = () => string;
type FuncB = () => number;

type ReturnType<T> = T extends () => infer R ? R : never;

type A = ReturnType<FuncA>; // string
type B = ReturnType<FuncB>; // number
type C = ReturnType<number>; // never
```
infer는 조건부 타입을 true라 결정하고, extends의 오른쪽의 타입을 추론한다.

- T가 `() => string`이면 `T extends () => infer R ? R :never` 조건부 타입이 true라 정하면 R은 `string`으로 추론된다.
- T가 `() => number`이면 `T extends () => infer R ? R :never` 조건부 타입이 true라 정하면 R은 `number`으로 추론된다.
- T가 `number`이면 `T extends () => infer R ? R :never` 조건부 타입이 true라 정하더라도 타입과 리턴타입이 다르기 때문에 추론이 불가 하기 때문에 `never`타입이 된다.


#### Promise의 resolve 타입을 infer를 이용해 추출하는 예
```ts {numberLines}
type PromiseUnpack<T> = T extends Promise<infer R> ? R : never;
// 1. T는 프로미스 타입이어야 한다.
// 2. 프로미스 타입의 결과값 타입을 반환해야 한다.

type PromiseA = PromiseUnpack<Promise<number>>;
// number

type PromiseB = PromiseUnpack<Promise<string>>;
// string
```
## referance

- [한입 타입스크립트 핸드북](https://ts.winterlood.com/)
