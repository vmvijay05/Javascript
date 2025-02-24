const fs = require('fs');  // Node.js (This imports the File System (fs) module, which allows reading and writing files.)

class OfficialInfo {
    constructor() {
        this.serialNum = 0;
        this.emailId = '';
        this.password = '';
        this.workStatus = '';
    }

    setOfficialInfo() {
        const readline = require('readline-sync');
        this.serialNum = parseInt(readline.question("Enter Serial Number: "));
        this.emailId = readline.question("Enter Email ID: ");
        this.password = readline.question("Enter Password: ");
        this.workStatus = readline.question("Enter Work Status: ");
    }
}

class Register {
    constructor() {
        this.fullName = '';
        this.mobileNum = '';
        this.official = new OfficialInfo();
    }

    setDetails() {
        const readline = require('readline-sync');
        this.fullName = readline.question("Enter Full Name: ");
        this.mobileNum = readline.question("Enter Mobile Number: ");
        this.official.setOfficialInfo();
    }
}

class Subclass {
    constructor() {
        this.records = [];
    }

    getAllDetails() {
        const readline = require('readline-sync');
        let numRecords = parseInt(readline.question("Enter number of records: "));

        for (let i = 0; i < numRecords; i++) {
            console.log(`\nEnter details for Register ${i + 1}:`);
            let record = new Register();
            record.setDetails();
            this.records.push(record);
        }
    }

    saveToJSONFile(filename) {
        fs.writeFileSync(filename, JSON.stringify(this.records, null, 4), 'utf8');
        console.log("Data saved to JSON file successfully!");
    }

    loadFromJSONFile(filename) {
        if (!fs.existsSync(filename)) {
            console.log("Error: File not found!");
            return;
        }

        const data = fs.readFileSync(filename, 'utf8');
        this.records = JSON.parse(data);
        
        console.log("\nReading from JSON File:");
        this.records.forEach((record, index) => {
            console.log(`\nRecord ${index + 1}:`);
            console.log(`Full Name: ${record.fullName}`);
            console.log(`Mobile: ${record.mobileNum}`);
            console.log(`Serial No: ${record.official.serialNum}`);
            console.log(`Email: ${record.official.emailId}`);
            console.log(`Work Status: ${record.official.workStatus}`);
        });
    }
}

const manager = new Subclass();
const filename = 'registers.json';

manager.getAllDetails();
manager.saveToJSONFile(filename);
manager.loadFromJSONFile(filename);
