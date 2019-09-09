import { createStore, applyMiddleware, Dispatch, } from 'redux'
import { composeWithDevTools, } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

export const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0,

  accessToken: '',
  refreshToken: '',
}

export type State = {
  lastUpdate: number,
  light: boolean,
  count: number,

  accessToken: string,
  refreshToken: string,
}

export const actionTypes = {
  TICK: 'TICK',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',

  SET_TOKEN: 'SET_TOKEN',
}

// REDUCERS
export const reducer = (state = exampleInitialState, action: any) => {
  switch (action.type) {
    case actionTypes.TICK:
      return Object.assign({}, state, {
        lastUpdate: action.ts,
        light: !!action.light,
      })
    case actionTypes.INCREMENT:
      return Object.assign({}, state, {
        count: state.count + 1,
      })
    case actionTypes.DECREMENT:
      return Object.assign({}, state, {
        count: state.count - 1,
      })
    case actionTypes.RESET:
      return Object.assign({}, state, {
        count: exampleInitialState.count,
      })
    
    //
    case actionTypes.SET_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      })
    default: return state
  }
}

// ACTIONS
export const serverRenderClock = (isServer: boolean) => (dispatch: Dispatch) => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now(), })
}

export const startClock = (dispatch: Dispatch) => {
  return setInterval(() => {
    // Dispatch `TICK` every 1 second
    dispatch({ type: actionTypes.TICK, light: true, ts: Date.now(), })
  }, 1000)
}

//
export const setToken = (accessToken: string, refreshToken: string) => (dispatch: Dispatch) => {
  return dispatch({
    type: actionTypes.SET_TOKEN,
    accessToken,
    refreshToken,
  })
}

export function initializeStore(initialState = exampleInitialState) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
