import React, { Component } from 'react';
import FormModal from './FormModal';
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
                formCreateAccount: {
                    form: ['Wallet Name', 'Phone'],
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
            receiver: '',
            sender: '',
        }
    }

    _renderTable = (data) => {
        return (
            <div>
                {(Object.entries(data.button).length === 0) ?
                    <span></span> : <button onClick={ () => this._handleEventOnClick(data.button)} type="button" className="btn btn-secondary m-2">{data.button}</button>
                }
                {(Object.entries(this.props.data).length === 0) ?
                    <h6>Doesnt have account</h6> :
                    <table className="table table-striped ml-2 mr-2">
                        <thead>
                            <tr>
                                {data.field.map((value, key) => <th key={key}>{value}</th>)}
                                <td></td>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center' }}>
                            {this._renderData()}
                        </tbody>
                    </table>
                }
            </div>
        )
    }

    _renderData = () => {
        let data = [];
        for (let i = 0; i < Object.entries(this.props.data).length; i++) {
            if (this.props.information === 'account') {
                data.push(
                    <tr key={i}>
                        <td>{this.props.data[i].openDate.replace('T', ' ').slice(0, 16)}</td>
                        <td>{this.props.data[i].accountNumber}</td>
                        <td>{this.props.data[i].accountName}</td>
                        <td>{this.props.data[i].balance}</td>
                        <td>
                            {this.state.fieldAccount.action.map((value, key) => <span style={{cursor: 'pointer'}} onClick={ () => this._handleEventOnClick(value[0], this.props.data[i].accountNumber)} key={key} className={value[1]}>{value[0]}</span>)}
                        </td>
                    </tr>
                )
            } else if (this.props.information === 'wallet') {
                data.push(
                    <tr key={i}>
                        <td>{this.props.data[i].createDate.replace('T', ' ').slice(0, 16)}</td>
                        <td>{this.props.data[i].walletId}</td>
                        <td>{this.props.data[i].notelp}</td>
                        <td>{this.props.data[i].amount}</td>
                        <td>
                            {this.state.fieldAccount.action.map((value, key) => <span style={{cursor: 'pointer'}} onClick={ () => this._handleEventOnClick()} key={key} className={value[1]}>{value[0]}</span>)}
                        </td>
                    </tr>
                )
            } else {
                data.push(
                    <tr key={i}>
                        <td>{this.props.data[i].openDate.replace('T', ' ').slice(0, 16)}</td>
                        <td>{this.props.data[i].accountNumber}</td>
                        <td>{this.props.data[i].accountName}</td>
                        <td>{this.props.data[i].balance}</td>
                        <td>
                            {this.state.fieldAccount.action.map((value, key) => <span style={{cursor: 'pointer'}} onClick={ () => this._handleEventOnClick()} key={key} className={value[1]}>{value[0]}</span>)}
                        </td>
                    </tr>
                )
            }
        }
        return data;
    }

    _handleEventOnClick = (...args) => {
        console.log(args);
        this.setState({isOpen: true})
        if(args.length === 1){
            if(args[0] === 'Create Account'){
                this.setState({data: this.state.fieldAccount.formAccount})
            }
        } else {
            if(args[0] === 'Topup'){
                this.state.fieldTransaction.formTransaction.button = 'Topup';
                this.setState({sender: ''})
                this.setState({receiver: args[1]});
                this.setState({data: this.state.fieldTransaction.formTransaction});
            } else if(args[0] === 'Transfer'){
                this.state.fieldTransaction.formTransaction.button = 'Transfer';
                this.setState({receiver: ''})
                this.setState({sender: args[1]});
                this.setState({data: this.state.fieldTransaction.formTransaction});
            }
        }
    }

    render() {
        return (
            <div>
                <FormModal isOpen={this.state.isOpen} isClose={(e) => this.setState({ isOpen: false })} data={this.state.data} update={(e) => this.props.update(e)} receiver={this.state.receiver} sender={this.state.sender}/>
                {
                    (this.props.information === 'account') ? 
                        this._renderTable(this.state.fieldAccount) : 
                        (this.props.information === 'wallet') ? 
                            this._renderTable(this.state.fieldWallet) : 
                            this._renderTable(this.state.fieldTransaction)
                }
            </div>
        )
    }
}