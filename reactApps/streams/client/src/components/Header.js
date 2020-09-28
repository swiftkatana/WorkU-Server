import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {signOut} from '../actions'


import './style.css'
class Header extends React.Component{

    renderLoginorLogou(){
        if(this.props.isSignedIn){
            return <> <Link className="ui button primary " to="/profile" >Profile</Link>  <Link to="/" onClick={()=>this.props.signOut()} className=" ui button red">logout</Link> </>
        }
        return  <Link to="/streams/loginregister" className=" ui button green">Login</Link>
    }


    render(){
    return(
        <div className="ui secondary pointing menu">
                <Link to="/" className="  item" >
                    Steamy
                </Link>
      
                <div className="right menu">
                    <Link to="/" className="ui button green">All Streames</Link>
                    {this.renderLoginorLogou()}
                </div>

        </div>

)}

}

const mapStateToProps =(state)=>{
    return{isSignedIn:state.auth.isSignedIn};
}
    export default connect(mapStateToProps,{signOut}) (Header);
  