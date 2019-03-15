//工厂模式 
//构造函数创建对象属性前，经过了非常复杂的处理，这让构造函数过于复杂
//必须将创建实例的逻辑和使用实例的逻辑分开
//原始代码
const get = (x)=>{return new Promise(()=>{})}
class People{
    name = '';
    age = 0;
    constructor(des){
        get('url').then(data=>{
            // this.name=data.name;
            get('url?name='+this.name).then(data=>{
                // this.age = data.age
            })
        })
    }
}
//工厂模式

class People1{
    name:string=''
    age:number = 0;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age
    }
}

async function peopleFactory(description:any){
    const name = await get('url');
    const age = await get('url?name');
    return new People1(name as string,age as number)
}
//工厂进阶
//创建函数，根据参数返回对象的工厂函数
//创建类，集中管理工厂函数来处理复杂度