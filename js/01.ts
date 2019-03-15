//多态 js
let Duck = function(){}
Duck.prototype.sound = function(){console.log('gaga')}
let Chicken = function(){}
Chicken.prototype.sound = function(){console.log('gege')}
let makeSound = (animal) =>{animal.sound()}
makeSound(new Duck());
makeSound(new Chicken());

//多态ts 静态检查

class DuckT{
    makeSound(){
        console.log('gaga')
    }
}
class ChickenT{
    makeSound(){
        console.log('gege')
    }
}
class AnimalSound{
    makeSound(duck:DuckT){
        duck.makeSound()
    }
}

class Test{
    main(){
        const animalSound = new AnimalSound();
        const duck = new DuckT();
        animalSound.makeSound(duck)
    }
}
const test = new Test()
test.main();
class Test1{
    main(){
        const animalSound = new AnimalSound();
        const chicken = new ChickenT();
        animalSound.makeSound(chicken)
    }
}
const test1 = new Test1()
test1.main();