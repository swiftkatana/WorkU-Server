import React from 'react';
import { connect } from 'react-redux'

import Modal from '../Modal';
import {deleteStream} from '../../actions'
import history from '../../history'

class StreamDelete extends React.Component{

     actions =()=>{
     return (  
        <React.Fragment>
            <button onClick={this.onDelete} className="ui negative button">Delete</button>
            <button onClick={()=>history.push('/')} className="ui  button">Cancel</button>
         </React.Fragment>
        )
    }
    onDelete=()=>{
        this.props.deleteStream(this.props.match.params.id);
    }
    render()
    {
        return(
            <div>
                <h1>Stream Delete</h1>
                <Modal onDismiss={()=>history.push('/')} actions={this.actions} onDelete={this.onDelete} header="Delete Stream" content="are you sure that you want to delete?" />
                
            </div>
            )

    }

}

const mapStateToProps=(state)=>{
    return{
        userIsLogin:state.auth.isSignedIn,
        userId:state.auth.userId
    }
}

export default connect(mapStateToProps,{deleteStream})(StreamDelete)