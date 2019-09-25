import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Customer from './../models/Customer';
import Account from './../models/Account';
import Wallet from './../models/Wallet';
import Transaction from './../models/Transaction';
import * as customerService from './../services/Customer';
import * as accountService from './../services/Account';
import * as walletService from './../services/Wallet';
import walletTypeService from './../services/WalletType';
import * as transactionService from './../services/Transaction';

class FormModal extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            birthdate: '',
            username: '',
            password: '',
            accountName: '',
            accountNumber: '',
            sender: '',
            receiver: '',
            amount: 0,
            walletType: '',
            phone: 0,
            account: {},
            accounts: {},
            wallet: {},
            wallets: {},
            walletTypes: {}
        }
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentWillMount() {
        if (this.props.information === 'Edit' && this.props.accountNumber !== '') {
            accountService.getAccountByAccountNumber(this.props.accountNumber)
                .then(res => {
                    if (res.data.responseCode === '01') {
                        this.setState({ account: res.data.data });
                    }
                })
        } else if (this.props.information === 'Create Wallet') {
            walletTypeService()
                .then(res => {
                    if (res.data.responseCode === '01') {
                        this.setState({ walletTypes: res.data.data, walletType: res.data.data[0].description });
                    }
                })
        }
        else if (this.props.walletType !== '' && this.props.phone !== '') {
            if (this.props.information === 'Topup') {
                accountService.getAccountByCif(sessionStorage.getItem('token'))
                    .then(res => {
                        if (res.data.responseCode === '01') {
                            this.setState({ accounts: res.data.data, accountNumber: res.data.data[0].accountNumber });
                        }
                    })
            } else if (this.props.information === 'Edit') {
                walletService.getWalletByPhone(parseInt(this.props.phone))
                    .then(res => {
                        if (res.data.responseCode === '01') {
                            this.setState({ wallet: res.data.data });
                        }
                    })
            }
        }
    }

    _input = (event, data) => {
        switch (data) {
            case 'Firstname':
                this.setState({ firstName: event.target.value });
                break;
            case 'Lastname':
                this.setState({ lastName: event.target.value });
                break;
            case 'Birthdate':
                this.setState({ birthdate: event.target.value });
                break;
            case 'Username':
                this.setState({ username: event.target.value });
                break;
            case 'Password':
                this.setState({ password: event.target.value });
                break;
            case 'Account Name':
                this.setState({ accountName: event.target.value });
                break;
            case 'Account Number':
                this.setState({ accountNumber: event.target.value });
                break;
            case 'Sender':
                this.setState({ sender: event.target.value });
                break;
            case 'Receiver':
                this.setState({ receiver: event.target.value });
                break;
            case 'Amount':
                this.setState({ amount: event.target.value });
                break;
            case 'Wallet Type':
                this.setState({ walletType: event.target.value });
                break;
            case 'Phone':
                this.setState({ phone: event.target.value });
                break;
            default:
                break;
        }
    }

    _onSubmit = (event) => {
        event.preventDefault();
        if (this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.birthdate.length > 0) {
            customerService.createCustomer(new Customer('', this.state.firstName, this.state.lastName, this.state.birthdate, this.state.username, this.state.password))
                .then(res => {
                    if (res.data.responseCode === "01") {
                        alert('Create Customer Success');
                        this.props.isClose();
                    } else {
                        alert(res.data.responseMessage);
                    }
                })
        } else if (this.state.accountName.length > 0) {
            if (this.props.information === 'Edit') {
                accountService.updateAccount(new Account(this.state.account.accountNumber, this.state.accountName, this.state.account.openDate, this.state.account.balance, sessionStorage.getItem('token')))
                    .then(res => {
                        if (res.data.responseCode === "01") {
                            alert('Edit Account Success');
                            this.props.isClose();
                            this.props.update();
                        } else {
                            alert(res.data.responseMessage);
                        }
                    })
            } else {
                accountService.createAccount(new Account('', this.state.accountName, '', '', sessionStorage.getItem('token')))
                    .then(res => {
                        if (res.data.responseCode === "01") {
                            alert('Create Account Success');
                            this.props.isClose();
                            this.props.update();
                        } else {
                            alert(res.data.responseMessage);
                        }
                    })
            }
        } else if (this.state.amount > 0) {
            if (this.state.sender.length > 0 && this.props.information === 'Topup') {
                transactionService.topup(new Transaction('', '', this.props.accountNumber, this.state.sender, this.state.amount, this.props.information, sessionStorage.getItem('token')))
                    .then(res => {
                        if (res.data.responseCode === "01") {
                            alert('Topup Success');
                            this.props.isClose();
                            this.props.update();
                        } else {
                            alert(res.data.responseMessage);
                        }
                    })
            } else if (this.state.receiver.length > 0 && this.props.information === 'Transfer') {
                transactionService.transfer(new Transaction('', '', this.state.receiver, this.props.accountNumber, this.state.amount, this.props.information, sessionStorage.getItem('token')))
                    .then(res => {
                        if (res.data.responseCode === "01") {
                            alert('Transaction Success');
                            this.props.isClose();
                            this.props.update();
                        } else {
                            alert(res.data.responseMessage);
                        }
                    })
            } else if (this.state.accountNumber.length > 0) {
                console.log('uyes');
                transactionService.topup(new Transaction('', '', this.props.phone, this.state.accountNumber, this.state.amount, this.props.information, sessionStorage.getItem('token')))
                    .then(res => {
                        if(res.data.responseCode === '01'){
                            alert('Topup Success');
                            this.props.isClose();
                            this.props.update();
                        } else {
                            alert(res.data.responseMessage);
                        }
                    })
            }
        } else if (this.state.phone.length > 0) {
            if (this.state.walletType.length > 0) {
                walletService.createWallet(new Wallet('', this.state.walletType, 'ACN-001', this.state.phone, 0, '', sessionStorage.getItem('token')))
                    .then(res => {
                        if (res.data.responseCode === "01") {
                            alert('Create Wallet Success');
                            this.props.isClose();
                            this.props.update();
                        } else {
                            alert(res.data.responseMessage);
                        }
                    })
            } else {
                walletService.updateWallet(new Wallet(this.state.wallet.id, this.state.wallet.walletId, this.state.wallet.accountNumber, this.state.phone, this.state.wallet.amount, this.state.wallet.createDate, this.state.wallet.cif))
                    .then(res => {
                        if (res.data.responseCode === '01') {
                            alert('Edit Wallet Success');
                            this.props.isClose();
                            this.props.update();
                        } else {
                            alert(res.data.responseMessage);
                        }
                    })
            }

        } else {
            customerService.login(new Customer('', this.state.firstName, this.state.lastName, this.state.birthdate, this.state.username, this.state.password))
                .then(res => {
                    if (res.data.responseCode === "01") {
                        this.props.history.push('/dashboard', res.data.data);
                        sessionStorage.setItem('token', res.data.data.cif);
                    } else {
                        alert(res.data.responseMessage);
                    }
                })
        }
    }

    _renderForm = () => {
        return (
            <form onSubmit={this._onSubmit}>
                {this.props.data.form.map((data, key) =>
                    <div className="form-group" key={key}>
                        {(this.props.information === 'Create Wallet' && (data === 'Account' || data === 'Amount')) ? <span></span> : <label htmlFor={data}>{data}</label>}
                        {this._renderInput(data)}
                    </div>
                )}
                <button type="submit" className="btn btn-primary">{this.props.information}</button>
            </form>
        )
    }

    _renderInput(data) {
        if (Object.entries(this.state.walletTypes).length > 0 && data === 'Wallet Type') {
            return (
                <select onChange={(e) => { this._input(e, data) }} className="custom-select" id="walletTypes">
                    {Object.entries(this.state.walletTypes).map((value, key) => <option key={key} value={value[1].description}>{value[1].description}</option>)}
                </select>
            )
        } else if (Object.entries(this.state.accounts).length > 0 && data === 'Account') {
            return (
                <select onChange={(e) => { this._input(e, data) }} className="custom-select" id="accountsNumber">
                    {Object.entries(this.state.accounts).map((value, key) => <option key={key} value={value[1].accountNumber}>{value[1].accountName + ' ' + value[1].accountNumber}</option>)}
                </select>
            )
        }
        else {
            return (
                <input
                    disabled={
                        (data === 'Account Number' || data === 'Transaction Type' || (this.props.information === 'Topup' && data === 'Receiver') || (this.props.information === 'Transfer' && data === 'Sender') || (this.props.information === 'Topup' && data === 'Wallet Type') || (this.props.information === 'Topup' && data === 'Phone') || (this.props.information === 'Edit' && data === 'Wallet Type')) ? 'disabled' : ''}
                    type={(this.props.information === 'Create Wallet' && (data === 'Account' || data === 'Amount')) ? 'hidden' : (data === 'Password') ? 'password' : (data === 'Birthdate') ? 'date' : (data === 'Amount' || data === 'Phone') ? 'number' : 'text'}
                    onChange={(e) => { this._input(e, data) }}
                    className="form-control"
                    id={data}
                    placeholder={(data === 'Transaction Type' && (this.props.information === 'Topup' || this.props.information === 'Transfer')) ? this.props.information :
                        (this.props.information === 'Topup' && data === 'Receiver') ? this.props.accountNumber :
                            (this.props.information === 'Transfer' && data === 'Sender') ? this.props.accountNumber :
                                (this.props.information === 'Edit' && data === 'Account Number') ? this.props.accountNumber :
                                    (Object.entries(this.state.account).length > 0) ? this.state.account.accountName :
                                        ((this.props.information === 'Topup' || this.props.information === 'Edit') && data === 'Wallet Type') ? this.props.walletType :
                                            ((this.props.information === 'Topup' || this.props.information === 'Edit') && data === 'Phone') ? this.props.phone : data}
                    required />
            )
        }
    }

    render() {
        console.log(this.state.accounts, this.state.accountNumber);
        if (Object.entries(this.props.data).length === 0 && this.props.data.constructor === Object) {
            return <div></div>
        } else {
            return (
                <div style={{ width: '400px', position: 'absolute', top: this.props.data.height, left: '34%', backgroundColor: 'white', padding: '10px', borderRadius: '1%', border: '0.5px solid black' }}>
                    <button onClick={this.props.isClose} style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'transparent', border: 'none' }}>x</button>
                    {this._renderForm()}
                </div>
            )
        }
    }
}

export default withRouter(FormModal);