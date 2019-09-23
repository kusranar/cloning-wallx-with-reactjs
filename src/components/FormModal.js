import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Customer from './../models/Customer';
import Account from './../models/Account';
import Transaction from './../models/Transaction';
import * as customerService from './../services/Customer';
import * as accountService from './../services/Account';
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
            sender: '',
            receiver: '',
            amount: 0
        }
        this._onSubmit = this._onSubmit.bind(this);
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
            case 'Sender':
                this.setState({ sender: event.target.value });
                break;
            case 'Receiver':
                this.setState({ receiver: event.target.value });
                break;
            case 'Amount':
                this.setState({ amount: event.target.value });
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
            accountService.createAccount(new Account('', this.state.accountName, '', '', sessionStorage.getItem('token')))
                .then(res => {
                    if (res.data.responseCode === "01") {
                        alert('Create Account Success');
                        this.props.isClose();
                        this.props.update(res.data.data);
                    } else {
                        alert(res.data.responseMessage);
                    }
                })
        } else if (this.state.amount > 0) {
            if(this.state.sender.length > 0 && this.props.data.button === 'Topup'){
                transactionService.topup(new Transaction('', '', this.props.receiver, this.state.sender, this.state.amount, this.props.data.button, sessionStorage.getItem('token')))
                    .then(res => {
                        if (res.data.responseCode === "01") {
                            alert('Topup Success');
                            this.props.isClose();
                            this.props.update(res.data.data);
                        } else {
                            alert(res.data.responseMessage);
                        }
                    })
            } else if(this.state.receiver.length > 0 && this.props.data.button === 'Transfer'){
                transactionService.transfer(new Transaction('', '', this.state.receiver, this.props.sender, this.state.amount, this.props.data.button, sessionStorage.getItem('token')))
                    .then(res => {
                        if(res.data.responseCode === "01"){
                            alert('Transaction Success');
                            this.props.isClose();
                            this.props.update(res.data.data);
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
                        <label htmlFor={data}>{data}</label>
                        <input disabled={
                            (data === 'Account Number' || data === 'Transaction Type' || (this.props.receiver !== '' && data === 'Receiver') || (this.props.sender !== '' && data === 'Sender')) 
                            ? 'disabled' : ''} type={(data === 'Password') ? 'password' : (data === 'Birthdate') ? 'date' : (data === 'Amount') ? 'number' : 'text'} onChange={(e) => { this._input(e, data) }} className="form-control" id={data} placeholder={(data === 'Transaction Type' && (this.props.data.button === 'Topup' || this.props.data.button === 'Transfer')) ? this.props.data.button : (this.props.receiver !== '' && data === 'Receiver') ? this.props.receiver : (this.props.sender !== '' && data === 'Sender') ? this.props.sender : data} required />
                    </div>
                )}
                <button type="submit" className="btn btn-primary">{this.props.data.button}</button>
            </form>
        )
    }

    render() {
        console.log(this.props.receiver);
        if (this.props.isOpen) {
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
        } else {
            return <div></div>
        }
    }
}

export default withRouter(FormModal);