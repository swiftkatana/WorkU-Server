
import jsonplaceholder from '../api/jsonplaceholder'


export const  fetchPosts = ()=> async dispatch=>{
  const res= await jsonplaceholder.get('/posts');

  dispatch({type:"MY_POSTS",payload:res.data});
}

export const fetchUsers = ()=> async dispatch=>{
  const res= await jsonplaceholder.get('/users');
  dispatch({type:"MY_USERS",payload:res.data});
}