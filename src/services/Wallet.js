import Axios from 'axios';

const url = 'http://localhost:3001';

const getWalletByPhone = (phone) => {
    return Axios.get(url+`/wallet/${phone}`);
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

const deleteWallet = (id) => {
    return Axios.delete(url+`/wallet/${id}`);
}

export {getWalletByPhone, getWalletByCif, createWallet, updateWallet, deleteWallet};