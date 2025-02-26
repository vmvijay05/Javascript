const fs = require('fs');  //node
class OfficialInfo {
    constructor() {
        this.serialNum = 0;
        this.emailId = '';
        this.password = '';
        this.workStatus = '';
    }

    setOfficialInfo() {
        const readline = require('readline-sync');   //node
        this.serialNum = parseInt(readline.question("Enter Serial Number: "));
        this.emailId = readline.question("Enter Email ID: ");
        this.password = readline.question("Enter Password: ");
        this.workStatus = readline.question("Enter Work Status: ");
    }

    displayOfficialInfo() {
        console.log(`\nSerial No: ${this.serialNum}\nEmail: ${this.emailId}\nWork Status: ${this.workStatus}`);
    }
}

class Register {
    constructor() {
        this.fullName = '';
        this.mobileNum = '';
        this.official = new OfficialInfo();
       // console.log("My expected is->",this.official,typeof(this.official));
    }

    setDetails()
     {
        const readline = require('readline-sync');
        this.fullName = readline.question("Enter Full Name: ");
        this.mobileNum = readline.question("Enter Mobile Number: ");
        this.official.setOfficialInfo();
    }

    displayDetails()
     {
        console.log(`\nFull Name: ${this.fullName}\nMobile: ${this.mobileNum}`);
        this.official.displayOfficialInfo();
    }

    writeToCSV(outFile) 
    {
       // console.log("outfile is-> ",outFile);
        fs.appendFileSync(outFile, `${this.fullName},${this.mobileNum},${this.official.serialNum},${this.official.emailId},${this.official.password},${this.official.workStatus}\n`);   //node
    
    }

    readFromCSV(line) {
        const data = line.split(',');
        this.fullName = data[0];
        this.mobileNum = data[1];
        this.official.serialNum = parseInt(data[2]);
        this.official.emailId = data[3];
        this.official.password = data[4];
        this.official.workStatus = data[5];
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

    saveToCSVFile(filename)
     {
        fs.writeFileSync(filename, "Full Name,Mobile Number,Serial Number,Email ID,Password,Work Status\n");  //node
        this.records.forEach(record => record.writeToCSV(filename));
        console.log("Data saved to CSV file successfully!");
    }

    loadFromCSVFile(filename)
     {
        if (!fs.existsSync(filename)) {
            console.log("Error opening file for reading!");
            return;
        }

        console.log("\nReading from CSV File:");
        const data = fs.readFileSync(filename,'utf8').split('\n').slice(1);  //node (from fs. to 'utf8')
        //console.log("data is->",data);
        this.records = [];

        data.forEach(line => {
            if (line.trim()) 
                {
                let record = new Register();
                record.readFromCSV(line);
                this.records.push(record);
                record.displayDetails();
            }
        });
    }
}

const manager = new Subclass();
const filename = 'registers.csv';

manager.getAllDetails();
manager.saveToCSVFile(filename);
manager.loadFromCSVFile(filename);
