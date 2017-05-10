import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

export  const DayPreview=(props)=>{
if(props.date){
var button = <button type='button'>Continuar</button>;
}
return(
<section id='preview'>
  <div className='container'>
  <p>Turno</p>
  </div>
<div className='container'>
  <h2>{props.date.fullDay}</h2>
</div>
<footer>
{button}
</footer>
</section>
);
}
