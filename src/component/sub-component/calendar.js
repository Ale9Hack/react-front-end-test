import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import {DayDisable} from './day-disable'
import {DayOfWeek} from './day-of-week'
import Day from './day'

 export default class Calendar extends Component{
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
