//Receiver{methods...} 所有行为逻辑封装在接收者类中，暴露给具体命令类
//Commands{receiver:Receiver;execute(){receiver.method}}不同命令类调用Receiver不同的执行逻辑
//命令类中可以定义命令属性和命令方法，基于接收者执行逻辑，创建复杂执行逻辑
//宏命令，定义一系列命令，同时调用；
//invoker通过不同命令类的实例执行，实现不同逻辑
//命令模式和状态，策略有点相反，
//命令模式，所有逻辑封装在环境中(receiver)，命令模式封装receiver
//状态和策略，所有封装在所有状态和策略里，环境封装策略和状态

//简单命令
//场景 客户点餐，客户是invoker 具体菜单是 command 厨师是 Receiver

//命名基类 或 接口，只包含执行方法
class Command{
    execute(arg?):void{}
}
//Receiver 接收者类 厨师类
class Cook{
    //接收者的信息外界无需知道，可以实私有属性
    private name:string;
    constructor(name:string){
        this.name = name;
    }
    //接收者的执行内容
    makeBread(){
        console.log(`厨师 ${this.name} 在做面包`)
    }
    makeMeat(){
        console.log(`厨师 ${this.name} 在做肉`)
    }
}
//定义 不同的具体命令基类 定义接收者
class SimpleCommand extends Command{
    receiver:Cook
}
//定义具体命令子类，将接收者的执行方法封装为不同命令
class BreadCommand extends SimpleCommand{
    //传入接收者对象，不同接收者执行不同的命令
    constructor(cook:Cook){
        super();
        this.receiver = cook;
    }
    //根据命令子类的逻辑，调用接收者的对应方法
    execute(){
        this.receiver.makeBread()
    }
}
class MeatCommand extends SimpleCommand{
    //传入接收者对象，不同接收者执行不同的命令
    constructor(cook:Cook){
        super();
        this.receiver = cook;
    }
    //根据命令子类的逻辑，调用接收者的对应方法
    execute(){
        this.receiver.makeMeat()
    }
}

function SimpleCommandDemo():void{
    //注册不同的接收者
    const cook1 = new Cook('Bob');
    const cook2 = new Cook('Ray');
    //生成命令绑定接收者，不同菜绑定不同厨师
    //但厨师即接收者，并不暴露给调用者invoker
    //接收者和调用者分离
    const breadCommand:Command = new BreadCommand(cook1)
    const meatCommand:Command = new MeatCommand(cook2)
    //调用者 调用命令接口，而不是实际接收者方法，客户点菜
    breadCommand.execute();
    meatCommand.execute();
}

//可撤销命令
//命令对象中保存接收者，还需要保存状态信息，即过去操作的内容
class AdvancedCommand extends Command{
    //接收者厨师
    receiver:Cook;
    //记录厨师做面包个数状态
    count:number;
    //调用一次接收者厨师的命令，改变一次状态
    execute(){
        this.count += 1;
        this.receiver.makeBread();
    }
    //撤销操作
    unexecute(){
        this.count -= 1;
        //初始停止做面包，次数减一
    }
}
//宏命令
//同时允许多个命令，不需要显示接收者，每个命令都定义了各自的接收者
class MacroCommand extends Command{
    //宏命令保存了所有命令
    cmdSet:Set<Command> = new Set;
    add(cmd:Command):void{
        this.cmdSet.add(cmd);
    }
    remove(cmd:Command):void{
        this.cmdSet.delete(cmd);
    }
    //宏命令调用时，所有保存的命令同时调用execute()
    execute():void{
        this.cmdSet.forEach((cmd:Command)=>{
            //但是并不知道子命令调用的具体行为是什么
            cmd.execute()
        })
    }
}