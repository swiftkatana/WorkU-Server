import React from 'react';
import {connect} from 'react-redux' 

import history from '../history'


class Profile extends React.Component{


renderProfile(){
    if(!this.props.userIsLogin) history.push('/')
    else{
        return(
        <div>
             <h1>hello {this.props.user.firstName} </h1>
        </div>
    )}

}

    render(){

        return(
                <div>
                    {this.renderProfile()}
                </div>
        )

    }

}

const mapStateToProps =(state)=>{
    return{
        user:state.user,
        userIsLogin:state.auth.isSignedIn
    }
}



export default connect(mapStateToProps,{})(Profile);