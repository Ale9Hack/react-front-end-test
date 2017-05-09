import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../api';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
//static props declatation

class Day extends Component{
  constructor(props) {
    super(props)
    this.state={active:''}
}

enable(cssClass){
  this.setState({active:' '+cssClass+ ' '})
  return true;
}
disable(cssClass){
  this.setState({active:' '+cssClass+ ' '})
  return false;
}
handleClick(event){
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

class Calendar extends Component{
  constructor(props) {
    super(props)
    this.state={animation:''}
    this.days=[];
}

componentDidMount(){
}

move(animation){
return new Promise((resolve,reject)=>{
    this.setState({animation:animation},()=>{
      resolve()
    })
})
}

render(){
return (
  <CSSTransitionGroup    transitionAppear={true} transitionName={this.state.animation}
      transitionAppearTimeout={2000} transitionLeaveTimeout={2000} transitionEnterTimeout={1000}>
  <section key={this.props.id} className={'page'}>
   <header>
     <h2 className='month-name'>{this.props.month.name}</h2>
       {this.props.dayOfWeekStr.map((dayOfWeek,index)=>(
         <DayOfWeek key={index}  day={dayOfWeek} />
       ))}
   </header>
 {this.props.month.prevDays.map((day,dayIndex)=>(
      <DayDisable key={dayIndex} day={day.day} schedule={day.schedule}  month={day.month} year={day.year}/>
 ))}
 {this.props.month.days.map((day,dayIndex)=>(
 <Day  date={day} ref={(child) => { this.days[dayIndex]=child;}} key={dayIndex} id={dayIndex} sendToDays={this.props.sendToDays}/>
))}
{this.props.month.nextDays.map((day,dayIndex)=>(
    <DayDisable key={dayIndex} day={day.day}  schedule={day.schedule}  month={day.month} year={day.year}/>
))}

</section>
</CSSTransitionGroup>
)
}
}

const DayDisable=(props)=>{
return(
  <article className={' Day disable' }>
    <div className='container'>
      <h2>{props.day}</h2>
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

const DayPreview=(props)=>{
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
    this.state={month:{name:'',days:[],prevDays:[],nextDays:[]},
      dayOfWeekStr:[],activeDay:'',monthGlobalIndex:0,animation:'left'}
      this.pages=[];
      this.enabledDay=false
      this.previousActiveDayID=0;
      this.activeMonthID=0;
      this.previousActiveMonthID=0;
    };

  componentDidMount() {
      api.createCalendar(null,{month:this.state.month,monthGlobalIndex:this.state.monthGlobalIndex}).then((res)=>{
        this.setState({month:res.month,
          dayOfWeekStr:api.updateDayOfTheWeekStr()});
        //this.props.passDaytoTurn();
      });
  }

sendToDays(id,date){

  if(id!=this.previousActiveDayID){
    this.enabledDay=this.pages[this.activeMonthID].days[id].enable('active')
    this.pages[this.activeMonthID].days[this.previousActiveDayID].disable('');
}
  else if(this.enabledDay===true){
    this.enabledDay=this.pages[this.activeMonthID].days[id].disable('');
    date='';
}
  else{
    this.enabledDay=this.pages[this.activeMonthID].days[id].enable('active')
}
  this.previousActiveDayID=id;
  this.setState({activeDay:date})
  }

  moveCalendar (event){
    event.preventDefault();
    var target = event.currentTarget.id;
    if(this.enabledDay===true){
      this.setState({activeDay:''})
  }
    if (target=='calendar-right-button') {
    this.calendar.move('right')
  this.setState({monthGlobalIndex:this.state.monthGlobalIndex+1},()=>{
    api.createCalendar(null,{month:this.state.month,monthGlobalIndex:this.state.monthGlobalIndex}).then((res)=>{
      this.setState({month:res.month,animation:'right'});
    //this.props.passDaytoTurn();
  });
})
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
           <Calendar ref={(child)=>{this.calendar=child}} month={this.state.month} id={this.state.monthGlobalIndex} dayOfWeekStr={this.state.dayOfWeekStr} animation={this.state.animation}/>
       </div>
      </section>
      <DayPreview  date={this.state.activeDay}/>
        </section>
)
}
}
//propTypes Declatation only in child to parent comunication
Days.propTypes = {
  passDaytoTurn: PropTypes.func,
};

Calendar.propTypes = {
  sendToDays: PropTypes.func,
};
