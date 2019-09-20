export default class WalletAccount{
    constructor(id, walletId, accountNumber, notelp, amount, createdate, cif){
        this.id = id;
        this.walletId = walletId;
        this.accountNumber = accountNumber;
        this.notelp = notelp;
        this.amount = amount;
        this.createdate = createdate;
        this.cif = cif;
    }
}