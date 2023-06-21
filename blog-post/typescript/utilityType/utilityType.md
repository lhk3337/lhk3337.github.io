---
slug: "/typescript/utilitytypes"
date: "2023-06-21"
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
`Partial<T>`

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

#### type alias로 Partial 구현해보기
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
`Required<T>`

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

#### type alias로 Required 구현해보기
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
`Readonly<T>`

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


#### type alias로 Readonly 구현해보기

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
### Pick
`Pick<T, K>`

객체 타입의 특정 프로퍼티만 선택하는 타입

```ts {numberLines}
interface Post {
  title: string;
  tags: string[];
  content: string;
  thumbnailURL?: string;
}

const legacyPost: Pick<Post, "content" | "title"> = {
  title: "legacyTitle",
  content: "legacyContent",
};
```
#### type alias로 Pick 구현해보기

```ts {numberLines}
type Pick<T, K extends keyof T> = {
  // K extends 'title' | 'tags' | 'content' | 'thumbnailURL'
  // "title" | "content" extends  'title' | 'tags' | 'content' | 'thumbnailURL'
  [key in K]: T[key];
};

const legacyPost: Pick<Post, "content" | "title"> = {
  title: "legacyTitle",
  content: "legacyContent",
};
```
- `K`는 해당 객체의 프로퍼티 키만 올 수 있다.
- `"content" | "title"` 대신 `number`나 `string` 타입이 오면 에러가 발생한다.
- `Post` 타입이 `number`나 `string`의 슈퍼타입이 아니기 때문에 에러가 발생한다.


### Omit
`Omit<T, K>`

객체 타입으로부터 특정 프로퍼티를 제거하는 타입

```ts {numberLines}
const noTitlePost: Pick<Post, "content" | "tags" | "thumbnailURL"> = {
  content: "",
  tags: [],
  thumbnailURL: "",
};
```
Pick을 이용하여 특정 프로퍼티만 선택할 수 있지만, 선택할 특정 프로퍼티가 많아질 경우 프로퍼티를 나열하는데 힘들 수 있다.

```ts {numberLines}
const noTitlePost: Omit<Post, "title"> = {
  content: "",
  tags: [],
  thumbnailURL: "",
};
```
Omit를 이용하여 선택안한 프로퍼티를 선언하면, 나머지는 선택한 프로퍼티가 된다.


#### type alias로 Omit 구현해보기

```ts {numberLines}
const noTitleOmitPost: Omit<Post, "title"> = {
  content: "",
  tags: [],
  thumbnailURL: "",
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```
type Omit을 풀어보면 아래와 같은 순서로 타입이 결정된다.
```ts
T = Post, K = 'title'
1. Pick<Post, Exclude<keyof Post, 'title'>>;
2. Pick<Post, Exclude<'title' | 'tags' | 'content' | 'thumbnailURL', 'title'>>
3. Pick<Post, 'tags' | 'content' | 'thumbnailURL', 'title' >
```

### Record
`Record<K, V>`

객체의 똑같은 프로퍼티의 중복 타입을 제거할 수 있는 타입

```ts {numberLines}
type ThumbnailLegacy = {
  large: { url: string };
  medium: { url: string };
  small: { url: string };
  watch: { url: string };
};
```

ThumbnailLegacy의 타입은 url의 프로퍼티 타입이 중복되어 있어서 Record를 선언하면 아래 코드처럼 간결하게 선언할 수 있다.

```ts {numberLines}
type Thumbnail = Record<"large" | "medium" | "small" | "watch", { url: string}>;
// Record의 첫번째 타입변수는 객체의 프로퍼티의 키를 유니언으로 받음
// Record의 두번째 타입변수는 키들의 value 타입을 만듬
```

#### type alias로 Record 구현해보기

```ts {numberLines}
type Record<K extends keyof any, V> = {
  // K extends keyof any : 무슨 객체인지 모르겠지만 어떤 객체타입의 키타입
  [key in K]: V;
};

type Thumbnail = Record<"large" | "medium" | "small" | "watch", { url: string }>;
```

## 4. Exclude, Extract, ReturnType
### Exclude
`Exclude<T, U>`

타입변수 T로부터 타입변수 U를 제거하는 타입

```ts {numberLines}
type A = Exclude<string | boolean, boolean>; 
// type A는 string 타입으로 리턴 된다.
```


#### type alias로 Exclude 구현해보기

```ts {numberLines}
type A = Exclude<string | boolean, boolean>;

type Exclude<T, U> = T extends U ? never : T;
```
Exclude를 풀어보면 아래와 같은 순서로 타입이 결정된다.

1. 1단계 
```ts
Exclude<string, boolean>
Exclude<boolean, boolean>
```
2. 2단계
```ts
string |
never
```
result 
```ts
string | never -> string // 합집합에서 공집합(never)은 사라짐
```


### Extract
`Extract<T, U>`

타입변수 T로부터 타입변수 U를 추출하는 타입

```ts {numberLines}
type B = Extract<string | boolean, boolean>;
// type B는 boolean 타입으로 리턴 된다.
```

#### type alias로 Extract 구현해보기

```ts {numberLines}
type B = Extract<string | boolean, boolean>;
// boolean 타입 리턴

type Extract<T, U> = T extends U ? T : never;
```

Extract를 풀어보면 아래와 같은 순서로 타입이 결정된다.

1. 1단계 
```ts
Extract<string, boolean>
Extract<boolean, boolean>
```
2. 2단계
```ts
never |
boolean
```
result 
```ts
never | boolean -> boolean // 합집합에서 공집합(never)은 사라짐
```

### ReturnType
`ReturnType<T>`

함수의 반환값 타입을 추출하는 타입

```ts {numberLines}
function funcA() {
  return "hello";
}

function funcB() {
  return 10;
}

type ReturnA = ReturnType<typeof funcA>; // type ReturnA은 funcA의 리턴타입인 string 타입으로 리턴
type ReturnB = ReturnType<typeof funcB>; // type ReturnB는 funcB의 리턴타입인 number 타입으로 리턴
```

#### type alias로 ReturnType 구현해보기

```ts {numberLines}
function funcA() {
  return "hello";
}

function funcB() {
  return 10;
}

type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never;

type ReturnA = ReturnType<typeof funcA>;
type ReturnB = ReturnType<typeof funcB>;
```
- `typeof funcA`가 `T`이면  `T`는 `() => string`가 된다.
- `T extends (...args: any) => infer R`에 의해 T가 R의 서브타입일때 추론을 해보면 R은 string타입이라 `type ReturnType은 string`으로 리턴

## referance

- [한입 타입스크립트 핸드북](https://ts.winterlood.com/)