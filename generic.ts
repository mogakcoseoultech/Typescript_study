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

