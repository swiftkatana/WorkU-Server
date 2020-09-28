import React from 'react';

// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.css"/>

const Spinner =(props)=>{
    return( <div class="ui active dimmer">
    <div class="ui text loader">{props.text}</div>
  </div>);
}
Spinner.defaultProps={
    text:"Loading..."
}


export default Spinner;