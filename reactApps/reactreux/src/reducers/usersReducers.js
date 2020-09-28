export default (state=[],action)=>{

    switch(action.type){
        case "MY_USERS":return[...state,action.payload] ;
        default:return state;
    };
    
    
    };