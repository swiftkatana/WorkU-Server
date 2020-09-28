import React, { Component } from 'react';
import {connect} from 'react-redux'
import flv from 'flv.js'
import {fetchStream} from '../../actions'
 import {Link} from 'react-router-dom'
 import './streamShow.css';

class  StreamShow extends React.Component{
    constructor(props) {
        super(props)
        this.videoRef = React.createRef();
    }
    
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);   
        this.buildPlayer()

     }
     componentDidUpdate(){
         this.buildPlayer()
     }
     componentWillUnmount(){
         this.videoPlayer.destroy();
     }

     buildPlayer(){
         if(this.videoPlayer ||!this.props.stream) return

         this.videoPlayer= flv.createPlayer({
            type:"flv",
            url:`http://84.108.78.137:8000/live/${this.props.match.params.id}.flv`
        });
        this.videoPlayer.attachMediaElement(this.videoRef.current);
        this.videoPlayer.load();
     }
   
    renderAdmin(stream){
        if(stream.userId===this.props.curectUserID){
        return(
            <div className="right floated content">
                <Link to={`/streams/delete/${stream._id}`} className="ui button negative ">Delete</Link>
                <Link  to={`/streams/edit/${stream._id}`} className="ui button primary"  >Edit</Link>
            </div>
        )
    }
    }

renderPage(){
    const stream = this.props.stream;
if(!stream)return<div>Loading...</div>
console.log(stream)
    return(
        <div className="videoShow">
             <div className="item" key={stream._id}>
        
                <video ref={this.videoRef} style={{width:"100%"}} controls  />
                <div className="content">
               <h1 className="ui  header"> {stream.title}</h1> 
                    <div className="description">{stream.description}</div>
                </div>
            </div>
        { this.renderAdmin(stream)}

        </div>
    );
}


    render(){


       return(
            <div>
                {this.renderPage()}
                
            </div>
        )
    }

}

const mapStateToProps= (state,ownProps)=>{
    console.log(ownProps)
    return{
        curectUserID:state.auth.userId,userIsLogin:state.auth.isSignedIn,stream:state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps,{fetchStream})(StreamShow)