import React from "react";
export function connect(mapStateToProps,mapDispatchToProps) {
  return function (Component) {
    class Connect extends React.Component {
      componentDidMount(){
        this.context.store.subscribe(this.handleStoreChange.bind(this))
      }
      handleStoreChange(){
        console.log('update')
      }
      render(){
        return(<Component
          {...this.props}
          {...this.mapStateToProps(this.context.store.getState())}
          {...this.mapDispatchToProps(this.context.store.dispatch)}>

        </Component>)
      }
    }
  }
}