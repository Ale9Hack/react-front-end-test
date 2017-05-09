import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../api';

const Turn=(props)=>{
return(
<article onClick={props.onClick}>
<div className="container">
<h2>{props.startTime}</h2>
<h4>{props.status}</h4>
</div>
</article>
);
}

export default class Turns extends Component{
  constructor(props) {
    super(props)
    this.state={};
    this.state.turns=[];
    this.state.display=false;
    this.hidden = this.hidden.bind(this);
    this.show = this.show.bind(this);

  }

componentDidMount(){
api.getTurns(null, (res)=>{
this.setState({turns:this.state.turns.length>0?this.state.turns.concat(res):res});
});
}

show(){
this.setState({display:true})
};

hidden(event){
  event.preventDefault()
  this.setState({display:false})
}

render(){
return (
<section id='Turns' className={this.state.display==true?' active ':' '}>
 <button type="button" onClick={this.hidden} >Cerrar X</button>
  <h2>Turnos para hoy</h2>
  <ul className='container'>
    {this.state.turns.map((turn,index)=>(
      <li key={index}>
      <Turn onClick={this.setTurn} status={turn.status} startTime={turn.startTime} />
      </li>
    ))}
  </ul>
</section>
);
}
}
