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
        //this.obj1 = new personalInfo();
        //obj1.push(personalInfo);
    }

    getInputDetails() {
        const readline = require('readline-sync');
        this.serialNum = readline.question("Enter your serialnumber:");
        this.fullName = readline.question("Enter your fullname:");
        this.emailId = readline.question("Enter your emailid:");
        this.password = readline.question("Enter your password:");
        this.mobileNum = readline.question("Enter your mobilenumber:");
        this.workStatus = readline.question("Enter your workstatus:");
    }

    displayDetails() {
        console.log(`\nFull Name: ${this.fullName}\nMobile: ${this.mobileNum}`);
        this.displayOfficialInfo();
    }

    writeFile(filename) {
        fs.writeFile(
            filename, JSON.stringify(this.obj1),
            err => {
                if (err) throw err;

                console.log("Done writing");
            });

const data={
    SerialNum:this.serialNum,
    Fullname:this.fullName,
    EmailId:this.emailId,
    Password:this.password,
    Mobilenumber:this.mobileNum,
    Workstatus:this.Workstatus
};

    }

}
const obj = new personalInfo();
const filename = 'myown.json';

obj.getInputDetails();
obj.displayDetails();
obj.writeFile(filename);
