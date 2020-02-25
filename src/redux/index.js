import {reducer} from './reduce';
export const createStore = () => {
  let currentState = {};
  let observers = []
  function getState() {
    return currentState
  }
  function dispatch(action) {
    currentState = reducer(currentState,action)
  }
  function subscribe(fn) { 
    observers.push(fn)
  }
  dispatch({ type: '@@REDUX_INIT' })
  return {
    getState, dispatch, subscribe
  }
}
const store = createStore(reducer)  //创建store
store.dispatch({ type: 'plus' })    //执行加法操作,给count加1
console.log(store.getState())
