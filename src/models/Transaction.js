export default class Transaction{
    constructor(id, date, accountNumberCredit, accountNumberDebit, amount=0, transactionType, cif){
        this.id = id;
        this.date = date;
        this.accountNumberCredit = accountNumberCredit;
        this.accountNumberDebit = accountNumberDebit;
        this.amount = parseInt(amount);
        this.transactionType = transactionType;
        this.cif = cif;
    }
}