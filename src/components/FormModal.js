import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import Customer from './../models/Customer';
import * as customerService from './../services/Customer';

class FormModal extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            birthdate: '',
            username: '',
            password: ''
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
            default:
                this.setState({ password: event.target.value });
                break;
        }
    }

    _onSubmit = (event) => {
        event.preventDefault();
        if (this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.birthdate.length > 0) {
            customerService.createCustomer(new Customer('', this.state.firstName, this.state.lastName, this.state.birthdate, this.state.username, this.state.password))
                .then(res => {
                    if(res.data.responseCode === "01"){
                        alert('Create Customer Success');
                        this.props.isClose();
                    } else {
                        alert(res.data.responseMessage);
                    }
                })
        } else {
            customerService.login(new Customer('', this.state.firstName, this.state.lastName, this.state.birthdate, this.state.username, this.state.password))
                .then( res => {
                    if(res.data.responseCode === "01"){
                        this.props.history.push('/dashboard');
                    } else {
                        alert(res.data.responseMessage);
                    }
                })
        }
    }

    render() {
        if (this.props.isOpen) {
            if (Object.entries(this.props.data).length === 0 && this.props.data.constructor === Object) {
                return <div></div>
            } else {
                return (
                    <div style={{ width: '400px', position: 'absolute', top: this.props.data.height, left: '34%', backgroundColor: 'white', padding: '10px', borderRadius: '1%' }}>
                        <button onClick={this.props.isClose} style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'transparent', border: 'none' }}>x</button>
                        <form onSubmit={this._onSubmit}>
                            {this.props.data.form.map((data, key) => <div className="form-group" key={key}>
                                <label htmlFor={data}>{data}</label>
                                <input type={(data === 'Password') ? 'password' : (data === 'Birthdate') ? 'date' : 'text'} onChange={(e) => { this._input(e, data) }} className="form-control" id={data} placeholder="Enter Username" required />
                            </div>
                            )}
                            <button type="submit" className="btn btn-primary">{this.props.data.button}</button>
                        </form>
                    </div>
                )
            }
        } else {
            return <div></div>
        }
    }
}

export default withRouter(FormModal);