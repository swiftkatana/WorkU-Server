import React from 'react';

import './VideoItem.css'

const ViddeoItem =({video , onVideoPress} )=>{


    return(
    <div className="item video-item"  onClick={()=>onVideoPress(video)}  >
        <img alt={video.snippet.title} className="ui image" src={video.snippet.thumbnails.medium.url} />
         <div className="content">
               <div className="header">
                  <h4> {video.snippet.title}</h4>  

              </div>

        </div>
    </div>
    
    );

}

export default ViddeoItem