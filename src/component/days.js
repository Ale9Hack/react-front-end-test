import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../api';
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

class DayPages extends Component{
  constructor(props) {
    super(props)
    this.state={active:''}
    this.days=[];
}

componentDidMount(){

}

enable(cssClass){
  setTimeout(()=> {
  this.setState({active:' '+cssClass+ ' '})
},10);
return true;
}
disable(cssClass){
  setTimeout(()=> {
  this.setState({active:' '+cssClass+ ' '})
},10);
  return false;
}

render(){
return (
  <section key={this.props.monthIndex} className={'page'+this.state.active}>
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
)
}
}

const DayDisable=(props)=>{
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
    this.state={months:[],
      dayOfWeekStr:[],activeDay:''}
      this.pages=[];
      this.enabledDay=false
      this.previousActiveDayID=0;
      this.activeMonthID=0;
      this.previousActiveMonthID=0;
    };

  componentDidMount() {
      api.createCalendar(null,{months:this.state.months}).then((res)=>{
        this.setState({months:res.months,
          dayOfWeekStr:api.updateDayOfTheWeekStr()});
        //this.props.passDaytoTurn();
        this.pages[this.activeMonthID].enable('active')
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
      this.enabledDay=this.pages[this.activeMonthID].days[this.previousActiveDayID].disable('');
      this.setState({activeDay:''})
  }
    if (target=='calendar-right-button') {
      this.pages[this.previousActiveMonthID].disable('');
      this.activeMonthID+=1;
      this.previousActiveMonthID=this.activeMonthID;
      if(this.state.months.length<=this.activeMonthID){
        api.createCalendar(null,{months:this.state.months}).then((res)=>{
          this.setState({months:res.months});
            this.pages[this.activeMonthID].enable('active');
    });
      }
      else{
         this.pages[this.activeMonthID].enable('active');
      }
}
    else{
      console.log(this.previousActiveMonthID,this.activeMonthID);
      this.pages[this.previousActiveMonthID].disable('');
      this.activeMonthID=this.activeMonthID>0?this.activeMonthID-1:0;
      this.previousActiveMonthID=this.activeMonthID
      this.pages[this.activeMonthID].enable('active');
    }

}
deleteCalendar(){

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
          <DayPages ref={(child)=>{this.pages[monthIndex]=child}} key={monthIndex} month={month} dayOfWeekStr={this.state.dayOfWeekStr} sendToDays={(id,date)=>this.sendToDays(id,date)} />
        ))}
       </div>
      </section>
      <DayPreview date={this.state.activeDay}/>
        </section>
)
}
}
//propTypes Declatation only in child to parent comunication
Days.propTypes = {
  passDaytoTurn: PropTypes.func,
};

DayPages.propTypes = {
  sendToDays: PropTypes.func,
};
