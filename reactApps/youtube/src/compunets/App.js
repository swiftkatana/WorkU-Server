import React from 'react';
 
import VideoDetail from './VideoDetail';
import SearchBar from './SearchBar';
import VideosList from './VideosList';
import youtube from '../api/youtube';

class App extends React.Component {

state={
  textSearch:"",
  videosList:[],
  videoPress:null

}

componentDidMount(){
this.onSubmit("news");

}


onSubmit= async (e)=>{
    this.setState({textSearch:e});
    const res=await youtube.get('/search',{
        params:{
        q:e
        }
    });
      this.setState({videoPress:res.data.items[0], videosList:res.data.items});

}


onVideoPress=(video)=>{
this.setState({videoPress:video});

}




  render(){
  return (

    <div className="App container">
    <SearchBar onSubmit={this.onSubmit}  />
    <div className="ui grid">
      <div className="ui row">
        <div className="eleven wide column">
             <VideoDetail className=""  video={this.state.videoPress} />

        </div>
        <div className="five wide column">
                <VideosList className="" onVideoPress={this.onVideoPress} videos={this.state.videosList} />

        </div>
      </div>
  
    </div>
  


    </div>
  );
}
}

export default App;
