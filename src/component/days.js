import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../api';
//static props declatation
const Day=(props)=>{
return(
<article onClick={props.handleClick} className={props.status+' Day'} data-day={props.fullDay}>
  <div className='container'>
    <h2>{props.day}</h2>
  </div>
</article>
);
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
if(props.day){
var button = <button type='button'>Continuar</button>;
}
return(
<section id='preview'>
<h2>{props.day}</h2>
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
      dayOfWeekStr:[],currentDay:''}
    };
    componentDidMount() {
      api.createCalendar(null,{months:this.state.months}).then((res)=>{
        this.setState({months:res.months,dayOfWeekStr:api.updateDayOfTheWeekStr()});
      });
  }
handleClick(event){
let day=event.currentTarget.getAttribute('data-day');
console.log(day);
this.setState({currentDay:day})
//this.props.passDaytoTurn(event)
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
             <Day key={dayIndex} day={day.day} schedule={day.schedule}  month={day.month} year={day.year}/>
        ))}
        {month.days.map((day,dayIndex)=>(
        <Day key={dayIndex} date={day.date}  day={day.day} fullDay={day.fullDay} schedule={day.schedule} handleClick={this.handleClick.bind(this)}  month={day.month} year={day.year}/>
      ))}

      {month.nextDays.map((day,dayIndex)=>(
           <Day key={dayIndex} day={day.day}  schedule={day.schedule}  month={day.month} year={day.year}/>
      ))}

    </section>
        ))}
       </div>
      </section>
      <Preview day={this.state.currentDay}/>
        </section>
)
}
}
//propTypes Declatation only in child to parent comunication
Days.propTypes = {
  passDaytoTurn: PropTypes.func,
};
