---
slug: "/typescript/interface"
date: "2023-06-07"
title: "Interface"
categories: ["Typescript"]
desc: "타입스크립트에서 Interface 선언하기"
topbg: "../topbg.png"
thumbnail: "../thumbnail.png"
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
interface Person {
  name: string;
  age: number;
}
type Types1 = number | string | Person;
type Types2 = number & string & Person;

const p1: Person | number = {
  name: "HH",
  sayHi: function () {
    console.log("Hi");
  },
};
```

## Inteface Extends

interface를 선언 시 name과 age 프로퍼티 타입이 중복되고 있다.

```ts {numberLines}
interface Animal {
  name: string;
  age: number;
}

interface Dog {
  name: string;
  age: number;
  isBark: boolean;
}

interface Cat {
  name: string;
  age: number;
  isScratch: boolean;
}

interface Chicken {
  name: string;
  age: number;
  isFly: boolean;
}
```

- `extends`를 사용하여 interface를 상속할 수 있다.
- 상속을 하면 중복 프로퍼티 타입을 생략 할 수 있다.

```ts {numberLines}
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  //   name: string;
  //   age: number;
  isBark: boolean;
}

interface Cat extends Animal {
  //   name: string;
  //   age: number;
  isScratch: boolean;
}

interface Chicken extends Animal {
  //   name: string;
  //   age: number;
  isFly: boolean;
}
```

- 객체 타입을 재정의 할 경우 상속하는 객체의 타입은 상속 받을 객체의 타입보다 슈퍼 타입이어야 한다.
- 슈퍼 타입이 아닐 경우 에러가 발생한다.

```ts {numberLines}
interface Animal {
  name: string;
  age: number;
}
interface Dog extends Animal {
  name: "user1"; // string literal 타입으로 재정의
  name: number; // ❌  string 타입이 아닌 number 타입 일 경우 슈퍼 - 서브 타입관계가 성립하지 않으므로 에러 발생
  isBark: boolean;
}
const dog: Dog = {
  name: "user1",
  age: 11,
  isBark: true,
};
```

객체 타입의 타입 별칭도 상속을 할 수 있다

```ts {numberLines}
type Animal1 = {
  name: string;
  age: number;
};

interface Dog extends Animal1 {
  isBark: boolean; // ✅
}
```

다중 확장

- 여러 interface를 확장할 수 있다.

```ts {numberLines}
interface Dog {
  name: string;
  age: number;
  isBark: boolean;
}

interface Cat {
  name: string;
  age: number;
  isScratch: boolean;
}

interface DogCat extends Dog, Cat {}

const dogcat: DogCat = {
  name: "",
  age: 4,
  isBark: true,
  isScratch: false,
};
```

## interface 합치기

- type 별칭은 중복으로 선언하면 에러가 발생
- interface는 같은 이름으로 중복으로 선언해도 타입이 합쳐 작동하게 된다. 이것을 선언 합침(Declaration Merging)이라 한다.

```ts {numberLines}
interface Person {
  name: string;
}

interface Person {
  name: number; // ❌ 충돌
  name: string; // ✅ 똑같은 프로퍼티를 중복 선언하려면 똑같은 타입을 선언해야 하고 해당 타입 리터럴로 선언하면 에러 발생
  age: number;
}

const person: Person = {
  name: "",
  age: 11,
};
```

interface 상속에서는 재정의 시 해당 타입의 리터럴로 선언해도 에러가 발생하지 않는다.

```ts {numberLines}
interface Person {
  name: string;
}
interface Developer extends Person {
  name: "hello";
}
```

모돌 보강

```ts {numberLines}
interface Lib {
  a: number;
  b: number;
}

interface Lib {
  // 2. 중복 interface 추가
  c: string;
}

const lib: Lib = {
  a: 1,
  b: 2,
  c: "hello", // 1. c 프로퍼티를 추가 하고 싶으면 중복 interface Lib를 선언하고 프로퍼티 타입을 설정하면 interface 합치기가 작동한다.
};
```

## referance

- [한입 타입스크립트 핸드북](https://ts.winterlood.com/)
