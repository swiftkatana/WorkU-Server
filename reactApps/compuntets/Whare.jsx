import React from 'react';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker} from 'react-dates';


class Whare extends React.Component{
state={
    startDate:null,
    endDate:null,
    focusedInput:null,
    country:"",
    howmanydays:0,
    howmanyProple:0
}
onButtonDown=()=>{
    if(this.state.howmanyProple>0)
    this.setState({howmanyProple:this.state.howmanyProple-1})
}

onSubmit=()=>{
    if(this.state.howmanyProple>0&&this.state.country.length>4){
        let form={
            howManydays:this.state.howmanydays,
            howmanyProple:this.state.howmanyProple,
            country:this.state.country,
            startDate:this.state.startDate._d,
            endDate:this.state.endDate._d,

        }
      
    }
}


 numberOfNightsBetweenDates (startDate, endDate){
    const start = new Date(startDate) //clone
    const end = new Date(endDate) //clone
    let dayCount = 0
  
    while (end > start) {
      dayCount++
      start.setDate(start.getDate() + 1)
    }
  
    return dayCount
  }
renderDatepicker(){
    return (<> <DateRangePicker
        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
         startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
         endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) =>  this.setState({ startDate, endDate,howmanydays:this.numberOfNightsBetweenDates(startDate,endDate) })} // PropTypes.func.isRequired,
         focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
         onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
        
     {this.state.howmanydays>0? <p>amount of days:{this.state.howmanydays}</p>:null}  
        </>)
}
renderSearch(){
    return (
        <div>
            <input  type="text" value={this.state.country} onChange={(e)=>{this.setState({country:e.target.value})} }name='country' placeholder="Enter Where" />
        </div>
    )

  }

renderHowmanyPeople(){
    return(
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
  <label className="btn btn-secondary ">
    <input onClick={this.onButtonDown} type="radio" name="options" id="option1" autoComplete="off"   /> {"<"}
  </label>
  <label className="btn">
    <input type="radio" name="options" id="option2" autoComplete="off" /> {this.state.howmanyProple}
  </label>
  <label className="btn btn-secondary">
    <input onClick={()=>{this.setState({howmanyProple:this.state.howmanyProple+1})}} type="radio" name="options" id="option3" autoComplete="off" />  {">"}
  </label>
</div>
    )
}

renderSubmiit(){
    return(
        <button onClick={this.onSubmit} className="btn btn-primary" type="submit">Search</button>
    )
}

  

    render(){
        return(
            <div className=" centerText " >
            <ul className=" list-group list-group-horizontal-md">
                <li className="list-group-item">{this.renderDatepicker()}</li>
                <li className="list-group-item">{this.renderSearch()}</li>
                <li className="list-group-item">{this.renderHowmanyPeople()}</li>
                <li className="list-group-item">{this.renderSubmiit()}</li>
            </ul>
               
            </div>
        )
    }


}


export default  Whare;