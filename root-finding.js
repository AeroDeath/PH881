class NRArcTan{

    foo(x){
        return Math.atan(x);
    }

    grad(x){
        return 1 + x*x;
    }

    iter(x){
        return x - this.foo(x)/this.grad(x);
    }
}