import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../api';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
//static props declatation

//Component Declatation

//Import sub Component
import Calendar from './sub-component/calendar'
import {DayPreview} from './sub-component/day-preview'

export default class Days  extends Component{
  constructor(props) {
    super(props)
    this.state={month:{name:'',days:[],prevDays:[],nextDays:[]},
      dayOfWeekStr:[],activeDay:'',monthGlobalIndex:0,animation:'left'}
      this.pages=[];
      this.enabledDay=false
      this.previousActiveDayID=0;
      this.activeMonthID=0;
      this.previousActiveMonthID=-1;
    };

  componentDidMount() {
      api.createCalendar(null,{month:this.state.month,monthGlobalIndex:this.state.monthGlobalIndex}).then((res)=>{
        this.setState({month:res.month,
          dayOfWeekStr:api.updateDayOfTheWeekStr()});
        //this.props.passDaytoTurn();
      });
  }

sendToDays(id,date){
  if(id!=this.previousActiveDayID && this.enabledDay!=true){
    this.setState({activeDay:date},()=>{
      this.calendar.days[id].enable('active')
      this.enabledDay=true;
      this.previousActiveDayID=id;
    })
  }
  else if(id!=this.previousActiveDayID && this.enabledDay==true){
    this.setState({activeDay:date},()=>{
    this.calendar.days[id].enable('active')
    this.calendar.days[this.previousActiveDayID].disable('');
    this.previousActiveDayID=id;
  })}
  else {
    if(this.enabledDay===true){
      this.setState({activeDay:''},()=>{
      this.calendar.days[this.previousActiveDayID].disable('');
      this.enabledDay=false
    })}
    else{
      this.setState({activeDay:date},()=>{
      this.calendar.days[id].enable('active')
      this.enabledDay=true
    })}
  }
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
           <button type='button' id='calendar-left-button' onClick={this.moveCalendar.bind(this)}>-</button>
         </section>
         <section className='calendar-right-container'>
        <button type='button' id='calendar-right-button'  onClick={this.moveCalendar.bind(this)} >+</button>
         </section>
         <div className='container'>
           <Calendar ref={(child)=>{this.calendar=child}} sendToDays={(id,date)=>this.sendToDays(id,date)} month={this.state.month} id={this.state.monthGlobalIndex} dayOfWeekStr={this.state.dayOfWeekStr} animation={this.state.animation}/>
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
