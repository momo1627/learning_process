//几种代理应用
//1.远程代理：为一个对象在不同的地址空间提供局部代表，延迟获取远程对象
class RemoteResource{
    getContent():string{
        return '读取远程文件内容'
    }
}
class RemoteResourceProxy{
    //代理的请求方法，返回一个主题类的实例
    request():RemoteResource{
        console.log('千辛万苦从远程拿到了文件')
        return new RemoteResource()
    }
    //代理定义API，请求一个主题实例，封装了主题的getContent()方法
    getContent(){
        const resource = this.request();
        return resource.getContent()
    }
}
//客户调用代理的接口，请求目标的内容


//2.虚代理
//如果目标对象消耗资源具大，可以通过一个消耗小的代理，真实对象只在需要时才会被真正的创建
class BigImage{
    private name:string;
    constructor(name:string){
        this.name = name;
        this.draw();
    }
    draw():void{
        console.log(`绘制${this.name},需要消耗巨大资源`)
    }
    //绘制消耗具大资源，预览资源比较小，但只实现一些业务    
    preview():void{
        console.log(`展示${this.name}的预览效果`)
    }
    getName():string{
        return this.name
    }
}
class VirtualBigImageProxy{
    private image:BigImage;
    private name : string;
    constructor(name:string){
        this.name = name
    }
    //只有虚拟代理在预览时，才生成真实图片的实例
    preview():void{
        if(!this.image){
            this.image = new BigImage(this.name);
        }
        this.image.preview();
    }
    //不需要真实图片，而是请求一些数据时
    //不创建真实图片实例，只是返回一些数据
    getName():string{
        if(!this.image){
            console.log('返回虚代理名称名称')
            return this.name
        }
        console.log('实际图片创建返回真实名称')
        return this.image.getName()
    }
}
//保护代理
//控制对原始对象的访问，不同代理用户有不同权限
class SecretDoc{
    read():string{
        return '机密内容'
    }
}

class ProtectionSecretDocProxy{
    private name:string;
    private doc:SecretDoc;
    constructor(name:string){
        this.name = name;
        this.doc = new SecretDoc();
    }
    read():string{
        if(this.name === 'leader'){
            const content = this.doc.read();
            return content
        }
        return 'classify'
    }
}