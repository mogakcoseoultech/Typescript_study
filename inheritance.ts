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
