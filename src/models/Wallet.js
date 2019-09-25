export default class Wallet{
    constructor(id, walletId, accountNumber, phone, amount, createDate, cif){
        this.id = id;
        this.walletId = walletId;
        this.accountNumber = accountNumber;
        this.phone = parseInt(phone);
        this.amount = parseInt(amount);
        this.createDate = createDate;
        this.cif = cif;
    }
}