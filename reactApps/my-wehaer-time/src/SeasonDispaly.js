import './SeasonDispaly.css'

import React from "react";

const seasonConfig = {
    summer:{
        text:"lets go to the beach",
        iconName:"sun"
    },
    winter:{
        text: "burr, its is chilly",
        iconName:"snowflake"
    }
}

const getSeason =(lat ,month)=>{

    if(month>2&&month<9){

        return lat>0?"summer":'winter'

    }else{
return lat>0?"winter":"summer"

    }

}






const SeasonDispaly =(props)=>{

    const season = getSeason(props.lat,new Date().getMonth());
  const {text ,iconName} = seasonConfig[season];

return(
    <div className={`season-dispaly + ${season} `}>

    <i className={`${iconName} iconLeft icon massive ${season}`} />
    { props.lat==="Loading"?<i className="spinner loading icon"></i>: <h1>{text}</h1> }
    <i className={`${iconName} icon iconRight massive ${season}`} />

    </div>
);

}

export default SeasonDispaly