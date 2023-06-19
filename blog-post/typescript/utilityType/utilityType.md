---
slug: "/typescript/utilitytypes"
date: "2023-06-18"
title: "유틸리티 타입"
categories: ["Typescript"]
desc: "타입스크립트가 제공하는 특수 타입"
topbg: "../topbg.png"
thumbnail: "../thumbnail.png"
---


## 1. 유틸리티 타입 
유틸리티 타입은 타입스크립트가 자체적으로 제공하는 특수한 타입들을 말한다.

예를 들어 `Readonly` 유틸리티 타입을 이용해 특정 객체 타입의 모든 프로퍼티를 읽기 전용으로 바꿀 수 있다.

```ts {numberLines}
interface Person {
  name: string;
  age: number;
}

const person: Readonly<Person> = { // Readonly Utility Type
  name: "user1",
  age: 19,
};

person.name = "1"; // ❌ 읽기 전용

// Readonly : type Readonly<T> = { readonly [P in keyof T]: T[P]; }
```

또한 `Partial` 유틸리티 타입을 이용해 특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 바꿀 수 있다.

```ts {numberLines}
interface Person {
  name: string;
  age: number;
}

const person: Partial<Person> = {
  age:  20
};

// Partial : type Partial<T> = { [P in keyof T]?: T[P] | undefined; }
```
공식 문서에서 다양한 유틸리티 타입을 확인 할 수 있다.
- [유틸리티 타입 공식 문서](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype)

## 2. Partial, Required, Readonly

### Partial
특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 바꿀 수 있는 타입

```ts {numberLines}
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL: string;
}
```

tags와 thumbnailURL의 프로퍼티가 없어서 에러발생
```ts {numberLines}
const draft: Post = { // ❌
  title: "title1",
  content: "desc....",
};
```
Partial을 선언하면 Post 타입의 모든 프로퍼티를 선택적 프로퍼티로 바꿔서 에러가 발생하지 않는다.

```ts {numberLines}
const draft: Partial<Post> = { // ✅
  title: "title1",
  content: "desc....",
};
```

type alias로 Partial 구현해보기
```ts {numberLines}
type Partial<T> = {
  [key in keyof T]?: T[key];
};

const draft: Partial<Post> = { // ✅
  title: "title1",
  content: "desc....",
};
```

### Required
특정 객체 타입의 모든 프로퍼티를 필수 프로퍼티로 바꿔주는 타입

```ts {numberLines}
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

const withThumbnailPost: Required<Post> = {
  title: "title2",
  tags: ["post1"],
  content: "desc....",
  thumbnailURL: "https://.....", // ✅
  // thumbnailURL: "https://.....",  ❌
};
```
- thumbnailURL가 선택적 프로퍼티로 선언했지만, Required를 선언하면 모든 프로퍼티는 필수 프로퍼티로 변경
- 만일 하나라도 프로퍼티를 선언하지 않으면 에러가 발생한다.


type alias로 Required 구현해보기
```ts {numberLines}
type Required<T> = {
  [key in keyof T]: T[key];
};

const withThumbnailPost: Required<Post> = {
  title: "title2",
  tags: ["post1"],
  content: "desc....",
  thumbnailURL: "https://.....", // ✅
  // thumbnailURL: "https://.....",  ❌
};
```

### Readonly
특정 객체 타입에서 모든 프로퍼티를 읽기 전용 프로퍼티로 바꿔주는 타입

```ts {numberLines}
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL: string;
}

const readOnlyPost: Readonly<Post> = {
  title: "guard content",
  tags: [],
  content: "",
};
readOnlyPost.content = "1111"; // ❌ 읽기 전용이라 수정 불가
readOnlyPost.title = "hack content"; // ❌ 읽기 전용이라 수정 불가
```


type alias로 Readonly 구현해보기

```ts {numberLines}
type Readonly<T> = {
  readonly [key in keyof T]: T[key];
};

const readOnlyPost: Readonly<Post> = {
  title: "guard content",
  tags: [],
  content: "",
};
readOnlyPost.content = "1111"; // ❌ 읽기 전용이라 수정 불가
readOnlyPost.title = "hack content"; // ❌ 읽기 전용이라 수정 불가
```

## 3. Record, Pick, Omit

## 4. Exclude, Extract, ReturnType


## referance

- [한입 타입스크립트 핸드북](https://ts.winterlood.com/)