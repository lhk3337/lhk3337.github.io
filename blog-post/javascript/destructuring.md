---
slug: "/js/destructuring"
date: "2023-02-01"
title: "구조분해 할당 및 펼침 연산자, 깊은 복사"
categories: ["Javascript"]
desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi aperiam soluta suscipit fuga et."
thumbnail: "./thumbnail.png"
---

## 구조분해 할당

```jsx
const obj1 = {
  id: 1,
  name: "HK",
  age: 3,
  habit: "aaa",
};
// const id = obj1.id;
// const name = obj1.name;
// const age = obj1.age;
// const habit = obj1.habit;
const { id, name, age, habit } = obj1; // 객체 구조 분해 할당

const arr1 = [1, "Aa", 3];

// const lId = arr1[0];
// const lName = arr1[1];
// const lHabit = arr1[2];

const [lId, lName, lHabit] = arr1; // 배열 구조 분해 할당
```

객체에서 구조 분해 할당을 선언하게되면, 필요 없는 부분을 삭제해도 에러가 발생하지 않는다.

배열에서 구조 분해 할당을 선언할때, 만일 lName가 필요 없더라도 꼭 선언을 해주거나 IName에 \_로 표시 한다.

## 펼침 연산자

### 객체

```jsx
const obj1 = {
  id: 1,
  naem: "HK",
  age: 3,
  habit: "coding",
};

// ===========================================================================

obj1.email = "hhh@lll";

const obj2 = obj1;

// shawdow copy, email값이 같아지고, obj1과 obj2 비교해보면 true

console.log("변경 전");
console.log("obj1 :", obj1); // obj1의 값
console.log("obj2 :", obj2); // obj1의 값이 같음

obj2.email = "empty";

console.log("변경 후");

console.log("obj1 :", obj1); // obj1의 email이 hhh@lll에서 empty로 변경
console.log("obj2 :", obj2); // obj1과 값이 같음
console.log(obj1 === obj2); // true

// ===========================================================================

const obj2 = { ...obj1, email: "hhh@lll" }; // ...obj1 펼침 연산자, deep copy

console.log("변경 전");
console.log("obj1 :", obj1); // obj1의 값
console.log("obj2 :", obj2); // obj1의 값과 키가 email인 값을 출력

obj2.email = "empty";

console.log("변경 후");

console.log("obj1 :", obj1); // obj1의 값
console.log("obj2 :", obj2); // obj1의 값과 email에서 변경된 empty가 출력

console.log(obj1 === obj2); // false
```

const obj2 = obj1로 선언하게 되면 원본 객체의 값도 변경 된다. 그렇기 때문에 obj1을 펼침 연산자로 선언하면 객체의 값이 변경 되지 않고 deep copy가 된다.

### 배열

```jsx
const arr1 = [1, "Aa", 3, "coding"];

arr1.push("hhh@lll");
const arr2 = arr1;

console.log("변경 전");
console.log("arr1 :", arr1); // arr1 : [ 1, 'Aa', 3, 'coding', 'hhh@lll' ]
console.log("arr2 :", arr2); // arr2 : [ 1, 'Aa', 3, 'coding', 'hhh@lll' ]

arr2[4] = "empty";

console.log("변경 후");
console.log("arr1 :", arr1); // arr1 : [ 1, 'Aa', 3, 'coding', 'empty' ]
console.log("arr2 :", arr2); // arr2 : [ 1, 'Aa', 3, 'coding', 'empty' ]

console.log(arr1 === arr2); // true

// ===========================================================================

const arr2 = [...arr1, "hh@lll"];

console.log("변경 전");
console.log("arr1 :", arr1); // arr1 : [ 1, 'Aa', 3, 'coding' ]
console.log("arr2 :", arr2); // arr2 : [ 1, 'Aa', 3, 'coding', 'hhh@lll' ]

arr2[4] = "empty";

console.log("변경 후");
console.log("arr1 :", arr1); // arr1 : [ 1, 'Aa', 3, 'coding' ]
console.log("arr2 :", arr2); // arr2 : [ 1, 'Aa', 3, 'coding', 'empty' ]

console.log(arr1 === arr2); // false
```
