import Axios from 'axios';

const url = 'http://localhost:3001';

const getWalletById = (id) => {
    return Axios.get(url+`/wallet/${id}`);
}

const getWalletByCif = (cif) => {
    return Axios.get(url+`/${cif}/wallets`);
}

const createWallet = (wallet) => {
    return Axios.post(url+'/wallet', wallet);
}

const updateWallet = (wallet) => {
    return Axios.put(url+'/wallet', wallet);
}

const deleteWallet = (wallet) => {
    return Axios.delete(url+'/wallet', wallet);
}

export {getWalletById, getWalletByCif, createWallet, updateWallet, deleteWallet};