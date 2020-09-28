import React from 'react';



class SearchBar extends React.Component 
{


    state=
    {
        text:"",
    }


    onSubmitForm= (e)=>
    {

        e.preventDefault();
        this.props.onSubmit(this.state.text);

    }




    render()
 {


    return(
        <div>
            <div className="search-bar ui segment ">
                 <form className="ui form" onSubmit={this.onSubmitForm}>
                     <div className="field" > 
                      <input placeholder="search" value={this.state.text} onChange={(e)=>{this.setState({text:e.target.value})} } className="form-control " />
                    </div>
                
                 </form>
            </div>
           

        </div>
    );


 }



}


export default SearchBar;