---
slug: "/typescript/type"
date: "2023-05-26"
title: "typescript type"
categories: ["Typescript"]
desc: "타입스크립트 타입 종류"
topbg: "../topbg.png"
thumbnail: "../thumbnail.png"
---

# 타입스크립트에서 지원하는 type 종류

## 1. 원시 타입

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

## 2. 리터럴 타입

해당 value를 타입으로 지정하고, 만일 다른 value를 사용하면 에러가 발생한다.

```ts {numberLines}
let numA: 10 = 10;
numA = 12; // number 10 만 허용

let strA: "hello" = "hello";
strA = "h"; // string "hello" 만 허용

let boolA: true = true;
boolA = false; // boolean true만 허용
```

## 3. 배열, 튜플

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

## 4. 객체

### 객체 리터럴 타입

```ts {numberLines}
let user: { id: number; name: string } = {
  id: 1,
  name: "user1",
};
```

Typescript는 구조적 타입 시스템

객체 타입을 property기준으로 타입을 결정한다. (Property Based Type System)

### 선택적 property 타입

해당 property에 물음표를 넣게 되면 선택적 property가 된다.

```ts {numberLines}
let user: { id?: number; name: string } = {
  id: 1,
  name: "user1",
};

user = {
  name: "user2",
};
// 해당 id는 있어도 되고 없어도 에러가 발생하지 않는다.
```

### readonly

값이 수정될 수 없도록 읽기 전용으로 변경

```ts {numberLines}
let config: {
  readonly apiKey: string;
} = { apiKey: "My Api Key" };

config.apiKey = "modify Api Key"; // 읽기 전용인데 값이 변경 되어 에러 발생시킴
```

## 5. type alias and Index Signature

### type alias

타입을 별도로 지정하여 정의 할 수 있다.

`type type명 = 타입`

```ts {numberLines}
// type alias 적용 전
let user1: { id: number; name: string; age: number; bio: string; location: string } = {
  id: 1,
  name: "user1",
  age: 18,
  bio: "hello",
  location: "seoul",
};

let user2: { id: number; name: string; age: number; bio: string; location: string } = {
  id: 1,
  name: "user2",
  age: 18,
  bio: "hello",
  location: "seoul",
};
```

```ts {numberLines}
// type alias 적용 후
type User = {
  id: number;
  name: string;
  age: number;
  bio: string;
  location: string;
};

let user11: User = {
  id: 1,
  name: "user1",
  age: 18,
  bio: "hello",
  location: "seoul",
};

let user22: User = {
  id: 1,
  name: "user2",
  age: 18,
  bio: "hello",
  location: "seoul",
};
```

type alias의 스코프

```ts {numberLines}
type User = {
  id: number;
  name: string;
  age: number;
  bio: string;
  location: string;
};

let user11: User = {
  id: 1,
  name: "user1",
  age: 18,
  bio: "hello",
  location: "seoul",
};
// global scope의 User type

function func() {
  type User = { id: number; name: string };
  let funcUser: User = {
    id: 1,
    name: "sss",
  };
  // 해당 타입은 함수 내의 스코프에서만 사용 가능하다.
}
```

### Index Signature(인덱스 시그니처)

- key와 value의 타입의 규칙에 따라 유연하게 타입을 선언하는 문법
- key와 value의 타입만 일치하면 key와 value의 갯수에 상관없이 추가하거나 삭제해도 에러가 발생하지 않는다.

```ts {numberLines}
type CountryCodes = {
  Korea: string;
  UnitedState: string;
  UnitedKingdom: string;
};
// key type이 string이고 value도 string이 규칙적으로 선언

// index signature
type CountryCode = {
  [key: string]: string;
};

let countrycodes: CountryCode = {
  Korea: "ko",
  UnitedState: "us",
  UnitedKingdom: "uk",
    ... 프로퍼티를 여러개 추가해도 에러가 발생하지 않는다.
};

// number index signature
type CountryNumberCodes = {
  [key: string]: number;
};

let countryNumberCodes: CountryNumberCodes = {
  Korea: 410,
  UnitedState: 840,
  UnitedKingdom: 826,
  ... 프로퍼티를 여러개 추가해도 에러가 발생하지 않는다.
};
```

빈 객체로 선언해도 에러가 발생하지 않는다. 아무런 property가 없기 때문에 타입 규칙을 위반하지 않는다.

```ts {numberLines}
type CountryNumberCodes = {
  [key: string]: number;
};
let countryEmptyNumberCode: CountryNumberCodes = {};
```

만일 객체에 key와 value를 명시하려면 type에 key와 타입을 선언한다.

```ts {numberLines}
type CountryNumberCode = {
  [key: string]: number;
  Korea: number;
};

let countryNumberCode: CountryNumberCode = {
  Korea: 410,
};
```

index signature value는 number이고, 추가한 property인 Korea의 value가 string이면 에러가 발생한다.

타입을 number로 일치 시키면 에러가 발생하지 않는다.

```ts {numberLines}
type CountryNumberAndStringCode = {
  [key: string]: number;
  Korea: string; // 에러 발생
  Korea: number;
};
let countryNumberAndStringCode: CountryNumberAndStringCode = {
  Korea: "ko", // 에러 발생
  Korea: 410,
};
```

## 6. enum

- enum은 열거형 타입, Typescript에만 있는 타입
- 여러가지 값들에 각각 이름을 부여해 열거하고 사용하는 타입
- 열거형은 주로 상수 값들을 그룹화하고 가독성을 높이며 오류를 방지 하기 위해 사용한다.

enum에 값을 입력하지 않으면 자동으로 `0`부터 값을 채워 +1씩 증가 된다.

```ts {numberLines}
// eum 선언하기
enum Role {
  ADMIN,
  USER,
  GUEST,
}

const user1 = {
  name: "master",
  role: Role.ADMIN, // 0이 자동으로 삽입
};
const user2 = {
  name: "user1",
  role: Role.USER, // 1이 자동으로 삽입
};
const user3 = {
  name: "user2",
  role: Role.GUEST, // 2이 자동으로 삽입
};

console.log(user1, user2, user3);

/*
{ name: 'master', role: 0 } 
{ name: 'user1', role: 1 } 
{ name: 'user2', role: 2 }
*/
```

- 만일 enum 멤버에 값을 직접 할당 가능하다. 그리고 나머지 enum에 값을 할당하지 않으면 자동으로 직접 할당한 값을 기준으로 +1씩 증가 된다.

```ts {numberLines}
enum Role {
  ADMIN = 10,
  USER, // 11
  GUEST, // 12
}

const user1 = {
  name: "master",
  role: Role.ADMIN, // 10 할당
};
const user2 = {
  name: "user1",
  role: Role.USER, // 11 할당(자동)
};
const user3 = {
  name: "user2",
  role: Role.GUEST, // 12 할당(자동)
};
```

### 문자열 열거형

enum 멤버에 숫자이외에 문자열도 할당 할 수 있다.

```ts {numberLines}
enum Language {
  korean = "ko",
  english = "en",
}

enum Role {
  ADMIN,
  USER,
  GUEST,
}

const user1 = { name: "master", role: Role.ADMIN, language: Language.korean };
const user2 = { name: "user1", role: Role.USER, language: Language.english };
const user3 = { name: "user2", role: Role.GUEST, language: Language.korean };

console.log(user1, user2, user3);

/*
{ name: 'master', role: 0, language: 'ko' } 
{ name: 'user1', role: 1, language: 'en' }
 { name: 'user2', role: 2, language: 'ko' }
*/
```

## 7. Any, Unknown

any와 unknown는 특정 변수가 현재 시점에서 알수 없거나 확인할 수 없을때 사용하는 타입스크립트의 타입이다.

### any

- 모든 타입을 허용한다. (타입검사를 하지 않는다.)
- 다른 타입의 값을 재할당해도 에러가 발생하지 않는다.
- 타입검사를 하지 않아 그에 따른 부작용이 발생할 수 있기 때문에 any 타입 사용을 지양해야 한다.

```ts {numberLines}
let num = 1;
num = "hello"; // ❌ type error
```

any로 타입을 선언하면, 타입검사를 하지 않아 에러가 발생하지 않는다.

```ts {numberLines}
let num = 1;
num = "hello";
console.log(num); // hello
```

```ts {numberLines}
let value: any = 10;
value = "hello";

let num: number = 1;

num = value;
console.log(number1);
```

### Unknown

- any와 비슷하지만 안전한 타입이다.
- 변수에 Unknown 타입으로 지정하면, 모든 타입의 값을 할당 받을 수 있다.
- 하지만 Unknown 타입을 다른 변수에 재할당하거나, 연산 및 메서드에 사용하면 에러가 발생한다.

```ts {numberLines}
let unknownVar: unknown;

unknownVar = ""; // string 타입 할당
unknownVar = () => {}; // function 할당
unknownVar = 1; // number 타입 할당
```

에러나는 조건

- unknown으로 선언한 변수를 다른 변수에 재할당 할 수 없다.

```ts {numberLines}
let num: number = 10;
let unknownVar: unknown;

unknownVar = "";
unknownVar = () => {};
unknownVar = 1;

num = unknownVar; // ❌ error
```

- unknown으로 선언한 변수는 연산을 하거나 메서드를 사용하면 에러가 발생한다.

```ts {numberLines}
let unknownVar: unknown;
unknownVar = 1;

console.log(unknownVar.toString()); // ❌ error
console.log(unknownVar * 2); // ❌ error
```

만일 unknown 타입의 변수 값을 해당하는 명시적인 타입을 가지기 위해서는 조건문을 이용하면 해결할 수 있다.

```ts {numberLines}
function printName(person: unknown) {
  if (typeof person === "string") {
    console.log(person.toUpperCase()); // OK: 'person'이 'string' 타입일 때만 사용 가능
  } else {
    console.log("Unknown name");
  }
}

printName("Alice"); // ALICE
printName(123); // Unknown name

if (typeof unknownVar === "number") {
  // 이 조건이 참이된다면 unknownVar는 number 타입으로 볼 수 있음
  unknownVar * 2;
}
```

- any 타입은 타입 검사를 비활성화하고 모든 작업을 허용하기 때문에 타입 안전성이 떨어질 수 있다.
- 반면, unknown 타입은 타입 안전성을 유지하면서 타입이 알려지지 않은 값들을 처리하는 유연성을 제공하기때문에 코드를 작성할 때는 any 타입보다는 타입 안전성을 유지할 수 있는 unknown 타입을 사용하는 것이 나을 수 있다.

## 8. void, never

### void

- void 타입은 아무것도 없음을 나타내는 타입이다.
- 리턴값이 없는 함수에서 사용한다.

```ts {numberLines}
function func(): void {
  console.log("hello");
}
```

하지만 자바스크립트의 undefined, null이 값이 없는 타입이지만, 함수에서 리턴 타입으로 undefined로 지정하면 함수는 undefined 타입으로 값을 리턴해야 한다.

```ts {numberLines}
function func(): undefined {
  console.log("Hello"); // ❌ error
  // return undefined; // undefined 리턴값이 없으면 에러 발생
}

function func(): null {
  return null;
}
```

함수가 아닌 변수에 void를 선언하면 변수는 undefined과 null 타입에 할당 할 수 있다.

```ts {numberLines}
let value: void;

value = "hello"; // ❌ error
value = 1; // ❌ error

valiue = undefined;
// "strictNullChecks: false" 일 경우
value = null;
```

### never

- 함수가 어떤 값도 반환하지 않거나 절대 끝나지 않는다는 것을 나타 냄
- 함수의 무한루프는 종료하지 않아 리턴값을 반환할 수 없을 때나 throw를 통한 구문이 있을때 never를 사용한다.

```ts {numberLines}
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    console.log("Infinite loop");
  }
}

let result: never = throwError("Something went wrong"); // 함수가 예외를 throw하므로 never 타입
let loop: never = infiniteLoop(); // 함수가 끝나지 않으므로 never 타입
```

변수에 never 타입을 정의하면 어떠한 타입도 변수에 할당 할 수 없다.

```ts {numberLines}
let anyVar: any;
let a: never;
a = 1; // ❌
a = null; // ❌
a = undefined; // ❌
a = anyVar; // any 타입을 never 타입에 할당 할 수 없다. ❌
```

## referance

- [한입 타입스크립트 핸드북](https://ts.winterlood.com/)
