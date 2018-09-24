class Stack {
    constructor() {
        this.stack = [];
    }

    isEmpty(){
        return 0 === this.stack.length;
    }

    top(){
        return this.stack[ this.stack.length - 1 ];
    }

    assignTop(thang){
        this.stack[ this.stack.length - 1 ] = thang;
    }

    push(thang){
        this.stack.push(thang);
    }

    pop(){
        return this.stack.pop();
    }

}

export default Stack;