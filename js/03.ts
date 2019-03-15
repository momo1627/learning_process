import { promises } from "fs";

//promise
interface Main{
    (resolve,reject):Promise1
}
class PromiseState{
    promise:Promise1;
    then(){};
    catch(){};
}
class PendingState extends PromiseState{
    promise:Promise1
    constructor(p:Promise1){
        super()
        this.promise = p
    }
    setState(){
        if(this.promise.main()){
            this.promise.setState(new Fulfilled(this.promise))
        } else{
            this.promise.setState(new Rejected(this.promise))
        }
    }
    then(){};
    catch(){}
}
class Fulfilled extends PromiseState{
    promise:Promise1
    constructor(p:Promise1){
        super()
        this.promise = p
    }
    then(){}
}
class Rejected extends PromiseState{
    promise:Promise1
    constructor(p:Promise1){
        super()
        this.promise = p
    }
    catch(){}
}
class Promise1{
    main;
    state:PromiseState = new PendingState(this)
    constructor(func){
        this.main = func
    }
    setState(s:PromiseState){
        this.state = s
    }
    then(resolve){
        resolve(this.main())
    };
    catch(reject){
        reject(this.main())
    };
}