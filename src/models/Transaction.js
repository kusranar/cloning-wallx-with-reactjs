export default class Transaction{
    constructor(id, date, accountNumberCredit, accountNumberDebit, amount, transactionType, cif){
        this.id = id;
        this.date = date;
        this.accountNumberCredit = accountNumberCredit;
        this.accountNumberDebit = accountNumberDebit;
        this.amount = amount;
        this.transactionType = transactionType;
        this.cif = cif;
    }
}