import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import {fetchPosts , fetchUsers } from '../action/'
import UserPost from './UserPost';

class PostList extends React.Component{
    renderuser=(postId)=>{
        const users =this.props.state.gotUsers[0];
        if(users.length >1){
            
            const user = users.find(user=>user.id===postId);
            return  <UserPost user={user}/>


        }else return null;
    }

    renderList=()=>{
        const listPosts = this.props.state.gotPosts;
        if(!listPosts) return<div></div>
        else{
            return  listPosts.map(post=>{
                return (
                    <div className="item" key={post.id}>
                    <i className="large middle aligned icon user" />
                    <div className="content">
                    <div className="description" >
                         <h4>{post.title}</h4>
                        <p>{post.body}</p>
        
                        </div>
                    </div>
                    {this.renderuser(post.userId) }
                   
                    </div>
                );
            })

        }        
        }
        

    componentDidMount(){
this.props.fetchUsers();

this.props.fetchPosts();
    }

render() {

    return (
         <div className="ui relaxed divided list">
             {this.renderList()}
         </div>
    );
}

}

const mapStateToProps =(state)=>{
return{state:state}
}

export default connect(mapStateToProps,{fetchPosts:fetchPosts,fetchUsers:fetchUsers})(PostList);