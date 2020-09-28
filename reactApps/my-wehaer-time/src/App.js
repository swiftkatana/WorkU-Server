import React from "react";

import Spinner from './Spinner'
import SeasonDispaly from "./SeasonDispaly"

class App extends React.Component{


state={
    lat:null,
     errMesg:null,
}







componentDidMount(){
    window.navigator.geolocation.getCurrentPosition(
        (pos)=>this.setState({lat:pos.coords.latitude}),
        (Err)=> this.setState({errMesg:Err.message})
        
    );
}



render(){
   let posMesg;
    if(this.state.lat){
        posMesg=this.state.lat;
    }else if(this.state.errMesg){
        posMesg=this.state.errMesg;

    }else{
       return (<Spinner  text="please Allow us  your location" />)
    }

    return(
        <div>
    
           <SeasonDispaly lat={posMesg} />
        
        </div>
    );

}


}

export default App