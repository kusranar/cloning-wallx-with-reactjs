export default class WalletAccount{
    constructor(id, walletId, accountNumber, notelp, amount, createDate, cif){
        this.id = id;
        this.walletId = walletId;
        this.accountNumber = accountNumber;
        this.notelp = notelp;
        this.amount = parseInt(amount);
        this.createDate = createDate;
        this.cif = cif;
    }
}