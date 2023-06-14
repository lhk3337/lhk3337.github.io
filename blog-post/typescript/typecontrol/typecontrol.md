---
slug: "/typescript/typecontrol"
date: "2023-06-13"
title: "타입 조작하기"
categories: ["Typescript"]
desc: "원래 타입에서 새로운 타입으로 조작하기"
topbg: "../topbg.png"
thumbnail: "../thumbnail.png"
---

## 1. 타입 조작이란?
- 원래 있던 타입들을 상황이나 조건에 따라 유동적으로 다른 타입으로 변경하는 타입스크립트의 특수한 기능
- 제네릭도 타입을 조작할 수 있는 기능중에 하나이다.

## 2. 인덱스드 엑세스 타입(Indexed access type)
- 인덱스를 이용하여 다른 타입내에 특정 프로퍼티 타입을 추출하는 타입

 ### 객체 프로퍼티 타입 추출

```ts {numberLines}
interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
  };
}

const post: Post = {
  title: "post title",
  content: "main",
  author: {
    id: 1,
    name: "user1",
  },
};
```

- author의 프로퍼티를 출력하는 함수
```ts {numberLines}
function printAuthorInfo(author: { name: string; id: number;}) {
  console.log(`${author.name}-${author.id}`);
}
```
만일 author의 프로퍼티를 새로 추가한다면 author 타입도 추가해야 하므로 불편하다.

```ts {numberLines}
interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age: number // new property
  };
}

function printAuthorInfo(author: { name: string; id: number; age: number}) {}
```

이러한 번거로움을 해결하기 위해 indexed access type을 이용하면 된다.

```ts {numberLines}
interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age: number // new property
  };
}

function printAuthorInfo(author: Post["author"]) {
  console.log(`${author.name}-${author.id}`);
  // author 타입은 {id:number; name:string; age:number}
}
```
- `Post["author]` Post타입으로부터 author 프로퍼티 타입을 추출
- author에 새로운 프로퍼티를 선언해도 Post의 author 프로퍼티로부터 타입을 자동적으로 추론한다.

#### 주의
- 객체에서 indexed aceess type을 사용할때 대괄호에 변수나 해당하지 않는 프로퍼티를 사용하면 에러가 발생한다.

```ts {numberLines}
interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age: number;
  };
}

const authorKey = "author";

function printAuthorInfo(author: Post[authorKey]) { // ❌
  console.log(`${author.id} - ${author.name}`);
}

function printAuthorInfo(author: Post["what"]) { // ❌
  console.log(`${author.id} - ${author.name}`);
}
```

#### 중첩 사용

```ts {numberLines}
interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age: number;
  };
}


function printAuthorInfo(author: Post["author"]["id"]) {
  console.log(`${author.id} - ${author.name}`);
}
// author의 매개변수 타입은 객체 타입에서 number 타입으로 변경 된다.
```


### 배열 요소에서 타입 추출

```ts {numberLines}
type Postlist = {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age: number;
  };
}[];
```
배열의 한 요소의 객체 author의 타입을 추출
```ts {numberLines}
function printAuthorInfo(author: Postlist[number]["author"]) {
  console.log(`${author.id} - ${author.name}`);
} 
```

배열 한 요소의 타입 추출
```ts {numberLines}
const post: Postlist[number] = {
  title: "post title",
  content: "main",
  author: {
    id: 1,
    name: "user1",
    age: 18
  },
};  // ✅

const post: Postlist[0] = {
  title: "post title",
  content: "main",
  author: {
    id: 1,
    name: "user1",
    age: 18,
  },
}; // ✅
```
index에 들어가는 것은 타입만 올 수 있고 나머지는 올 수 없음
```ts {numberLines}
const num = 0;

const postlist3: Postlist[num] = {
  title: "post title",
  content: "main",
  author: {
    id: 1,
    name: "user1",
    age: 18,
  },
}; // ❌ 
```


### 튜플 요소에서 타입 추출
튜플의 index literal number 타입 추출
```ts {numberLines}
type Tup = [number, string, boolean];

type Tup0 = Tup[0]; // Tup0은 number type으로 추출
type Tup1 = Tup[1]; // Tup1은 string type으로 추출
type Tup2 = Tup[2]; // Tup2은 boolean type으로 추출
type Tup3 = Tup[3]; // ❌ Tup[3]의 요소가 없음
```

튜플의 index number 타입 추출
```ts {numberLines}
type Tup = [number, string, boolean];
type TupNum = Tup[number]; // string | number | boolean의 유니언타입으로 최적의 공통 타입 추출
```






## 3. keyof & typeof 연산자
객체의 프로퍼티의 모든 key들을 string literal union형태로 추출하는 연산자

```ts {numberLines}
interface Person {
  name: string;
  age: number;
  locaton: string; // new property
}
```
아래 코드와 같이 선언하면 새로운 프로퍼티를 추가혀면, 함수 매개변수의 key의 타입도 추가해야한다.
```ts {numberLines}
function getPropertyKey(person: Person, key: "name" | "age" | "location") { // location 추가됨
  return person[key];
}
```

`keyof`으로 선언하기
```ts {numberLines}
function getPropertyKey(person: Person, key: keyof Person) {
  // keyof Person의 결과값은 "name"|"age"|"location"
  return person[key];
}

const person: Person = {
  name: "user",
  age: 18,
  location: "seoul"
};

getPropertyKey(person, "name");
```
keyof 연산자는 오직 타입(type alias, interface, 일반타입)만 올수 있고 변수나 값이 올수 없다.
```ts {numberLines}
function getPropertyKey(person: Person, key: keyof person) { // ❌ person의 객체타입의 변수가 대입
  return person[key];
}

const person: Person = {
  name: "user",
  age: 18,
  location: "seoul"
};
```
### typeof와 keyof 사용하기

```ts {numberLines}
type Person = typeof person;

function getPropertyKey(person: Person, key: keyof Person) {
  return person[key];
}

const person: Person = {
  name: "user",
  age: 18,
};
```

typeof 연산자를 이용하여 keyof 사용하기
```ts {numberLines}
function getPropertyKey(person: Person, key: keyof typeof person) {
  return person[key];
}

const person = {
  name: "user",
  age: 18,
};
```
타입 추론 순서

`typeof person`
```ts {numberLines}
{
  name:string;
  age:number;
}
```
`keyof typeof person`
```ts {numberLines}
"name" | "age"
```

### keyof가 적용된 이 블로그 커밋
[keyof 사용한 해당 커밋](https://github.com/lhk3337/lhk3337.github.io/commit/9263ae11f586e12df55ddf435a8020800247f9b8)


## 4. 맵드 타입
기존의 객체 타입을 기반으로 새로운 객체 타입을 만드는 타입 조작 기능입니다.

```ts {numberLines}
interface User {
  id: number;
  name: string;
  age: number;
}

function fetchUser(): User {
  return { id: 1, name: "user", age: 18 };
}
```
한명의 유저 정보를 수정할때

```ts {numberLines}
interface User {
  id: number;
  name: string;
  age: number;
}

// 중복 interface
interface PartialUser{
  id?: number;
  name?: string;
  age?: number;
}


function updateUser(user: User) {} // ❌
function updateUser(user: PartialUser) {} // ✅

updateUser({ age: 20 }); // 변경되는 값만 보내고 싶을때
```
### 맵드 타입을 이용하면 중복 interface를 선언하지 않아도 된다.

```ts {numberLines}
interface User {
  id: number;
  name: string;
  age: number;
}

type PartialUsers = {
  [key in "id" | "name" | "age"]?: User[key]; // 선택적 property
};

function updateUser(user: PartialUser) {} // ✅

updateUser({ age: 20 });
```
- property 키가 무엇인지 정의, `key가 "id", "name", "age"`
- property키들이 어떤 value타입을 가질 것인지 정의, `User["id"] | User["name"] | User["age"]`
-  `{id :  User["id"]; name :  User["name"]; age :  User["age"]}`

### 만일 프로퍼티의 갯수가 많아지면 `keyof` 연산자를 사용하면 된다.

```ts {numberLines}
interface User {
  id: number;
  name: string;
  age: number;
}

type BooleanUsers = {
  [key in keyof User]: boolean;
};
```

### 반환값이 readonly일 경우

```ts {numberLines}
interface User {
  id: number;
  name: string;
  age: number;
}

type ReadonlyUser = {
  readonly [key in keyof User]: User[key];
};

function readonlyUser(): ReadonlyUser {
  return { id: 1, name: "user", age: 18 };
}
const user = readonlyUser();
user.id = 1; // ❌ 읽기 전용이라 수정할 수 없다.

```


## referance

- [한입 타입스크립트 핸드북](https://ts.winterlood.com/)
