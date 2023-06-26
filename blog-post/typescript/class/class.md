---
slug: "/typescript/class"
date: "2023-06-23"
title: "class type"
categories: ["Typescript"]
desc: "타입스크립트에서 class 타입 선언하기"
topbg: "../topbg.png"
thumbnail: "../thumbnail.png"
---

타입스크립트가 class문법에서 타입을 어떻게 선언하는지 알아보자.

## Javascript에서 클래스란?

클래스는 자바스크립트의 같은 프로퍼트의 객체를 여러개 생성할 수 있는 문법

만일 똑같은 프로퍼티 형태의 여러개의 객체를 생성하면 코드가 비효율적이고 중복이 발생한다.

```js {numberLines}
let studentA = {
  name: "user1",
  grade: "A",
  age: 22,
  study() {
    console.log("study hard");
  },
  introduce() {
    console.log("Hello");
  },
};

let studentB = {
  name: "user2",
  grade: "B",
  age: 20,
  study() {
    console.log("study hard");
  },
  introduce() {
    console.log("Hello");
  },
};

let studentC = {
  name: "user3",
  grade: "C",
  age: 21,
  study() {
    console.log("study hard");
  },
  introduce() {
    console.log("Hello");
  },
};
```
객체 studentA, studentB, studentC 객체는 프로퍼티형태가 같고 코드도 길어지고 중복이 발생한다.  

### 클래스 선언
하지만 클래스를 사용하면 간결하고 여러개의 객체를 생성할 수 있다.

```ts {numberLines}
class Student {
  // 필드
  name;
  grade;
  age;

  // 생성자
  constructor(name, grade, age) {
    this.name = name;
    this.grade = grade;
    this.age = age;
  }

  study() {
    console.log("study hard");
  }
  introduce() {
    console.log(`Hello I am ${this.name}.`);
  }
}

// 클래스를 이용하여 만든 객체 -> 인스턴스
// student instance
let studentA = new Student("user1", "A", 22);
let studentB = new Student("user2", "B", 20);
let studentC = new Student("user3", "C", 21);
```
객체로 생성한 것보다 코드가 더 간결해졌다. <br /><br />


### 클래스 상속
또한 상속을 사용하여 중복된 필드를 재사용할 수 있어 중복으로 같은 필드를 생성하지 않아도 된다.


```js {numberLines}
class Student {
  // 필드
  name;
  grade;
  age;

  // 생성자
  constructor(name, grade, age) {
    this.name = name;
    this.grade = grade;
    this.age = age;
  }

  study() {
    console.log("study hard");
  }
  introduce() {
    console.log(`Hello I am ${this.name}.`);
  }
}


// 클래스 상속
class StudentDeveloper extends Student {
  // 필드
  favoriteSkill;

  // 생성자
  constructor(name, grade, age, favoriteSkill) {
    super(name, grade, age); 
    // Student 클래스의 필드를 상속 받고 있기 떄문에 현재의 생성자 함수에서 3개의 생성자를 선언하지 않음
    this.favoriteSkill = favoriteSkill;
  }

  // 메서드
  study() {
    console.log("study hard");
  }
  introduce() {
    console.log(`Hello I am ${this.name}.`);
  }
  programming() {
    console.log(`my best program-lang is ${this.programming}`);
  }
}

const studentDeveloper = new StudentDeveloper("users", "A+", 30, "Typescript");
console.log(studentDeveloper);
```


## class에서 타입 선언하기
 ```ts {numberLines}
class Employee {
  // 필드
  name: string;
  age: number;
  position: string;

  // 생성자
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log("working");
  }
}

const employeeB = new Employee("user2", 22, "UI");
console.log(employeeB);
 ```
클래스에서  필드와 생성자의 매개변수에 타입을 선언하면 된다. <br /> <br />

또한 클래스는 타입으로 선언할 수 있어서 아래와 같이 사용할 수 있다.

```ts {numberLines}
const employeeC: Employee = {
  name: "",
  age: 0,
  position: "",
  work() {},
};
```
이때  객체의 `name`, `age`, `position`, `work`의 프로퍼티를 모두 선언하지 않을 경우 에러가 발생한다.


### 상속 시 타입 선언하기

```ts {numberLines}
class Employee {
  // 필드
  name: string;
  age: number;
  position: string;

  // 생성자
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log("working");
  }
}

class ExecutiveOfficer extends Employee {
  officeNumber: number;
  constructor(name: string, age: number, position: string, officeNumber: number) {
    super(name, age, position); 
    // ts에서 super를 선언하지 않으면 에러가 발생한다. 
    // js에서는 생략해도 에러가 발생하지 않는다.
    this.officeNumber = officeNumber;
  }
}

const executiveOfficer = new ExecutiveOfficer("own", 40, "ceo", 1);
```

## 접근 제어자
접근 제어자(Access Modifier)는 클래스내에 특정 필드나 메서드를 접근할 수 있는 범위를 지정하는 것이다.

- `private`를 선언하면 class내에서만 사용가능 하다.
- `protected`를 선언하면 class와 상속받은 클래스만 사용 가능한다.
- `public`을 선언하면 모든 곳에서 선언이 가능하다.

```ts {numberLines}
class Employee {
  // 필드
  private name: string; 
  protected age: number;
  public position: string;

  // 생성자
  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log(`${this.name}`);
  }
}

const employee = new Employee("user1", 22, "developer");
employee.work(); // ✅ user1 출력, work메서드는 클래스 내부에 있어서 name 접근할 수 있어서 에러가 발생하지 않는다.
employee.name = "user2"; // ❌ 클래스 내에서만 엑세스할 수 있습니다.
```

age가 `protected`로 선언했기 때문에 상속받은 클래스에서 사용가능해서 에러가 발생하지 않는다.
```ts P{numberLines}
class ExecutiveOfficer extends Employee {
  officeNumber: number;
  constructor(name: string, age: number, position: string, officeNumber: number) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }
  func() {
    this.age; // ✅ 부모 클래스에서 상속 받음
    this.name; // ❌ private라 에러발생
  }
}
```

- constructor 함수의 매개변수에 접근 제어자를 선언하면 필드에 자동으로 프로퍼티가 자동적으로 선언된다.
- constructor 함수에 this로 선언된 선언식을 생략해도 자동으로 매개변수가 프로퍼티로 값으로 전달된다.

```ts {numberLines}
class Employee {
  // 필드
  private name: string; 
  protected age: number;
  public position: string;
  // 생성자
  constructor(
    private name: string, 
    protected age: number, 
    public position: string
  ) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // 메서드
  work() {
    console.log(`${this.name}`);
  }
}
```
생략 후
```ts {numberLines}
class Employee {
  // 필드

  // 생성자
  constructor(
    private name: string, 
    protected age: number, 
    public position: string
  ) {}

  // 메서드
  work() {
    console.log(`${this.name}`);
  }
}
```

## 인터페이스와 클래스

클래스에서 interface를 사용하려면 `implements`를 사용한다. 그리고 인터페이스는 클래스의 필드와 메서드가 어디 위치에 있는지 정의 할 수 있다.
```ts {numberLines}
interface CharacterInterface {
  name: string;
  moveSpeed: number;
  move(): void;
}
// implements 구현하다
class Character implements CharacterInterface {
  name: string;
  moveSpeed: number;
  constructor(name: string, moveSpeed: number) {
    this.name = name;
    this.moveSpeed = moveSpeed;
  }
  move(): void {
    console.log(`${this.moveSpeed} speed`);
  }
}
```

- interface가 선언된 클래스에서 접근 제어자를 선언할 경우 public만 허용한다. 
- private를 선언하려면 interface에 선언하지 말고 class 내부에서 선언해야 한다.

```ts {numberLines}
class Characters implements CharacterInterface {
  constructor(public name: string, public moveSpeed: number, private power:string) {}
  move(): void {
    console.log(`${this.moveSpeed} speed`);
  }
}
const characters = new Character("user1", 100);
characters.move();
```
## referance

- [한입 타입스크립트 핸드북](https://ts.winterlood.com/)
