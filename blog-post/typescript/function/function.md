---
slug: "/typescript/function"
date: "2023-06-03"
title: "function 타입"
categories: ["Typescript"]
desc: "타입스크립트에서 함수의 타입 선언"
topbg: "../topbg.png"
thumbnail: "../thumbnail.png"
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

## 2. 함수 타입의 호환성

- 특정 함수 타입을 다른 함수 타입으로 취급해도 괜찮은가를 판단

### 반환값의 타입이 호환되는지 유무

```ts {numberLines}
type A = () => number;

type B = () => 10;

let a: A = () => 10; // number type
let b: B = () => 10; // number literal type

a = b; // ✅ a(number) <- b(number literal type), 업캐스팅
b = a; // ❌   b(number literal type) <- a(number), 다운캐스팅
```

### 매개변수의 타입이 호환되는지 유무

#### 매개변수의 갯수가 같을 때

```ts {numberLines}
type C = (value: number) => void;
type D = (value: 10) => void;

let c: C = (value) => {};
let d: D = (value) => {};

c = d; // ❌ 업캐스팅시 에러
d = c; // ✅ 다운캐스팅시 허용
```

- 매개변수 타입이 업캐스팅 관계에 있을 때, 슈퍼 타입을 매개변수로 요구하는 함수에 서브 타입을 가진 함수를 할당하면 에러발생
- 이는 서브 타입의 함수가 슈퍼 타입의 함수에 필요한 요구사항을 불충족
- 서브 타입은 더 많은 속성이나 동작을 갖고 있을 수 있으므로, 슈퍼 타입을 받는 함수에는 충분한 정보가 전달되지 않을 수 있다.

두 함수가의 매개변수 타입이 모두 객체 타입

```ts {numberLines}
type Animal = {
  name: string;
};

type Dog = {
  name: string;
  color: string;
};

let animalFunc = (animal: Animal) => {
  console.log(animal.name);
};
let dogFunc = (dog: Dog) => {
  console.log(dog.name);
  console.log(dog.color);
};

animalFunc = dogFunc; // ❌ 슈퍼타입 <- 서브타입 (업캐스팅)
dogFunc = animalFunc; // ✅ 서브타입 <- 슈퍼타입 (다운캐스팅)
```

animalFunc = DogFunc을 표현

```ts {numberLines}
let testFunc = (animal: Animal) => {
  console.log(animal.name); // ❌
  console.log(animal.color); // ✅
};
```

dogFunc = animalFunc을 표현

```ts {numberLines}
let testFunc2 = (dog: Dog) => {
  console.log(dog.name);
};
```

#### 매개변수의 갯수가 다를 때

- 타입이 같은 매개변수에서 함수의 매개변수가 더 적을때만 호환이 된다.

```ts {numberLines}
type Func1 = (a: number, b: number) => void;
type Func2 = (a: number) => void;

let func1: Func1 = (a, b) => {};
let func2: Func2 = (a) => {};
func1 = func2; // ✅
func2 = func1; // ❌
```

## 3. 함수 오버로딩

- 하나의 함수를 매개변수의 개수나 타입에 따라 여러가지 버전으로 만드는 문법

버전들, 선언부 -> 오버로딩 시그니쳐

```ts {numberLines}
function func(a: number): void;
function func(a: number, b: number, c: number): void;
```

실제 구현부 -> 구현 시그니쳐

- 하나의 함수 func
- 모든 매개변수의 타입 number
- 매개변수가 1개 -> 매개변수에 20을 곱한 값 출력
- 매개변수가 3개 -> 매개변수들을 다 더한값을 출력

```ts {numberLines}
function func(a: number, b?: number, c?: number) {
  if (typeof b === "number" && typeof c === "number") {
    console.log(a + b + c);
  } else {
    console.log(a * 20);
  }
}
// 첫번째 오버로딩 시그니쳐에는 매개변수 a의 타입만 존재 하기 떄문에
// 구현부 함수의 매개변수 b, c는 선택적 프로퍼티를 선언한다.

func(); // ❌ 오버로딩 버전에 없음
func(1); // ✅ 오버로딩 시그니쳐 첫번째 버전에 따름
func(1, 2); // ❌ 오버로딩 버전에 없음
func(1, 2, 3); // ✅ 오버로딩 시그니쳐 두번째 버전에 따름
```

오버로딩 시그니쳐를 선언하게 되면, 구현부의 매개변수 갯수나 타입에 따르지 않고 오버로딩 시그니쳐 버전에 따른다.

## 4. 사용자 정의 타입가드

true, false를 반환 하는 함수를 이용하여 타입 가드를 선언할 수 있는 문법

타입설정

```ts{numberLines}
type Dog = {
  name: string;
  isBark: boolean;
};

type Cat = {
  name: string;
  isScratch: boolean;
};

type Animal = Dog | Cat;
```

사용자 정의 타입가드

isDog함수의 리턴값이 true이면 Dog 타입으로 좁혀진다. `animal is Dog`

```ts{numberLines}

function isDog(animal: Animal): animal is Dog {
  return (animal as Dog).isBark !== undefined;
  // animal의 타입을 Dog타입으로 타입 단언하기
}

function isCat(animal: Animal): animal is Cat {
  return (animal as Cat).isScratch !== undefined;
}
```

구현하기

```ts{numberLines}
function warning(animal: Animal) {
  if (isDog(animal)) {
    console.log({ ...animal });
  } else if (isCat(animal)) {
    console.log({ ...animal });
  }
}
warning({ name: "jindo", isBark: true }); // { name: 'jindo', isBark: true }

warning({ name: "nabi", isScratch: false }); // { name: 'nabi', isScratch: false }

```

## referance

- [한입 타입스크립트 핸드북](https://ts.winterlood.com/)
