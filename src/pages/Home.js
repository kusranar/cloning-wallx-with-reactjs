import React, { Component } from 'react';
import Image from './../assets/1.jpg';
import FormModal from '../components/FormModal';

export default class Home extends Component {
    
    constructor(){
        super();
        this.state = {
            isOpen: false,
            loginForm: {
                form: ['Username', 'Password'],
                button: 'Login',
                height: '200px'
            },
            registerForm: {
                form: ['Firstname', 'Lastname', 'Birthdate', 'Username', 'Password'],
                button: 'Register',
                height: '60px'
            },
            button: ['Login', 'Register'],
            data: {},
            information: ''
        }
    }

    _renderForm(key){
        this.setState({isOpen: true});
        (key === 0) ? this.setState({data: this.state.loginForm, information: 'login'}) : this.setState({data: this.state.registerForm, information: 'register'});
    }

    render() {
        return (
            <div style={style.pageLayout} >
                {this.state.button.map((data, key) => <button key={key} onClick={(e) => this._renderForm(key)} className={(key === 0) ? "btn btn-primary" : "btn btn-success"}>{data}</button> )}

                <FormModal isOpen={this.state.isOpen} isClose={(e) => this.setState({isOpen: false})} data={this.state.data} information={this.state.information}/>
            </div>
        )
    }
}

const style = {
    pageLayout: {
        width: '100%',
        height: '610px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${Image})`,
        opacity: 0.7
    }
}