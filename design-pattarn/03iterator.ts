//简化迭代器 没有聚合类
interface Iterator1{
    next():any;
    first():any;
    isDone():boolean;
}
class ListIterator implements Iterator1{
    protected list:Array<any> = [];
    protected index:number=0;
    constructor(list:[]){
        this.list = list
    }
    first(){
        if(this.list.length){
            return this.list[0]
        }
        return null
    }   
    next():any{
        if(this.index<this.list.length){
            this.index += 1;
            return this.list[this.index]
        }
        return null
    }
    isDone():boolean{
        return this.index >= this.list.length
    }
}