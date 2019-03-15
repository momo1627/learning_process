//Mediator{manage Collegue; handleContact(){Collegue.getMessage()}} 
// 中介类中绑定不同同事类处理，绑定同事类；通过调用不同同事类的接受消息方法,封装同事类通信执行逻辑
//Collegue{manage Mediator;sendToMediator(){mediator.contact} getMessageFromMediator(){}}
//同事类绑定中介，定义发送消息方法，调用mediator.contact(mes)发送消息给中介
//同事类定义接受消息方法getMessage()，暴露给mediator,中介处理过消息后，调用Collegue.getMessage()接受消息
//中介类与同事类相互绑定，双向数据流
//观察者模式，观察者与目标单向绑定，数据从目标流向观察者；

//租房案例 租房和房客通过中介者联系，两者不直接联系
//抽象中介者
abstract class Mediator{
    abstract contact(message:string,person:Human):void;
}
//抽象同事类
abstract class Human{
    //抽象同事类保存中介类
    name:string;
    mediator:Mediator;
    //不同同事类可以接入不同中介类
    constructor(name:string,mediator:Mediator){
        this.name = name;
        this.mediator = mediator;
    }
}
//具体同事类 房主
class HouseOwner extends Human{
    //同事类向中介类通信方法
    contact(message:string){
        console.log(`房主 ${this.name} 发送消息 ${message}`);
    //调用自身绑定的中介类的接受信息方法
        this.mediator.contact(message,this)
    }
    //同事类接受绑定中介发来通信
    getMessage(message:string){
        console.log(`房主 ${this.name} 收到消息 ${message}`);
    }
}
//具体租客类 
class Tenant extends Human{
    //同事类向中介类通信方法
    contact(message:string){
        console.log(`租客 ${this.name} 发送消息 ${message}`);
    //调用自身绑定的中介类的接受信息方法
        this.mediator.contact(message,this)
    }
    getMessage(message:string){
        console.log(`租客 ${this.name} 收到消息 ${message}`);
    }
}

//具体中介者类
class ConcreteMediator extends Mediator{
    //保存同事类
    private tenant:Tenant;
    private houseOwner:HouseOwner;
    setTenant(tenant:Tenant){
        this.tenant = tenant
    }
    setHowseOwner(houseOwner:HouseOwner){
        this.houseOwner = houseOwner
    }
    //实现中间类的通信方法
    contact(message:string,person:Human){
        console.log('中介传递消息')
        if(person === this.houseOwner){
            this.tenant.getMessage(message);
        } else {
            this.houseOwner.getMessage(message);
        }
    }
}
function mediatorDemo(){
    const mediator = new ConcreteMediator();
    const houseOwner = new HouseOwner('房东大人',mediator);
    const tenant = new Tenant('房客大人',mediator);
    //向中介注册成员
    mediator.setHowseOwner(houseOwner);
    mediator.setTenant(tenant);
    //同事只需要发送消息，消息的接收者关系，都在中介里维护
    tenant.contact('我要退房')
    houseOwner.contact('不行，没通知我')

}
mediatorDemo()