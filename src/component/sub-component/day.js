import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

export default class Day extends Component{
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
