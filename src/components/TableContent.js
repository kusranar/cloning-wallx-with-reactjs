import React, { Component } from 'react';
import FormModal from './FormModal';
import { deleteAccount } from './../services/Account';
import { deleteWallet } from './../services/Wallet';
const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

export default class TableContent extends Component {
    constructor() {
        super();
        this.state = {
            fieldAccount: {
                button: 'Create Account',
                field: ['Open Date', 'Account Number', 'Name', 'Balance'],
                action: [['Topup', 'badge badge-success'], ['Transfer', 'badge badge-primary'], ['Edit', 'badge badge-warning'], ['Delete', 'badge badge-danger']],
                formAccount: {
                    form: ['Account Number', 'Account Name'],
                    button: 'Create Account',
                    height: '200px'
                }
            },
            fieldWallet: {
                button: 'Create Wallet',
                field: ['Open Date', 'Wallet', 'Phone', 'Amount'],
                action: [['Topup', 'badge badge-success'], ['Edit', 'badge badge-warning'], ['Delete', 'badge badge-danger']],
                formWallet: {
                    form: ['Wallet Type', 'Phone', 'Account', 'Amount'],
                    button: 'Create Wallet',
                    height: '60px'
                }
            },
            fieldTransaction: {
                button: '',
                field: ['Date', 'Transaction Type', 'Credit', 'Debit', 'Amount'],
                action: [],
                formTransaction: {
                    form: ['Transaction Type', 'Sender', 'Receiver', 'Amount'],
                    button: '',
                    height: '60px'
                }
            },
            isOpen: false,
            data: {},
            accountNumber: '',
            walletType: '',
            phone: '',
            information: ''
        }
    }

    _renderTable = (data) => {
        return (
            <div>
                {(Object.entries(data.button).length === 0) ?
                    <span></span> : <button onClick={() => this._handleEventOnClick(this.props.information)} type="button" className="btn btn-secondary m-2">{data.button}</button>
                }
                {(Object.entries(this.props.data).length === 0) ?
                    <h6>Doesnt have {this.props.information}</h6> :
                    <table className="table table-striped ml-2 mr-2">
                        <thead>
                            <tr>
                                {data.field.map((value, key) => <th key={key}>{value}</th>)}
                                <td></td>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center' }}>
                            {this._renderDataTable()}
                        </tbody>
                    </table>
                }
            </div>
        )
    }

    _renderDataTable = () => {
        let data = [];
        for (let i = 0; i < Object.entries(this.props.data).length; i++) {
            if (this.props.information === 'Account') {
                data.push(
                    <tr key={i}>
                        <td>{this.props.data[i].openDate.replace('T', ' ').slice(0, 16)}</td>
                        <td>{this.props.data[i].accountNumber}</td>
                        <td>{this.props.data[i].accountName}</td>
                        <td>{this.props.data[i].balance}</td>
                        <td>
                            {this.state.fieldAccount.action.map((value, key) => <span style={{ cursor: 'pointer' }} onClick={() => 
                                this._handleEventOnClick(value[0], this.props.data[i].accountNumber, this.props.data[i].accountName)
                            } key={key} className={value[1]}>{value[0]}</span>)}
                        </td>
                    </tr>
                )
            } else if (this.props.information === 'Wallet') {
                data.push(
                    <tr key={i}>
                        <td>{this.props.data[i].createDate.replace('T', ' ').slice(0, 16)}</td>
                        <td>{this.props.data[i].walletId}</td>
                        <td>{this.props.data[i].phone}</td>
                        <td>{this.props.data[i].amount}</td>
                        <td>
                            {this.state.fieldWallet.action.map((value, key) => <span style={{ cursor: 'pointer' }} onClick={() => this._handleEventOnClick(value[0], this.props.data[i].walletId, this.props.data[i].phone, this.props.data[i].id)} key={key} className={value[1]}>{value[0]}</span>)}
                        </td>
                    </tr>
                )
            } else {
                data.push(
                    <tr key={i}>
                        <td>{this.props.data[i].date.replace('T', ' ').slice(0, 16)}</td>
                        <td>{this.props.data[i].transactionType}</td>
                        <td>{this.props.data[i].accountNumberCredit}</td>
                        <td>{this.props.data[i].accountNumberDebit}</td>
                        <td>{this.props.data[i].amount}</td>
                    </tr>
                )
            }
        }
        return data;
    }

    _handleEventOnClick = (...args) => {
        if (args[0] === 'Delete') {
            if (window.confirm("are you sure?")) {
                if (args.length === 3) {
                    deleteAccount(args[1])
                        .then(res => {
                            if (res.data.responseCode === "01") {
                                alert(`Delete ${args[1]} ${args[2]} Success`);
                                this.props.update();
                            } else {
                                alert(res.data.responseMessage);
                            }
                        })
                } else if (args.length === 4) {
                    deleteWallet(args[3])
                        .then(res => {
                            if (res.data.responseCode === "01") {
                                alert(`Delete ${args[1]} ${args[2]} Success`);
                                this.props.update();
                            } else {
                                alert(res.data.responseMessage);
                            }
                        })
                }

            }
        } else {
            this.setState({ isOpen: true });
            if (args.length === 1) {
                if (args[0] === 'Account') {
                    this.setState({ information: `Create ${args[0]}`, data: this.state.fieldAccount.formAccount });
                } else if (args[0] === 'Wallet') {
                    this.setState({ information: `Create ${args[0]}`, data: this.state.fieldWallet.formWallet });
                }
            } else if (args.length === 3) {
                if (args[0] === 'Topup') {
                    this.setState({ accountNumber: args[1], information: args[0], data: this.state.fieldTransaction.formTransaction });
                } else if (args[0] === 'Transfer') {
                    this.setState({ accountNumber: args[1], information: args[0], data: this.state.fieldTransaction.formTransaction });
                } else if (args[0] === 'Edit') {
                    this.setState({ accountNumber: args[1], information: args[0], data: this.state.fieldAccount.formAccount });
                }
            } else {
                if (args[0] === 'Topup') {
                    this.setState({ information: args[0], walletType: args[1], phone: args[2], data: this.state.fieldWallet.formWallet });
                } else if (args[0] === 'Edit') {
                    this.setState({ information: args[0], walletType: args[1], phone: args[2], data: this.state.fieldWallet.formWallet });
                }
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.isOpen ? <FormModal isClose={(e) => this.setState({ isOpen: false })} data={this.state.data} update={(e) => this.props.update()} accountNumber={this.state.accountNumber} information={this.state.information} walletType={this.state.walletType} phone={this.state.phone} /> : <div />}
                {
                    (this.props.information === 'Account') ?
                        this._renderTable(this.state.fieldAccount) :
                        (this.props.information === 'Wallet') ?
                            this._renderTable(this.state.fieldWallet) :
                            this._renderTable(this.state.fieldTransaction)
                }
            </div>
        )
    }
}