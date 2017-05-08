import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../api';
//static props declatation
class Day extends Component{
  constructor(props) {
    super(props)
    this.state={active:''}

}

enable(){
this.setState({active:'active'})
}
disable(){
  this.setState({active:'disable'})
}
handleClick(event){
this.enable()
this.props.sendToDays(this.props.id,this.props.date)
}
render(){
return (
<article onClick={(e)=>{this.handleClick(e)}} className={' Day' }>
  <div className={this.state.active+' container'}>
    <h2>{this.props.date.day}</h2>
  </div>
</article>
)}
}

const DisableDay=(props)=>{
return(
  <article className={' Day' }>
    <div className='container'>
      <h2>none</h2>
    </div>
  </article>
)
}

const DayOfWeek=(props)=>{
return(
<article className={props.status+' day-of-week'}>
  <div className='container'>
    <h2>{props.day}</h2>
    </div>
</article>
);
}

const Preview=(props)=>{
if(props.date){
var button = <button type='button'>Continuar</button>;
}
return(
<section id='preview'>
<h2>{props.date.fullDay}</h2>
<p>Turno</p>
<footer>
{button}
</footer>
</section>
);
}

//Component Declatation
export default class Days  extends Component{
  constructor(props) {
    super(props)
    this.state={months:[],
      dayOfWeekStr:[],activeDay:'',previousActiveDayID:''}
    this.childs=[];
    };
    componentDidMount() {
      api.createCalendar(null,{months:this.state.months}).then((res)=>{
        this.setState({months:res.months,dayOfWeekStr:api.updateDayOfTheWeekStr()});
        this.props.passDaytoTurn('hola');
      });
  }
sendToDays(id,date){
if(this.state.previousActiveDayID!='' && this.state.previousActiveDayID!=id){
this.childs[this.state.previousActiveDayID].disable();
}
this.setState({activeDay:date,previousActiveDayID:id})
}
moveCalendar (event){
event.preventDefault()
var target = event.currentTarget.id
if (target=='calendar-right-button') {
  api.createCalendar(null,{months:this.state.months}).then((res)=>{
    this.setState({months:res.months,dayOfWeekStr:api.updateDayOfTheWeekStr()});
  });
}
else{

}

}

  render(){
    return (
      <section id='Days'>
        <h2>Calendario</h2>
        <section className='calendar'>
         <section className='calendar-left-container'>
           <button type='button' id='calendar-left-button' onClick={this.moveCalendar.bind(this)}>Left</button>
         </section>
         <section className='calendar-right-container'>
        <button type='button' id='calendar-right-button'  onClick={this.moveCalendar.bind(this)} >Right</button>
         </section>
         <div className='container'>
         {this.state.months.map((month,monthIndex)=>(
         <section key={monthIndex} className='page'>
          <header>
            <h2 className='month-name'>{month.name}</h2>
              {this.state.dayOfWeekStr.map((dayOfWeek,index)=>(
                <DayOfWeek key={index}  day={dayOfWeek} />
              ))}
          </header>
        {month.prevDays.map((day,dayIndex)=>(
             <DisableDay key={dayIndex} day={day.day} schedule={day.schedule}  month={day.month} year={day.year}/>
        ))}
        {month.days.map((day,dayIndex)=>(
        <Day  date={day} ref={(child) => { this.childs.push(child)}} key={dayIndex} id={dayIndex} sendToDays={(id,date)=>this.sendToDays(id,date)}/>
      ))}

      {month.nextDays.map((day,dayIndex)=>(
           <DisableDay key={dayIndex} day={day.day}  schedule={day.schedule}  month={day.month} year={day.year}/>
      ))}

    </section>
        ))}
       </div>
      </section>
      <Preview date={this.state.activeDay}/>
        </section>
)
}
}
//propTypes Declatation only in child to parent comunication
Days.propTypes = {
  passDaytoTurn: PropTypes.func,
};
