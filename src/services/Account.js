import Axios from 'axios';

const url = 'http://localhost:3001';

const getAccountByAccountNumber = (accountNumber) => {
    return Axios.get(url+`/account/${accountNumber}`);
}

const getAccountByCif = (cif) => {
    return Axios.get(url+`/${cif}/accounts`);
}

const createAccount = (account) => {
    return Axios.post(url+'/account', account);
}

const updateAccount = (account) => {
    return Axios.put(url+'/account', account);
}

const deleteAccount = (accountNumber) => {
    return Axios.delete(url+`/account/${accountNumber}`);
}

export {getAccountByAccountNumber, getAccountByCif, createAccount, updateAccount, deleteAccount};