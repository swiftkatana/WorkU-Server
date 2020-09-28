import React from 'react';
import {connect} from 'react-redux'

import StreamForm from './streamForm';
import {createStream} from '../../actions'




class StreamCreate extends React.Component{

    onSubmit = formValues =>{

        this.props.createStream(formValues);

    }




    render(){
        if(this.props.userIsLogin)
        {

            return(
                <div>
                         <h3>Create a Stream</h3>
                        <StreamForm onSubmit={this.onSubmit} user={this.props.user} /> 
                </div>
          
                )
  

         }else{
             return(
                 <div>
                     <h1>you need to be login so you can create</h1>
                 </div>
             )
         }
    
    }
    
        
            


}


const mapStateToProps=state=>{
    return{userIsLogin:state.auth.isSignedIn,userId:state.auth.userId,user:state.user};


}
export default connect(mapStateToProps,{createStream})(StreamCreate);