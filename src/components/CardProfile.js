import React, {Component} from 'react';

export default class CardProfile extends Component{
    render(){
        return(
            <div className="card" style={{width: "18rem", height: "150px"}}>
                <div className="card-body">
                    <h5 className="card-title">{this.props.customer.firstName + ' ' + this.props.customer.lastName}</h5>
                    <p className="card-text">{this.props.customer.birthdate}</p>
                    <p className="card-text">Total Balance</p>
                </div>
            </div>
        )
    }
}