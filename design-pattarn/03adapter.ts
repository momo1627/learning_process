//示例 手机充电
//目标接口，适配模式，对被适配者接口的修改目标，模板
interface I5vInterface{
    connect5v():void;
}
//类适配，定义一个适配类，在适配类包装修改被适配类接口，使它实现目标类
//被适配者有一个接口，连接220v电源
class Voltage200v{
    connect220v(){
        console.log('接通200v')
    }
}
//适配器类，在适配器类，将被适配者接口，包装成一个符合目标接口要求的接口
//适配器类要继承被适配者的接口，并且要实现一个目标类的接口
class ClassPowerAdapter extends Voltage200v implements I5vInterface{
    //实现目标的接口
    connect5v():void{
        // 在接口里包装修改被适配者的接口
        this.connect220v();
        console.log('转化了电源')
    }

}
//对象适配: 适配器中持有被适配类的对象的引用
class InstancePowerAdapter implements I5vInterface{
    // 对象适配中 适配器引用一个被适配类实例，而不是继承一个被适配类的方法
    private voltage220v:Voltage200v
    constructor(v:Voltage200v){
        this.voltage220v = v;
    }
    //在适配器里调用对象的接口，再包装扩展为目标接口要求
    connect5v():void{
        this.voltage220v.connect220v();
        console.log('转化')
    }
}

//客户类 适配器封装好接口后，接口的使用者
class Phone {
    //客户类里传入满足目标接口的对象，即适配器类
    private voltage5v:I5vInterface;
    constructor(voltage5v:I5vInterface){
        this.voltage5v = voltage5v
    }
    //客户类调用适配好的接口
    charge():void{
        this.voltage5v.connect5v();
        console.log('手机开始充电')
    }

}
//同一个接口，可以在不同适配器类里包装成不同的目标接口