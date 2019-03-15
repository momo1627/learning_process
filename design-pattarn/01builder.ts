class PeopleConfigBuilder{
    name: string = ''
    age: number = 0
    des: string = ''
    //还有很多属性
    async buildName(){
        this.name = await get('someUrl') as string
    }
    async buildAge(){
        this.age = await get('someUrl?name='+this.name) as number
    }
    async buildDes(description: any){
        this.des = await get(description) as string
    }
    //还有很多方法
}

class People2 {
    name: string = ''
    age: number = 0
    des: string = ''
    //很多属性
    constructor(peopleConfig: PeopleConfigBuilder) {
      this.name = peopleConfig.name
      this.age = peopleConfig.age
      this.des = peopleConfig.des
      //很多实例化
    }
  }
  
  async function people2Factory(description:any){
      const builder = new PeopleConfigBuilder();
      builder.buildAge();
      builder.buildDes('content');
      builder.buildName();
      //...调用很多方法
      return new People2(builder)
      //直接用建造者对象实例工厂类
  }