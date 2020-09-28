import {SELECTED_STREAM} from '../actions/types'



export default (state={},actions)=>{

    switch(actions.type){

        case SELECTED_STREAM :return actions.payload

        default:return state

    }

}