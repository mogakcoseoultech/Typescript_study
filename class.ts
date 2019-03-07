class Account{
    private balance: number;
    public readonly bankname = "Kookmin"
    constructor(public owner: string) {
        this.balance = 0;
        console.log("new Account has just opened!")
    }
    getBalance(): number {
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

