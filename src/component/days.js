import React, { Component } from 'react';
import api from '../api';
import PropTypes from 'prop-types';

//static props declatation
const Day=(props)=>{
return(
<article onClick={props.handleClick} className={props.status+' Day'} data-day={props.date}>
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
    <header>
    <h2>{props.day}</h2>
    </header></div>
</article>
);
}

const Preview=(props)=>{
return(
<h2>
  Hola mundo
</h2>
);
}

//Component Declatation
export default class Days  extends Component{
  constructor(props) {
    super(props)
    this.state={months:[],
      dayOfWeekStr:[]}
    };
    componentDidMount() {
      api.createCalendar(null,{months:this.state.months},(res)=>{
        this.setState({months:res.months,dayOfWeekStr:res.dayOfWeekStr});
      });
      }
handleClick(event){
this.props.passDaytoTurn(event)
}
moveCalendar (event){
event.preventDefault()
var target = event.currentTarget.id
if (target=='calendar-right-button') {
  api.createCalendar(null,{months:this.state.months},(res)=>{
    this.setState({months:res.months,dayOfWeekStr:res.dayOfWeekStr});
  });
}
else{

}

}

  render(){
    return (
      <section id='Days'>
        <h2>Ultimos dias</h2>
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
        <Day key={dayIndex} date={day.date}  day={day.day} schedule={day.schedule} handleClick={this.handleClick.bind(this)}  month={day.month} year={day.year}/>
      ))}

      {month.nextDays.map((day,dayIndex)=>(
           <Day key={dayIndex} day={day.day}  schedule={day.schedule}  month={day.month} year={day.year}/>
      ))}

    </section>
        ))}
       </div>
      </section>
      <Preview />
        </section>
)
}
}
//propTypes Declatation only in child to parent comunication
Days.propTypes = {
  passDaytoTurn: PropTypes.func,
};
