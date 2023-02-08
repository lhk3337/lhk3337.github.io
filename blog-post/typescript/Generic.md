---
slug: "/typescript/generic"
date: "2023-01-31"
title: "Generic"
categories: ["Typescript"]
desc: "타입스크립트 Generic이 무엇일까요?"
thumbnail: "./thumbnail.png"
---

```tsx
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity(12));

// function identity<12>(arg: 12): 12

console.log(identity("hello"));

//function identity<"hello">(arg: "hello"): "hello"

console.log(identity(true));

// function identity<true>(arg: true): true

console.log(identity(undefined));

// function identity<undefined>(arg: undefined): undefined
```

```tsx
function sum1<S, T>(a: S, b: T) {
  return Number(a) + Number(b);
}

// Number 타입은 + 연산에 대한 정의가 되어 있어서 에러가 발생하지 않음

console.log(sum1(1, 2));

function sum1<T extends number>(a: T, b: T): number {
  return a + b;
}

console.log(sum1(1, 2));
```

```tsx
function createPair<S, T>(v1: S, v2: T): [S, T] {
  return [v1, v2];
}

console.log(createPair<string, number>("hello", 42));
```

```tsx
type SuperPrint = {
    // (arr:number[]):void
    // (arr:boolean[]):void
    // (arr:string[]):void
    // (arr:(number|boolean)[]):void
    **<TypePlaceholder>(arr:TypePlaceholder[]):void
			Typescript가 함수의 값을 보고 타입을 유추한다.**

}

const superPrint:SuperPrint=(arr) =>{
    arr.forEach((i) => {
        if(typeof i === "boolean"){
            console.log(i);
    }
    else{
        console.log(i)
    }
    })
}

superPrint([1,2,3,4,5])
superPrint([true,false,true])
superPrint(["a","b","c"])
superPrint([1,2,true,false])

type SuperPrint = {
    // (arr:number[]):void
    // (arr:boolean[]):void
    // (arr:string[]):void
    // (arr:(number|boolean)[]):void
    <T, M>(a:T[],b:M):T

}

const superPrint:SuperPrint=(a, b) => a[0]

superPrint([1,2,3,4,5],"hello")
superPrint([true,false,true],32)
superPrint(["a","b","c"],false)
const d = superPrint([1,2,true,false,"hello"],[])
```
