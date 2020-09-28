
import {combineReducers} from 'redux';


const songsReducer =()=>{

    return[
        {title:'metal',duration:'4:05'}, {title:'fasfsa',duration:'3:05'}, {title:'1',duration:'4:55'}, {title:'12345',duration:'4:06'}
    ]

}


const selectedSongReducer =(selectedSong=null,action)=>{

if(action.type==="SONG_SELECTED"){
return action.payload;

}
return selectedSong;
}

export default combineReducers({

    songs:songsReducer,
    selectedSong:selectedSongReducer

});