import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from './redux'
import { createStore } from './redux/store'
import { reducer } from './redux/reducer'



const logger = store => next => action => { 
  console.log(store)   
  console.log('log1')    
  let result = next(action)    
  return result
}

const logger2 = store => next => action => {    
  console.log('log2')    
  let result = next(action)    
  return result
}
const applyMiddleware = (...middlewares) => createStore => reducer => {    
  const store = createStore(reducer)    
  let { getState, dispatch } = store    
  const params = {      
      getState,      
      dispatch: (action) => dispatch(action)      
      //解释一下这里为什么不直接 dispatch: dispatch      
      //因为直接使用dispatch会产生闭包,导致所有中间件都共享同一个dispatch,如果有中间件修改了dispatch或者进行异步dispatch就可能出错    
  }    

  const middlewareArr = middlewares.map(middleware => 
    {
      console.log(params)
      return middleware(params)
    }) 
 
  dispatch = compose(...middlewareArr)(dispatch)    
  return { ...store, dispatch }
}

//compose这一步对应了middlewares.reverse(),是函数式编程一种常见的组合方法
function compose(...fns) {
  if (fns.length === 0) return arg => arg    
  if (fns.length === 1) return fns[0]    
  return fns.reduce((res, cur) =>(...args) => res(cur(...args)))
}
let store = applyMiddleware( logger, logger2 )(createStore)(reducer)


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
