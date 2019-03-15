//推模式
// Subject{set:Observer,Observer.take(mes)} 目标类封装观察者管理以及将消息数据发送给观察者
// 推模式目标类与观察者通信，在目标类中处理数据，在目标类中调用observer的take方法，将数据给观察者
//Observer{Subject.add(this),take(msg){handleMessage}} 
// 观察者类，调用目标方法，将自身绑定给目标，封装处理目标消息方法；由目标调用

//拉模式
// Subject{set:Observer,Observer.take(this)} 目标类封装观察者管理以及直接将目标本身发送给观察者
//拉模式目标类与观察者通信，不在目标类中处理数据，数据保存在目标类属性里，直接将目标发送给观察者
//Observer{Subject.add(this),take(meg){subject.property;handleMessage}}
//观察者，绑定目标，在内部调用目标属性得到数据，再处理数据

//推模型 目标向观察者发送改变的详细信息，不管是否需要，
//由目标维护观察者，目标里调用观察者接受消息的方法

//场景：顾客点菜后，服务员记录菜单，菜好了服务员(目标)通知顾客(观察者)
//该模型有两方面，服务员和顾客，顾客依赖服务员

//观察者类 Observer 可以是类或接口
//推模型，观察者类接受的是通知
class Observer{
    take(msg:string):void{}
}
//目标类 Object 可以实类，抽象类，或接口
class Subject{
    //set 保存观察者set 
    set:Set<Observer> = new Set();
    //add，通过set的add方法添加一个观察者
    add(obs:Observer):void{
        this.set.add(obs)
    }
    //remove,通过delete删除一个观察者
    remove(obs:Observer):void{
        this.set.delete(obs)
    }
    //触发通知的方法,
    notify(msg:string):void{
        //遍历观察者set，调用每个观察者的take方法，接受信息
        this.set.forEach(observer=>{
            console.log('我是目标统治的')
            observer.take(msg)
        })
    }
}
//目标具体类，服务员
class Waiter extends Subject{
    //扩展目标,给具体观察类特定信息，ready()调用通知方法
    ready():void{
        this.notify('ready')
    }
}
//观察者具体类，即客户类，继承扩展观察者类
class Client extends Observer{
    //扩展，添加自身名字属性
    name:string;
    //注册目标具体类，接受目标具体类的通知
    constructor(name:string,waiter:Waiter){
        super();
        this.name=name
        //将类本身，加入目标具体类的，观察者set，绑定观察者到目标者
        waiter.add(this)
    }
    //扩展观察者
    take(msg:string){
        console.log(`顾客 ${this.name} 收到了消息显示状态是<${msg}>， 到吧台领取了菜`);
    }
}
function observerPush(){
    //创建目标实例 服务员
    const waiter = new Waiter();
    //创建观察者实例 顾客，并绑定给服务员
    const bob = new Client('Bob',waiter);
    const mick = new Client('Mick',waiter);
    //菜准备好，服务员广播通知
    waiter.ready()
}
observerPush()

//拉模型 目标出最小通知外，什么也不送出，
//此后由观察者向目标询问细节，观察者里维护目标

//场景：顾客点菜后，从服务员领号，并不断向服务员询问是否做好
//拉模型，观察者接受的是目标，而不是目标的通知
class Observer1{
    take(subject:Subject1):void{}
}
class Subject1{
    //目标类中，观察者管理不变
    set:Set<Observer1> = new Set();
    add(obs:Observer1):void{
        this.set.add(obs)
    }
    remove(obs:Observer1):void{
        this.set.delete(obs)
    }
    //目标类发送给观察者接受对象，而不是消息
    notify():void{
        this.set.forEach(observer=>{
            observer.take(this)
        })
    }
}

//服务员类
class Waiter1 extends Subject1{
    status = 'doing';
    //拉模式中，具体目标类只发送通知，不发送具体数据,
    //数据包含在具体类中，发送给所有观察者
    ready():void{
        this.status = 'ready'
        this.notify()
    }
    //具体目标，定义一个得到具体数据的方法，发送给观察者调用，即询问
    getStatus():string{
        return this.status
    }
}
//具体观察者，顾客类
class Client1 extends Observer1{
    name:string;
    //观察者加入目标管理队列不变
    constructor(name:string,waiter:Waiter1){
        super();
        this.name = name;
        waiter.add(this)
    }
    //观察者接受通知的逻辑改变，接受一个具体目标类，
    //调用具体目标类中的询问方法，询问数据，当前状态
    take(waiter:Waiter1){
        const msg = waiter.getStatus();
        console.log(`顾客 ${this.name} 收到了消息显示状态是<${msg}>， 到吧台领取了菜`)
    }
}   
function observerPush1(){
    const  waiter = new Waiter1();
    const  bob = new Client1('Bob',waiter);
    const mick = new Client1('Mick',waiter);
    waiter.ready()
}
observerPush1()