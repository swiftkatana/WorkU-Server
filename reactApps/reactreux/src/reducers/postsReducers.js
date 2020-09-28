export default (state=[],action)=>{

switch(action.type){
    case "MY_POSTS":return action.payload;
    default:return state;
};


};