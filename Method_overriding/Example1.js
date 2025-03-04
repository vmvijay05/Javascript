class Animal {
    constructor(legs, tail) {
        this.legs = legs;
        this.tail = tail;
    }

    display() {
        console.log(this.legs);
        console.log(this.tail);
    }
}

class Human extends Animal {
    constructor(legs,tail,nationality) {
        super(legs,tail);
        this.nationality=nationality;
    }

    display()
    {
        console.log(this.legs);
        console.log(this.tail);
        console.log(this.nationality);
    }
}

let obj1 = new Animal(2,false);
obj1.display();
let obj2 = new Human(2, true, "Indian");
obj2.display();


