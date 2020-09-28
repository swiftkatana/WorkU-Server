import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {fetchStreams,selctedStream} from '../../actions'
import history from '../../history'


class StreamList extends React.Component{

   
 componentDidUpdate(){
 }
    componentDidMount(){
        this.props.fetchStreams();

    }
    renderList(){
    return this.props.streams.map(stream=>{

        return(
        <div  className="item" key={stream._id}>
     
          { this.renderAdmin(stream)}
             <i className="large middle aligend icon camera" />
                <div className="content">
               <Link onClick={()=>this.props.selctedStream(stream)} to={`/streams/show/${stream._id}`} >   {stream.title}</Link>  
                    <h5 className="description">{stream.description}</h5>
                </div>
      
        </div>

    )

    });
    }
        


    renderAdmin(stream){
        if(stream.userId===this.props.curectUserID){
        return(
            <div className="right floated content">
                <Link to={`/streams/delete/${stream._id}`} className="ui button negative ">Delete</Link>
                <Link  to={`/streams/edit/${stream._id}`} className="ui button primary"  >Edit</Link>
                <h5>created by: Me</h5>
            </div>
        )
        
    }        else return<div className="right floated content"><h5>created by: {stream.userName}</h5> </div> 

    }




    renderCreate(){
        if(this.props.userIsLogin){
            return(
                <div style={{textAlign:"right"}}>
                    <Link to="/streams/new" className="ui button primary ">Create Stream</Link>
                </div>
            )
        }
    }



    render(){
   

        return(
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{streams:Object.values(state.streams) ,curectUserID:state.auth.userId,userIsLogin:state.auth.isSignedIn };
}

export default  connect(mapStateToProps,{selctedStream:selctedStream,fetchStreams:fetchStreams})(StreamList)