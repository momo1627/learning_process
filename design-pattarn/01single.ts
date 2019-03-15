//懒汉单例
class PeopleSingle{
    static instance = null;
    //懒汉默认类属性为空
    private constructor(){}
    //构造函数私有不暴露
    public static getInstance(){
    //类方法给类属性赋值类实例，并判断是否有单例存在
        if(PeopleSingle.instance === null){
            PeopleSingle.instance = new PeopleSingle()
        }
        return PeopleSingle.instance;
    }
    //调用类方法时创建单例，实现懒汉模式

}
//饿汉单例
class PeopleSingle1{
    //类属性默认为单例类实例
    static instance = new PeopleSingle1();
    private constructor(){}
}
//直接调用类属性即得到单例，实现饿汉单例
PeopleSingle.instance

//构造函数私有，不可以继承
//类属性赋值类实例，不可改变