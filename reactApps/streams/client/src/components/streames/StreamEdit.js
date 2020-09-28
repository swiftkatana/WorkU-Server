
    import React from 'react';
    import {connect} from 'react-redux'
    
    import StreamForm from './streamForm'
    import {editStream,fetchStream} from '../../actions'
    
    
    
    
    class StraemEdit extends React.Component{


        componentDidMount(){
          this.props.fetchStream(this.props.match.params.id);
        }

        onSubmit=(formValues)=>{
                this.props.editStream(this.props.match.params.id,formValues);
        }

    
    
        render(){
            if(this.props.userIsLogin)
            {
                return(
                    <div>
                        <h3>Edit a Stream </h3>
                        <StreamForm initialValues={this.props.stream} onSubmit={this.onSubmit} userId={this.props.userId}  />
      
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
    
  
    const mapStateToProps=(state,ownProps)=>{
     
        return{userIsLogin:state.auth.isSignedIn,userId:state.auth.userId,stream:state.streams[ownProps.match.params.id]};
    
    
    }
    export default connect(mapStateToProps,{editStream,fetchStream})(StraemEdit);