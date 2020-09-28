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
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">

            <Field name="title" component={this.renderInput} label="Enter Title" />
            <Field name="description" component={this.renderInput} label="Enter Description"  />
            <button className="ui button primary">Submit</button>

        </form>)

      
    
    }
    
        
            


}

const validate=(formdit)=>{
    const errors ={}
    if(!formdit.title){
        errors.title="you must enter a title "
    }
    if(!formdit.description){
        errors.description="you must enter a description "
    }

    return errors
}

export default  reduxForm({form:'streamCreate',validate})(StreamForm);