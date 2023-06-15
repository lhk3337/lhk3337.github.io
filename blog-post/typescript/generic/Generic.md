---
slug: "/typescript/generic"
date: "2023-06-08"
title: "제네릭(Generics)"
categories: ["Typescript"]
desc: "Typescript에서 Generic 다루기"
topbg: "../topbg.png"
thumbnail: "../thumbnail.png"
---

## 1. Generic?

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
- 인수를 선언하지 않을 경우

```ts {numberLines}
function func<T>(value: T) {
  return value;
}

func(); // function func<unknown>(value: unknown): unknown
```

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

## 2. type variable

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

## 3. map, forEach 메서드 타입 정의

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

## 4. generic interface & generic type alias

### generic interface

```ts {numberLines}
interface KeyPair<K, V> {
  key: K;
  value: V;
}
```

- interface KeyPair에 타입변수인 K, V를 선언
- 해당 프로퍼티에 타입변수를 할당

```ts {numberLines}
let keyPair: KeyPair<string, number> = {
  key: "key",
  value: 0,
};
```

- 변수 keyPair 타입에 `KeyPair<string, number>`를 선언
- string은 KeyPair K에, number는 KeyPair V에 할당 됨.

```ts {numberLines}
let keyPair2: KeyPair<boolean, string[]> = {
  key: true,
  value: ["1"],
};
```

- 변수 keyPair2 타입에 `KeyPair<boolean, string[]>`를 선언
- boolean은 KeyPair K에, string[]은 KeyPair V에 할당 됨.

### Index Signature

- generic 적용 전

```ts {numberLines}
interface NumberMap {
  [key: string]: number;
}

let numberMap1: NumberMap = {
  key: -1234,
  key2: 123124,
};
```

generic 적용 후

```ts {numberLines}
interface Map<V> {
  [key: string]: V;
}
let stringMap: Map<string> = {
  key: "value",
};

let booleanMap: Map<boolean> = {
  key: false,
};
```

### generic type alias

```ts {numberLines}
type Map2<V> = {
  [key: string]: V;
};

let stringMap2: Map2<string> = {
  key: "hello",
};
```

### generic interface 활용

```ts {numberLines}
interface Student {
  type: "student";
  school: string;
}

interface Developer {
  type: "developer";
  skill: string;
}
```

generic 변경 전

```ts {numberLines}
interface User {
  name: string;
  profile: Student | Developer;
}

function goToSchool(user: User) {
  if (user.profile.type !== "student") {
    console.log("여기가 아닙니다.");
    return;
  }
  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);
}

const developerUser: User = {
  name: "user1",
  profile: {
    type: "developer",
    skill: "frontend",
  },
};
const studentUser: User = {
  name: "user2",
  profile: {
    type: "student",
    school: "highschool",
  },
};
goToSchool(developerUser); //  "여기가 아닙니다."
```

generic 변경 후

```ts {numberLines}
interface User<T> {
  name: string;
  profile: T;
}

function goToSchool(user: User<Student>) {
  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);
}

const developerUser: User<Developer> = {
  name: "user1",
  profile: {
    type: "developer",
    skill: "frontend",
  },
};
const studentUser: User<Student> = {
  name: "user2",
  profile: {
    type: "student",
    school: "highschool",
  },
};
goToSchool(studentUser); // ✅
goToSchool(developerUser); // ❌
```

## 5. generic class

### geeric 적용 전

number 배열의 생성자를 생성하고 push, pop, print 메서드를 구현할 수 있는 클래스 선언

```ts {numberLines}
class NumberList {
  constructor(private list: number[]) {}
  push(data: number) {
    this.list.push(data);
  }
  pop() {
    return this.list.pop();
  }
  print() {
    console.log(this.list);
  }
}
```

```ts {numberLines}
const numberList = new NumberList([1, 2, 3]);
numberList.pop(); // [1, 2]
numberList.push(4); // [1, 2, 4]
numberList.print(); // [1, 2, 4] 출력
```

string타입을 가진 배열을 이용하여 pop push하려면 class를 다시 선언해야 한다.

```ts {numberLines}
class StringList {
  constructor(private list: string[]) {}
  push(data: string) {
    this.list.push(data);
  }
  pop() {
    return this.list.pop();
  }
  print() {
    console.log(this.list);
  }
}
```

```ts {numberLines}
const stringList = new StringList(["1", "2", "3"]);
stringList.pop(); // ["1", "2"]
stringList.push("4"); // ["1", "2", "4"]
stringList.print(); // ["1", "2", "4"] 출력
```

- 위의 class를 보면 number타입과 string타입을 구현하려면 중복된 class가 두번 선언되었다.

### geeric 적용 후

- 이것을 해결하기 위해 제네릭을 사용하여 class를 선언하면 된다.

```ts {numberLines}
class List<T> {
  constructor(private list: T[]) {}
  push(data: T) {
    this.list.push(data);
  }
  pop() {
    this.list.pop();
  }

  print() {
    console.log(this.list);
  }
}
```

```ts {numberLines}
const genericNumberList = new List([1, 2, 3]);
// number array instance
const genericStringList = new List(["1", "2", "3"]);
// string array instance

genericNumberList.pop();
genericNumberList.push(4);
genericNumberList.print();

genericStringList.pop();
genericStringList.push("4");
genericStringList.print();
```

### 해당 인스턴스의 타입 변수 생략

```ts {numberLines}
const genericNumberList = new List([1, 2, 3]);
const genericStringList = new List(["1", "2", "3"]);
```

에서 생성자의 인수[1, 2, 3]과 ["1", "2", "3"]이 class의 generic에서 추론되기 떄문에

```ts {numberLines}
const genericNumberList = new List<number>([1, 2, 3]); // <number> 생략 가능
const genericStringList = new List<string>(["1", "2", "3"]); // <string> 생략 가능
```

인스턴스의 타입 변수를 선언하지 않아도 된다.

## 6. 프로미스와 제네릭

### 프로미스 제네릭 선언하기

- Promise는 비동기 처리를 목적으로 제공되는 자바스크립트의 내장 클래스이며, Promise 생성자에 함수를 전달한다.
- 이 함수는 실행자 함수 비동기 처리를 실제로 하는 함수를 의미하고 resolve와 reject 인수를 가진다.
- `resolve`는 비동기가 처리가 성공했을 경우 실행할 함수
- `reject`는 비동기 처리가 실패했을 경우 실행할 함수
- resolve나 reject로 호출 후 전달하는 비동기 작업 결과값에 대한 타입을 자동적으로 추론할 수 있는 기능이 없기 떄문에 기본적으로 `unknown`타입으로 지정한다.

```ts {numberLines}
const promise = new Promise((resolve, reject) => {
  // resolve: unknown, reject :unknown
  setTimeout(() => {
    resolve(20);
  }, 3000);
});

promise.then((response) => console.log(response * 10));
// ❌ resolve의 결과값이 response이어서 response도 unknown타입이 되어 unknown타입에 10을 곱하면 에러가 발생한다.
```

제네릭 선언

```ts {numberLines}
const promise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    resolve(20);
  }, 3000);
});

promise.then((response) => console.log(response * 10));
// ✅ Promise에 해당 타입의 제네릭을 선언하면 결과값의 타입도 같은 타입으로 추론된다.
```

비동기 처리로 실패한 reject 함수의 리턴값인 실패한 결과값 타입은 정의할 수 없다. 그렇기 때문에 catch문을 사용하려면 타입가드를 사용하여 설정할 수 있다.

```ts {numberLines}
const promise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    // resolve(20);
    reject("failed");
  }, 3000);
});

promise.catch((err) => {
  if (typeof err === "string") {
    // 타입 가드
    console.log(err);
  }
});
```

### 프로미스를 반환하는 함수의 타입을 정의

```ts
interface Post {
  id: number;
  title: string;
  content: string;
}

function fetchPost() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: "title",
        content: "content",
      });
    }, 3000);
  });
}

const postRequest = fetchPost();
postRequest.then((post) => {
  console.log(post.id); // ❌ post가 unknown타입이라 에러발생
});
```

- Promise 타입을 지정하면 타입에러가 발생하지 않는다.

```ts {numberLines}
function fetchPost() {
  return new Promise<Post>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: "title",
        content: "content",
      });
    }, 3000);
  });
}

// 함수 리턴 타입에 제네릭 설정, 가동성이 더 좋음
function fetchPost(): Promise<Post> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: "title",
        content: "content",
      });
    }, 3000);
  });
}
```

인스턴스 생성하기

```ts {numberLines}
const postRequest = fetchPost();
postRequest.then((post) => {
  console.log(post.id); // 1
});
```

## referance

- [한입 타입스크립트 핸드북](https://ts.winterlood.com/)
