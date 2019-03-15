//示例 可视化组件
//抽象构件 具体构件和装饰器基类

//构件子类，一个可视化组件
class VisualComponent{
    //基础方法
    draw():void{
        console.log('绘制一个组件')
    }
}

//抽象装饰器，继承抽象构件
class Decorator extends VisualComponent{
    //抽象装饰器引用构件子类
    protected component:VisualComponent;
    constructor(component:VisualComponent){
        super();
        this.component = component
    }
    //抽象装饰器，实现构件所有方法
    draw():void{
        this.component.draw()
    }
}
//装饰器子类 给构件子类增加功能 由装饰器子类实现业务逻辑
class BorderDecorator extends Decorator{
    protected width:number;
    constructor(component:VisualComponent,borderWidth:number){
        super(component); //调用装饰器基类 构造函数
        this.width = borderWidth
    }
    //定义一个私有方法，用于扩展构件功能
    private drawBorder():void{
        console.log(`绘制宽度为${this.width}的边框`)
    }
    //扩展构件draw()方法，实现构件的装饰扩展
    draw(){
        this.drawBorder();
        this.component.draw()
    }
}
//另一个装饰器 滚动条的装饰器
class ScrollDecorator extends Decorator{
    private drawScrollBar():void{
        console.log('绘制滚动栏')
    }
    //增加逻辑
    draw():void{
        this.drawScrollBar();
        this.component.draw()
    }
}
//多功能的实现是，多层嵌套的装饰器类的实例
function decoratorDemo(){
    const component = new VisualComponent();
    //将滚动条装饰器，传入边框装饰器，
    //其中可视化组件的基类的业务逻辑 draw()一层一层的增加功能 扩展
    const finalComponent = new BorderDecorator(new ScrollDecorator(component),1);
    //最终的draw()方法 功能强大
    finalComponent.draw()
}
