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
        const header = "Serial No,Fullname,Emailid,Password,mobilenumber,workstatus\n";
        const data = `${this.serialNum},${this.fullName},${this.emailId},${this.password},${this.mobileNum},${this.workStatus}\n`;

        // Check if file exists and has content
        if (!fs.existsSync(filename) || fs.statSync(filename).size === 0) {
            fs.writeFileSync(filename, header + data, 'utf8'); // Write headers + data
        } else {
            fs.appendFileSync(filename, data, 'utf8'); // Append only data
        }
        console.log(`Data successfully written to ${filename}`);
    }
}

const obj = new personalInfo();
const filename = 'myown.csv';

obj.getInputDetails();
obj.displayDetails();
obj.writeFile(filename);