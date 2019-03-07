# 타입스크립트 정리

## 설치

```bash
> npm install -g typescript
```

## 첫 타입스크립트 문서 만들기

```typescript
// greeter.ts

function greeter(person) {
    return "Hello! " + person;
}

let user = "Hong";

document.body.innerHTML = greeter(user);
```

다음과 같이 typescript 문서를 작성한 후, 콘솔상에서 다음과 같이 치면

```bash
> tsc greeter.ts
```

위 타입스크립트가 일종의 __컴파일__ 과정을 거친 후에, `.js` 문서로 바뀌게 된다.

```js
function greeter(person) {
    return "Hello! " + person;
}
var user = "Hong";
document.body.innerHTML = greeter(user);
```

## JS와 TS의 타입

TS는 JS의 타입 뿐만 아니라 다양한 타입을 지원한다. 기본적인 JS의 타입은 다음과 같다.

+ Boolean
+ Number
+ String
+ Array
+ Null / Undefined

그리고 TS에는 추가된 타입들은 다음과 같다.

+ Tuple : Array 내의 요소 개수와 자료형을 고정
+ Any : 모든 자료형
+ Void : 반환 없음(_함수에 주로 사용_)
+ Never : 변수에 아무것도 할당 할 수 없다. (`null` 과 `undefined` 도 할 수 없다.)
+ Enum : TS에서는 역매핑이 가능한 객체라고 보면 된다.

## 타입 명시

`greeter.ts`에서 다음과 같이 `:`을 이용해 매개변수와 함수리턴값의 타입을 지정할 수 있다.

```typescript
// greeter.ts
function greeter(person : string) : string {
    return "Hello! " + person;
}
//...
```

만약에, `let user = 1` 과 같이, `Number` 형이라면 다음과 같은 오류를 발생시킨다.

```
greeter.ts:7:35 - error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
7 document.body.innerHTML = greeter(user);
```

JS는 기본적으로 선언시 자료형을 따로 명시하지 않기 때문에, 예기치 않은 오류가 발생하기 쉽다. 이를 사전에 막을 수 있다.


## 함수 선택적 인자

JS의 경우 매개변수는 `arguments` 에 배열 형식으로 저장된다. 따라서, 가변인자 함수를 만들 수 있다. (*또 오버로딩을 허용하지 않기 때문에 필요하다.)

TS에서는 선택적 인자를 지정할 수 있다. `?`를 이용한다.

```ts
function cat(name: string, color?: string): string {
    if(!color)
        return `${name} meows`;
    else
        return `${color} ${name} meows`;
}

console.log(cat("Lara"));
console.log(cat("tina", "Yellow"));
```

`color`에 `?`를 붙이면서, color는 선택적인 인자가 되어 작동한다.

위 코드를 컴파일하면 다음과 같다.

```js
function cat(name, color) {
    if (!color)
        return name + " meows";
    else
        return color + " " + name + " meows";
}
console.log(cat("Lara"));
console.log(cat("tina", "Yellow"));
```

## UnionType

TS는 중복된 식별자를 가진 메소드, 즉 오버로딩을 허용하지 않는다.
따라서, 다양한 타입을 가진 인자의 경우 다음과 같이 `|`를 사용하여 타입을 지정할 수 있다.

```ts
class Foo{
    constructor(arg :string | number) {
        //...
    }
}
```
이와 같이 constructor의 인자 타입은 문자열이거나 숫자형이 될 수 있다.

## Interface

JAVA의 Interface 가 모티브이다.

```ts
// interface.ts
interface Student {
    firstname : string;
    lastname : string;
    studentNumber : number;
}

function info(student : Student) {
    return `Name : ${student.firstname} ${student.lastname} (${student.studentNumber})`
}

let hong = {
    firstname : "H",
    lastname : "JB",
    studentNumber : 141093
};

console.log(info(hong))
```

이를 컴파일하면...

```js
function info(student) {
    return "Name : " + student.firstname + " " + student.lastname + " (" + student.studentNumber + ")";
}
var hong = {
    firstname: "H",
    lastname: "JB",
    studentNumber: 141093
};
console.log(info(hong)); // Name : H JB (141093)
```

이와 같다.

## 클래스 표현

TS에서는 JS와 달리 class를 선언할때 자료형과 접근한정자를 적는것이 좋다.

```ts
class Account{
    private balance: number; // 객체 내에서만 사용가능하다.
    constructor(public owner: string) { //생성자
        this.balance = 0;
        console.log("new Account has just opened!")
    }
    getBalance(): number {  //메소드; 무조건 public 이다.
        return this.balance;
    }
    deposit(money: number): void {
        this.balance += money;
        console.log('+' + money);
    }
}

let Hong = new Account('Hong');
Hong.deposit(100);
Hong.deposit(200);
console.log(Hong.getBalance());
```

접근한정자는 `private`,`public`,`protected`가 있다. 따로 지정하지 않는 경우, 기본값으로 `public`이 들어간다. 참고로 `protected`는 해당 객체와 상속한 객체에서만 사용가능하다.

위 코드를 컴파일하면 다음과 같다.

```js
var Account = /** @class */ (function () {
    function Account(owner) {
        this.owner = owner;
        this.balance = 0;
        console.log("new Account has just opened!");
    }
    Account.prototype.getBalance = function () {
        return this.balance;
    };
    Account.prototype.deposit = function (money) {
        this.balance += money;
        console.log('+' + money);
    };
    return Account;
}());
var Hong = new Account('Hong');
Hong.deposit(100);
Hong.deposit(200);
console.log(Hong.getBalance());
```

여기서 `/** @class */`는 JSDoc을 사용시, Class 라는 것을 명시적으로 나타낼 때 사용한다.
클래스 선언부에서 즉시실행함수를 사용하였는데, 이는 변수명 충돌을 막기 위함으로 보인다.

## Readonly 제한

객체 내부의 접근한정자는 `public`, `private`, `protected` 가 있다. 하지만, 추가적으로 `readonly` 키워드를 통해 변수 쓰기를 막을 수 있다.

우리가 은행에 계좌를 개설할때, 은행명을 자유자재로 바꿀 수 없다. 따라서...

```ts
class Account{
    private balance: number;
    public readonly bankname = "Kookmin";   // 재할당 불가
    constructor(public owner: string) { //생성자
        this.balance = 0;
    //...
```

## 상속

상속은 Java와 같이 `extends` 키워드를 사용한다.

```ts
class Parent{
    public pmember: any;
    constructor(){
        this.pmember = 'parent'
    }
    pmethod(): any{
        return 'pmethod'
    }
}

class Child extends Parent{
    public cmember: any;
    constructor(){
        super();
        this.cmember = 'child'
    }
    cmethod(): any{
        return 'cmethod'
    }
}

var aa = new Child();
console.log(aa.cmember); // child
console.log(aa.pmember); // parent
console.log(aa.cmethod()); // cmethod
console.log(aa.pmethod()); // pmethod
```

이때, 자손 객체의 생성자는 반드시 `super()` 를 통해 상위 객체의 생성자를 호출해야 한다.

위 소스를 컴파일하면 다음과 같다.

```js
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Parent = /** @class */ (function () {
    function Parent() {
        this.pmember = 'parent';
    }
    Parent.prototype.pmethod = function () {
        return 'pmethod';
    };
    return Parent;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        var _this = _super.call(this) || this;
        _this.cmember = 'child';
        return _this;
    }
    Child.prototype.cmethod = function () {
        return 'cmethod';
    };
    return Child;
}(Parent));
var aa = new Child();
console.log(aa.cmember); // child
console.log(aa.pmember); // parent
console.log(aa.cmethod()); // cmethod
console.log(aa.pmethod()); // pmethod
```

굉장히 복잡한 코드이다. 프로토타입 기반 언어인 JS를 객체지향의 형태로 만들기 위한 함수 `__extends()`가 사용된 것으로 보인다.


## 제네릭

Java와 같은 정적 타입 언어들의 특징에서 가져왔다. 제네릭은 함수나 객체에서 사용할 자료형을 결정하는 것을 의미한다.

제네릭을 쓰는 예는 스택에서 잘 나타난다. JS의 특성상 배열 내부에는 어떤 자료형이라도 올 수 있다. JS를 통해 스택을 구현할 때, 자료형에 민감하다면 큰 애로점을 낳는다.

따라서 제네릭을 통해서 자료형을 일관되게 만들 수 있다.

```ts
class Stack<T> {
    private data: T[] = [];
    constructor() {}
    push(item: T): void{
        this.data.push(item);
    }
    pop(): T {
        return this.data.pop();
    }
    info(): void{
        console.log(this.data);
    }
}

// 숫자만 담는 스택
const numberStack = new Stack<number>();
// 문자열만 담는 스택
const stringStack = new Stack<string>();

numberStack.push(1)
numberStack.info()              // [ 1 ]
numberStack.push(2)
numberStack.info()              // [ 1, 2 ]
console.log(numberStack.pop()); // 2
numberStack.info()              // [ 1 ]
// numberStack.push('a')        // 에러 발생

stringStack.push('a')
stringStack.info()              // [ 'a' ]
stringStack.push('b')
stringStack.info()              // [ 'a', 'b' ]
console.log(stringStack.pop()); // 'b'
stringStack.info()              // [ 'a' ]
```

이때, 타입 지정 식별자 `T`는 다른 기호로 사용할 수 있다.

위 코드를 컴파일 하면 다음과 같다.

```js
var Stack = /** @class */ (function () {
    function Stack() {
        this.data = [];
    }
    Stack.prototype.push = function (item) {
        this.data.push(item);
    };
    Stack.prototype.pop = function () {
        return this.data.pop();
    };
    Stack.prototype.info = function () {
        console.log(this.data);
    };
    return Stack;
}());
var numberStack = new Stack();
var stringStack = new Stack();
//...
```

## Enum Type

Enum 자료형은 정적언어에서 가져왔다.

```ts
enum animal {
    CAT,
    DOG
}

console.log(animal.CAT);    // 0
console.log(animal.DOG);    // 1
```

다음과 같이 `enum`으로 선언된 멤버들은 각각 순번대로 `0`,`1`,`2`,... 로 값이 적용된다.

```ts
enum animal {
    CAT,
    DOG
}

console.log(animal.CAT);   // 0
console.log(animal.DOG);   // 1
console.log(animal[0]);    // CAT
console.log(animal[1]);    // DOG
```

또한 다음과 같이 역참조가 가능하다.

```ts
enum animal {
    CAT = 2,
    DOG = 3
}

console.log(animal.CAT);   // 2
console.log(animal.DOG);   // 3
console.log(animal[2]);    // CAT
console.log(animal[3]);    // DOG
```

enum의 멤버를 숫자로 초기화 하면 다음과 같이 가능하다.

```ts
enum animal {
    CAT = 2,
    DOG = 2
}

console.log(animal.CAT);   // 2
console.log(animal.DOG);   // 2
console.log(animal[2]);    // DOG
```

다만 두 숫자가 같은 경우, 역참조시 맨 마지막 멤버가 출력된다.

```ts
enum animal {
    CAT = "meow",
    DOG = "woof"
}

console.log(animal.CAT);   // meow
console.log(animal.DOG);   // woof
console.log(animal['meow']);    // undefined
console.log(animal['woof']);    // undefined
```

다만, 주의할 점은 enum 변수들을 문자열로 초기화되면 역참조를 할 수 없다.

`enum`은 보통 `const enum`의 형태로 많이 쓰며, 이 경우 플래그의 역할을 할 수 있다고 한다.

컴파일시에는 다음과 같은 형태의 코드가 나타난다.

```js
var animal;
(function (animal) {
    animal[animal["CAT"] = 2] = "CAT";
    animal[animal["DOG"] = 3] = "DOG";
})(animal || (animal = {}));
```

복잡한 코드지만 결국 다음과 같은 코드와 비슷한 구조를 만들게 된다.

```js
var animal = {
    "CAT" : 2,
    "DOG" : 3,
    2 : "CAT",
    3 : "DOG"
}
```

따라서 역참조가 가능하다.
