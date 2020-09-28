import React from 'react';
import {Field,reduxForm} from 'redux-form'







class StreamForm extends React.Component{

    onSubmit=(formValues)=>{
        formValues.userId=this.props.user._id;
        formValues.userName=this.props.user.firstName;
this.props.onSubmit(formValues);


    }

    renderError=({error,touched})=>{
        if(error&&touched){
            return(
                <div className="ui error message">
                 <div className="header">{error}</div>   
                </div>
            );
        }
    }


    renderInput=({input , label,meta})=>{
        const className=`field ${meta.error&&meta.touched?"error":""}`
    return (
    <div className={className}>
      <label>{label}</label>
    <input {...input} autoComplete="off" />
    {this.renderError(meta)}
    </div>
    )

    }


    render(){
      
            return(

            <Field name="country" component={this.renderInput} label="Enter country" />

            )
      
    
    }
    
        
            


}

const validate=(formdit)=>{
    const errors ={}
    if(!formdit.country){
        errors.country="you must enter a country "
    }
   

    return errors
}

export default  reduxForm({form:'streamCreate',validate})(StreamForm);