//contextObject={
  //contextProperties;
  //state:StateObject 环境对象绑定一个状态对象作为属性
  //constructor(){this.state;this.contextProperties} 初始化设置环境对象的状态属性
  //setState(newstate){this.state=new OtherState()}//context传入新的state对象 改变state属性
  //contextHandleProperties(){} //context 将改变自身属性方法api暴露给state对象
  //contextmethod(){state.relativemethod}} //context 暴露自身行为api给调用者，其本质是调用state对象的对应方法；
//stateObject={
  //stateProperties;
  //text:TextObject; 状态对象绑定一个环境对象作为属性
  //constructor(text){this.text=textObject,stateProperties} 初始化设置环境属性
  //statemethods(){ context.contextHandleProperties,statecheck()} 状态对象封装改变环境对象属性的调用和检查状态方法，暴露给环境对象执行方法
  //statecheck(){if(contextProperties){context.setState(otherState)}} 状态对象封装环境对象状态改变逻辑，根据状态属性的值，改变环境对象的状态属性
// }
//环境对象可以没有行为执行逻辑，只是记录状态
//环境对象定义状态属性维持一个状态对象
//仍然在状态对象里定义状态的值和改变/获取状态的方法
//将状态对象传给环境对象，环境对象记录当前状态，状态对象定义改变状态


//模拟场景 银行账户 账户状态：正常，透支，受限
//账户类，代表状态模式中的环境 维持一个状态
class Account{
    //状态，账户名，余额等重要属性都是不会暴露出去的
    private name:string;
    //状态属性，保存的是一个对象
    private state:State;
    //余额
    private balance = 0;
    constructor(name:string){
        this.name = name;
        //传入一个初始状态类，并在私有state属性中维持
        this.state = new NormalState(this);
        console.log(`用户 ${this.name} 开户，余额为 ${this.balance}`);
        console.log('--------');
    }
    getBalance():number{
        return this.balance
    }
    setBalance(balance:number){
        this.balance = balance
    }
    //通过setState 传入新的状态对象，改变状态
    setState(state:State){
        this.state = state
    }
    deposit(amount:number){
        this.state.deposit(amount)
        console.log(`存款 ${amount}`);
        console.log(`余额为 ${this.balance}`);
        console.log(`账户状态为 ${this.state.getName()}`);
        console.log('--------');
    }
    withdraw(amount: number) {
        this.state.withdraw(amount);
        console.log(`取款 ${amount}`);
        console.log(`余额为 ${this.balance}`);
        console.log(`账户状态为 ${this.state.getName()}`);
        console.log('--------');
    }
    computeInterest() {
        this.state.computeInterest();
      }
}
//状态抽象类
abstract class State{
    private name:string;
    //状态类里封装一个环境，将环境的状态与状态方法绑定
    protected acc: Account;
    constructor(name:string){
        this.name = name;
    }
    //状态类共有方法
    getName(){
        return this.name;
    }
    //抽象状态类 定义抽象方法
    abstract deposit(amount: number);  
    abstract withdraw(amount: number);  
    abstract computeInterest();  
    //状态转化方法
    abstract stateCheck();
}
// 正常状态类
class NormalState extends State{
    acc: Account;
    constructor(acc:Account){
        //给状态绑定一个环境对象
        super('正常');
        this.acc = acc;
    }
    //正常状态下，不同方法对绑定状态不同执行
    deposit(amount: number) {
        this.acc.setBalance(this.acc.getBalance() + amount);
        this.stateCheck();
      }
      withdraw(amount: number) {
        this.acc.setBalance(this.acc.getBalance() - amount);  
        this.stateCheck();
      }
      computeInterest() {
        console.log('正常状态，无须支付利息');
      }
      //根据账户余额，给环境对象传入不同状态对象，改变环境对象的状态，
      stateCheck() {
        if (this.acc.getBalance() > -2000 && this.acc.getBalance() <= 0) {  
            this.acc.setState(new OverdraftState(this.acc));  
        } else if (this.acc.getBalance() == -2000) {  
            this.acc.setState(new RestrictedState(this.acc));  
        } else if (this.acc.getBalance() < -2000) {  
            console.log('操作受限');  
        }
      }
}
  // 透支状态
  class OverdraftState extends State {
    acc: Account;
    constructor(acc: Account) {
      super('透支');
      this.acc = acc;
    }
    deposit(amount: number) {
      this.acc.setBalance(this.acc.getBalance() + amount);
      this.stateCheck();
    }
    withdraw(amount: number) {
      this.acc.setBalance(this.acc.getBalance() - amount);  
      this.stateCheck();
    }
    computeInterest() {
      console.log('计算利息');
    }
    // 状态转换
    stateCheck() {
      if (this.acc.getBalance() > 0) {
        this.acc.setState(new NormalState(this.acc));
      } else if (this.acc.getBalance() == -2000) {
        this.acc.setState(new RestrictedState(this.acc));
      } else if (this.acc.getBalance() < -2000) {
        console.log('操作受限');
      }
    }
  }
    // 受限状态
    class RestrictedState extends State {
        acc: Account;
        constructor(acc: Account) {
          super('受限');
          this.acc = acc;
        }
        deposit(amount: number) {
          this.acc.setBalance(this.acc.getBalance() + amount);
          this.stateCheck();
        }
        withdraw(ammount: number) {
          console.log('账号受限，取款失败');
        }
        computeInterest() {
          console.log('计算利息');
        }
        // 状态转换
        stateCheck() {
          if (this.acc.getBalance() > 0) {  
            this.acc.setState(new NormalState(this.acc));  
          } else if (this.acc.getBalance() > -2000) {  
            this.acc.setState(new OverdraftState(this.acc));  
          }
        }
      }
    
      function stateDemo() {
        const acc = new Account('Bob');
        acc.deposit(1000);  
        acc.withdraw(2000);  
        acc.deposit(3000);  
        acc.withdraw(4000);  
        acc.withdraw(1000);  
        acc.computeInterest(); 
      }
//每个环境类，维持一个state对象作为属性，定义环境类的方法调用state的方法，
//每个具体状态类的方法，绑定一个环境对象，根据状态本身，定义不同state的方法，对应环境中的方法
//每个状态类方法，定义状态转化方法，根据环境的属性变化，给环境传入不同状态实例，改变环境维持的state属性

//本例环境类，账户传入正常状态，调用存钱取钱利息方法时，调用normalstate中对应方法，其方法会改变环境对象的内容
//当账户余额低于0时，进入透支状态，环境对象传入透支状态对象，计算利息方法调用透支状态的计算利息方法
//当账户处于禁用状态，环境对象方法，调用禁用状态方法

//环境对象，根据其维持的状态对象，处于不同状态，根据不同状态，相同方法调用，产生不同效果
//环境对象本身方法，不直接改变自身属性，不改变其本身方法内容
//环境对象定义方法中通过调用状态对应方法，间接改变自身属性
//当自身属性达到一定条件，状态对象对应方法，调用状态改变方法，给环境对象传入不同状态对象
//不同状态对象，改变环境对象的状态，从而改变环境对象方法的调用内容
