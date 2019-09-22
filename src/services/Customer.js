import Axios from 'axios';

const url = 'http://localhost:3001';

const getCustomerByCif = (cif) => {
    return Axios.get(url+`/customer/${cif}`);
}

const login = (customer) => {
    return Axios.post(url+`/login`, customer);
}

const createCustomer = (customer) => {
    return Axios.post(url+'/customer', customer);
}

export {createCustomer, getCustomerByCif, login};