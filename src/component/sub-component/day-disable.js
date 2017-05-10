import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

export  const DayDisable=(props)=>{
return(
  <article className={' Day disable' }>
    <div className='container'>
      <h2>{props.day}</h2>
    </div>
  </article>
)
}
