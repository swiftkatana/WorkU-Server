import React from 'react';

import axios from 'axios'


import SearchBar from './SearchBar';
import ImageList from './imageList';



class App extends React.Component {

  state={
    imgsArry:[],
  }

   onSearchSubmit=async (term)=>{
  const res = await axios.get('https://api.unsplash.com/search/photos',{

    params:{query:term},
    headers:{
        Authorization:'Client-ID C6hnb02F5RLV1ktpwDachXFNP41yr-bQTOBfne7wPeQ'
      } 

    });
    this.setState({imgsArry:res.data.results}) 
  }



  render(){
  return (
    <div className="App ui container" style={{marginTop:"10px"}}>
<SearchBar onSubmit={this.onSearchSubmit} />
<ImageList images={this.state.imgsArry} />

    </div>
  );
}
}

export default App;
