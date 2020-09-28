import history from '../history';

import streamsApi from '../api/streams';
import {SIGN_IN,SIGN_OUT,CREATE_STREAM,FETCH_STREAM,FETCH_STREAMS,DELETE_STREAM,EDIT_STREAM,SELECTED_STREAM, CREATE_USER, LOGIN}  from '../actions/types';


export const signIn =(userId)=>{
    return {
        type:SIGN_IN,
        payload:userId
    };
}
export const signOut =()=>{
    return {
        type:SIGN_OUT,
    };
}

export const createStream =formValues => async (dispatch) =>{
const res = await streamsApi.post("/newStream",formValues);
console.log("create");
dispatch({type:CREATE_STREAM,payload:res.data});
setTimeout(()=>{history.push("/")},100) ;

};


export const fetchStreams =()=> async dispatch =>{
    const res = await streamsApi.get('/streams');
    dispatch({
        type:FETCH_STREAMS,
        payload:res.data
    });

}

export const fetchStream =(streamId)=> async dispatch =>{
    const res = await streamsApi.get(`/stream/${streamId}`);

    dispatch({
        type:FETCH_STREAM,
        payload:res.data
    });
}
export const selctedStream = (stream)=>{

    return {
        type:SELECTED_STREAM,
        payload:stream
    }

}


export const editStream =(streamId,formValues)=> async dispatch=>{
    const res = await streamsApi.put(`/streams/edit`,{id:streamId,formValues});
    dispatch({type:EDIT_STREAM,payload:res.data}) 
    setTimeout(()=>{history.push("/")},50) ;

}

export const deleteStream = id =>  dispatch =>{
     streamsApi.delete(`/streams/delete/${id}`);
    dispatch({type:DELETE_STREAM,payload:id});
   setTimeout(()=>{history.push("/")},40) ;
}
export const createUser=(formValues,signIn)=> async dispatch=>{
 const res = await streamsApi.post('/register',formValues);
 dispatch({type:CREATE_USER,payload:res.data})
 if(res.data!='eror'||res.data!='dup'){
    signIn(res.data._id);
    history.push('/');
}
}
export const loginUser=(formValues,signIn)=> async dispatch=>{
    const res = await streamsApi.post('/login',formValues);
    dispatch({type:LOGIN,payload:res.data})
console.log(res.data)
    if(res.data!='eror'&&res.data!=='not found'){
        signIn(res.data._id);

        history.push('/');

    }


   }