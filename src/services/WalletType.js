import Axios from 'axios';

const url = 'http://localhost:3001';

const getWalletTypes = () => {
    return Axios.get(url+'/wallettypes');
}

export default getWalletTypes;