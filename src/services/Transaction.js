import Axios from 'axios';

const url = 'http://localhost:3001';

const getTransactionByCif = (cif) => {
    return Axios.get(url+`/${cif}/transaction`);
}

const transfer = (transaction) => {
    return Axios.post(url+'/transfer', transaction);
}

const topup = (transaction) => {
    return Axios.post(url+'/topup', transaction);
}

export {getTransactionByCif, transfer, topup};