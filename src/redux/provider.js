import React from 'react'
export class Provider extends React.Component{
  getChildContext(){
    return{store:this.store}
  }
  constructor(props,context){
    super(props,context);
    this.store = props.store
  }
  render(){
    return this.props.children
  }
}