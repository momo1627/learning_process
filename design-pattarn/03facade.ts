//示例 老板和员工 
//老板调用外观层的命令，不会直接向每个员工子类发布命令
class Idea{}
class Requirement{}
class Development{}
class Release{}

class PD{
    analyze(idea:Idea){
        console.log('PD 产品经理分析需求')
        return new Requirement()
    }
}
class Developer{
    develop(requ:Requirement){
        console.log('程序员开始开发')
        return new Development
    }
}
class Tester {
    test(develop:Development){
        return new Release()
    }
}
class ItCompany{
    //公司内部的复杂逻辑，有三个员工组成
    //三个员工就是子系统角色类 有各自的接口实现功能
    //如果老板直接指挥员工，调用员工接口，必须知道这三个类内容
    pd:PD;
    developer:Developer;
    tester:Tester;
    constructor(pd:PD,dev:Developer,tester:Tester){
        this.pd = pd
        this.developer = dev
        this.tester = tester
    }
    //老板即为一个外观角色，为老板实现一个外观接口
    addNewFeature(idea:Idea){
        const requirement = this.pd.analyze(idea);
        const development = this.developer.develop(requirement);
        const release = this.tester.test(development);
        console.log(release);    
    }
}
//老板作为一个外观类，实现系统的外观接口
class Boss {
    system:ItCompany;
    constructor(sys:ItCompany){
        this.system = sys
    }
    addnewFeature(idea:Idea){
        this.system.addNewFeature(idea)
    }
}
