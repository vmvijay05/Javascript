// Parent class - BankAccount
class BankAccount {
    constructor(holderName, balance) {
        this.holderName = holderName;
        this.balance = balance;
    }

    // Method to display account details
    accountDetails() {
        console.log(`Account Holder: ${this.holderName}`);
        console.log(`Account Balance: $${this.balance}`);
    }

    // Method to withdraw money (To be overridden)
    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Insufficient balance!");
        } else {
            this.balance -= amount;
            console.log(`Withdrawn: $${amount}`);
            console.log(`Remaining Balance: $${this.balance}`);
        }
    }
}

// Child class - SavingsAccount (Overriding withdraw method)
class SavingsAccount extends BankAccount {
    constructor(holderName, balance, minBalance) {
        super(holderName, balance);
        this.minBalance = minBalance;
    }

    // Overriding withdraw method
    withdraw(amount) {
        if (this.balance - amount < this.minBalance) {
            console.log(`Withdrawal denied! Minimum balance of $${this.minBalance} must be maintained.`);
        } else {
            super.withdraw(amount); // Calling parent class's withdraw method
        }
    }
}

let account1 = new BankAccount("Vijayakumar", 15000);
let account2 = new SavingsAccount("Bala", 20000, 500);

console.log("\n--- Regular Bank Account ---");
account1.accountDetails();
account1.withdraw(300);
account1.withdraw(800);

console.log("\n--- Savings Account ---");
account2.accountDetails();
account2.withdraw(1300);
account2.withdraw(1000);
