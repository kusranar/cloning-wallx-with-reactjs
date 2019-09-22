import React, {Component} from 'react';

export default class CardProfile extends Component{
    render(){
        return(
            <div className="card" style={{width: "18rem", height: "150px"}}>
                <div className="card-body">
                    <h5 className="card-title">Name</h5>
                    <p className="card-text">Birthdate</p>
                    <p className="card-text">Total Balance</p>
                </div>
            </div>
        )
    }
}