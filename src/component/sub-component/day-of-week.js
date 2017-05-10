import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

export  const DayOfWeek=(props)=>{
return(
<article className={props.status+' day-of-week'}>
  <div className='container'>
    <h2>{props.day}</h2>
    </div>
</article>
);
}
