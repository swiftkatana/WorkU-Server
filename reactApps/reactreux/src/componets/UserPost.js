import React from 'react';
import { connect } from 'react-redux';
import {fetchUsers } from '../action/';

class UserPost extends React.Component{

  


    render(){
        if(!this.props.user.name){
            return <div>not good!!!</div>;
        };
       

      return<div className="Header">{this.props.user.name}</div>;


    }


};

const mapStateToProps=state=>{
    return{users:state.gotUsers};


}
export default connect(mapStateToProps,{fetchUsers:fetchUsers})(UserPost)