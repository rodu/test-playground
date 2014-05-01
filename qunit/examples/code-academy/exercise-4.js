/**
 * Following on the things we saw in the
 * previous exercises, we now will be dealing with testing a software which is
 * suppposed to handle something which people generally cares about quite a bit...
 * money!
 *
 * We will simulate a simple bank account and a teller machine.
 *
 * After manually creating as many bank account as we wish,
 * the main operations that will be possible from the teller machine are:
 * - deposit some money in the account
 * - withdraw money from the account
 * 
 * We then will use an helper function to:
 * - display the current balance for a specific bank account
 *
 * The aim of the exercise is to show how critical test coverage can be in
 * situations where the outcome of a system has a real impact in real life, such
 * as calculating the correct balance for an account holder.
 *
 * In such situations we want to make super-sure that our software is working
 * as it should.
 *
 * --------
 * 
 * The exercise asks you to refine the implementation of the bank account
 * manager with respect to two features:
 *
 * - First, you need to fix a problem in which, for some unknown reason, the amount
 * of money you put in the banck account is not going to be the same of what you
 * can get from it.
 * 
 * This may be bad in some cases fro the bank institute, in some cases
 * it's bad for the account holders.
 * 
 * Consider that the implemented system do not takes in account interest rates
 * or anything like that. The system is supposed to give back to the account
 * holder the same amount of money that was left in the balance.
 *
 * - After you fix this quite big problem, you should refine the system, to make
 * sure an account balance will never go negative. Nobody can take an amount of
 * money bigger than the current balance. This bank does not make loans either...
 * 
 */
(function(){
    "use strict";
    var

        // Creating a BankAccount constructor function
        BankAccount = function BankAccount(holderName, balance){
            this.holderName = holderName;
            this.balance = balance;
        },

        // This is an helper function used to display the balance of a given
        // bank account
        displayBankAccountBalance = function displayBankAccountBalance(bankAccount){
            console.log("The balance for the account in name of",
                        bankAccount.holderName, "is",
                        bankAccount.balance, "Euro.");
        };

    BankAccount.prototype.getBalance = function() {
        return this.balance;
    };

    BankAccount.prototype.getHolderName = function() {
        return this.holderName;
    };

    BankAccount.prototype.deposit = function(amount) {
        var balanceCents,
            amountCents;
        if (amount > 0){
            balanceCents = this.balance * 100;
            amountCents = amount * 100;
            this.balance = (balanceCents + amountCents) / 100;
        }
    };

    BankAccount.prototype.withdraw = function(amount) {
        var balanceCents,
            amountCents;
        if (amount > 0){
            balanceCents = this.balance * 100;
            amountCents = amount * 100;
            if (balanceCents - amountCents >= 0){
                this.balance = (balanceCents - amountCents) / 100;
            }
        }
    };

    // -------------------------------------------------------------------------
    // Implementation
    (function implementation(){
        // Let's declare a few people which will open a bank account, you can
        // declare as many as you wish
        var 
            MARY_FULL_NAME = "Mary O'Sullivan",
            JOHN_FULL_NAME = "John Britt",
            LISA_FULL_NAME = "Lisa Mattei";

        // -------------------------------------------------------------------------
        // Tests for Activities-1
        (function openingAccountTests(){
            var
                maryAccont = new BankAccount(MARY_FULL_NAME, 100.0),
                johnAccount = new BankAccount(JOHN_FULL_NAME, 50.20),
                lisaAccount = new BankAccount(LISA_FULL_NAME, 250.0);
            
            // When we open an account we want to know that the deposited amount is
            // actually in the balance
            console.log("Opening a new account, should hold the balance initially deposited");
            console.log(maryAccont.getBalance() === 100);
            console.log(johnAccount.getBalance() === 50.20);
            console.log(lisaAccount.getBalance() === 250);
        }());
        
        // Tests for Activities-2
        (function depositTests(){
            var
                maryAccont = new BankAccount(MARY_FULL_NAME, 100.0),
                johnAccount = new BankAccount(JOHN_FULL_NAME, 50.20),
                lisaAccount = new BankAccount(LISA_FULL_NAME, 250.0);

            // Will add some money to the Mary's account
            maryAccont.deposit(120.02);
            // John will withdraw some monwy
            johnAccount.withdraw(23.01);
            // lisa will also make a withdraw
            lisaAccount.withdraw(45.50);

            // Check that after depositing some money the amount is as expected
            console.log("After depositing some money, the balance should be correctly recalculated");
            console.log(maryAccont.getBalance() === 220.02);
            console.log(johnAccount.getBalance() === 27.19);
            console.log(lisaAccount.getBalance() === 204.5);
        }());
        
        // Tests for Activity-3
        (function depositTests(){
            var
                johnAccount = new BankAccount(JOHN_FULL_NAME, 50.20);

            // Now John will withdraw more than he actually has got on his bank account
            // will the system allow this?
            johnAccount.withdraw(100);
            

            // Checks that a user cannot withdraw more that the active balance
            // because the system requirements are that the bankAccount cannot
            // go negative. Therefore the account balance shold not change and
            // the requested withdrowal should be denied.
            console.log("Withdrawing more that the active balance, should not be allowed");
            console.log(johnAccount.getBalance() === 50.20);
            
            johnAccount = new BankAccount(JOHN_FULL_NAME, 50.20);           
            // So now John tried to cheat che system, pretending to withdraw a
            // negative amount... Will the system allow this?
            johnAccount.withdraw(-100); 
            console.log("Withdrawing a negative amount, should not be allowed");
            console.log(johnAccount.getBalance() === 50.20);
        }());

    }());
    

}());