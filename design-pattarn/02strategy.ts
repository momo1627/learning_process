//类策略行为模型
//策略模式环境类，维持一个策略类作为策略属性，初始化绑定一策略
//环境类暴露一个行为逻辑接口，该方法中调用策略类的方法
//不同策略类中定义不同的策略方法，暴露给环境类
//传入不同策略类，使不同环境类的实例拥有不同的执行逻辑
//类似记录状态对象，但状态对象暴露其属性，策略类暴露其方法


//创建策略接口，或抽象策略类，是所有策略类的父类
interface Strategy{
    doOperation(num1:number,num2:number):number
}
//创建具体策略类实现策略接口或抽象策略类，是策略的具体化
class Add implements Strategy{
    doOperation(num1:number,num2:number):number{
        return num1+num2
    }
}
class Substract implements Strategy{
    doOperation(num1:number,num2:number):number{
        return num1-num2
    }
}
class Multiple implements Strategy{
    doOperation(num1:number,num2:number):number{
        return num1*num2
    }
}
//环境类，即策略/算法的使用者，通过引用策略解决问题
class Calculator {
    //将策略实例作为使用的的一个属性
    strategy:Strategy;
    constructor(strategy:Strategy){
        this.strategy = strategy;
    }
    //使用者行为，调用策略实例的方法
    execute = (num1:number,num2:number)=>{
        return this.strategy.doOperation(num1,num2)
    }
} 
//不同执行者，传入不同策略实例，从而执行不同策略
const result = [new Calculator(new Add()).execute(1,2),new Calculator(new Substract()).execute(1,2)]
console.log(result)

//将策略的逻辑 从使用者类中分离出去，方便维护，也增加可读性
//策略不能太多