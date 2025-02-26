const readline = require('readline');
const fs = require('node:fs');
class Register {
    constructor() {
        this.serialNum = 0;
        this.emailId = '';
        this.password = '';
        this.workStatus = '';
    }
    displayOfficialInfo() {
        console.log(`\nSerial No: ${this.serialNum}\nEmail: ${this.emailId}\nWork Status: ${this.workStatus}`);
    }
}

class personalInfo extends Register {
    constructor() {
        super();
        this.fullName = '';
        this.mobileNum = '';
        // this.obj1 = new Register();
    }

    getInputDetails() {
        const readline = require('readline-sync');
        this.serialNum = readline.question("Enter your serialnumber:");
        this.emailId = readline.question("Enter your emailid:");
        this.password = readline.question("Enter your password:");
        this.workStatus = readline.question("Enter your workstatus:");
        this.fullName = readline.question("Enter your fullname:");
        this.mobileNum = readline.question("Enter your mobilenumber:");
    }

    displayDetails() {
        console.log(`\nFull Name: ${this.fullName}\nMobile: ${this.mobileNum}`);
        this.displayOfficialInfo();
    }

    writeFile(filename) {
        const data = `Serial No: ${this.serialNum}\nEmail: ${this.emailId}\nWork Status: ${this.workStatus}\nFull Name: ${this.fullName}\nMobile: ${this.mobileNum}\n`;
        fs.writeFileSync(filename, data, 'vijay');  //fs.writeFileSync() is a synchronous method 
        console.log(`Data successfully written to ${filename}`);
    }

}

const obj = new personalInfo();
const filename = 'myown.txt';

obj.getInputDetails();
obj.displayDetails();
obj.writeFile(filename);