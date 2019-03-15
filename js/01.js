//多态 js
var Duck = function () { };
Duck.prototype.sound = function () { console.log('gaga'); };
var Chicken = function () { };
Chicken.prototype.sound = function () { console.log('gege'); };
var makeSound = function (animal) { animal.sound(); };
makeSound(new Duck());
makeSound(new Chicken());
//多态ts 静态检查
var DuckT = /** @class */ (function () {
    function DuckT() {
    }
    DuckT.prototype.makeSound = function () {
        console.log('gaga');
    };
    return DuckT;
}());
var ChickenT = /** @class */ (function () {
    function ChickenT() {
    }
    ChickenT.prototype.makeSound = function () {
        console.log('gege');
    };
    return ChickenT;
}());
var AnimalSound = /** @class */ (function () {
    function AnimalSound() {
    }
    AnimalSound.prototype.makeSound = function (duck) {
        duck.makeSound();
    };
    return AnimalSound;
}());
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.main = function () {
        var animalSound = new AnimalSound();
        var duck = new DuckT();
        animalSound.makeSound(duck);
    };
    return Test;
}());
var test = new Test();
test.main();
var Test1 = /** @class */ (function () {
    function Test1() {
    }
    Test1.prototype.main = function () {
        var animalSound = new AnimalSound();
        var chicken = new ChickenT();
        animalSound.makeSound(chicken);
    };
    return Test1;
}());
var test1 = new Test1();
test1.main();
