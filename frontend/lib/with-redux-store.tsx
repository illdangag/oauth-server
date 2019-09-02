import React from 'react'
import { initializeStore, exampleInitialState, } from '../store'

// tslint:disable-next-line: strict-type-predicates
const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(initialState: any) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!(window as any)[__NEXT_REDUX_STORE__]) {
    (window as any)[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }
  return (window as any)[__NEXT_REDUX_STORE__]
}

export default (App: any) => {
  class AppWithRedux extends React.Component {
    reduxStore: any
    static async getInitialProps(appContext: { ctx: { reduxStore: any; }; }) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore(exampleInitialState)

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      }
    }

    constructor(props: Readonly<{initialReduxState: any,}>) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />
    }
  }
  return AppWithRedux
}

export const mapDispatchToProps = (dispatch: any) => ({ dispatch, })
export type Dispatchable<P> = P & ReturnType<typeof mapDispatchToProps>
