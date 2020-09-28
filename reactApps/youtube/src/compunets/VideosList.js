import React from 'react'

import VideoItem from './VideoItem'



const  VideosList =({videos , onVideoPress})=>{

    const renderList=videos.map(video=>{
            return <VideoItem key={video.id.videoId} onVideoPress={onVideoPress} video={video} />
    });

return<div className="ui relaxed divided list">
       {renderList}
    </div>


}




export default  VideosList