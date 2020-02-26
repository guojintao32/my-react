export const createStore = (reducer,hightener) => {
  if(hightener){
    return hightener(createStore)(reducer)
  }
  let currentState = {};
  let observers = []
  function getState() {
    return currentState
  }
  function dispatch(action) {
    currentState = reducer(currentState,action)
    observers.forEach(fn => fn())
  }
  function subscribe(fn) { 
    observers.push(fn)
  }
  dispatch({ type: '@@REDUX_INIT' })
  return {
    getState, dispatch, subscribe
  }
}
