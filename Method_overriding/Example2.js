class Employee {
    constructor(name, baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }

    calculateSalary() {
        return this.baseSalary;
    }

    displaySalary() {
        console.log(`${this.name}'s total salary: $${this.calculateSalary()}`);
    }
}

class Manager extends Employee {
    constructor(name, baseSalary, hike) {
        super(name,baseSalary);
        this.hike = hike;
    }

    calculateSalary() {
        return super.calculateSalary() + this.hike;
    }
}

class Developer extends Employee {
    constructor(name, baseSalary, overtimeHours) {
        super(name, baseSalary);
        this.overtimeHours = overtimeHours;
    }

    calculateSalary() {
        return super.calculateSalary() + this.overtimeHours;
    }
}

let emp1 = new Employee("Vijay", 10000);
let manager1 = new Manager("Ashok", 50000, 5000);
let dev1 = new Developer("Bala", 8000, 10);

emp1.displaySalary();
manager1.displaySalary();
dev1.displaySalary();
