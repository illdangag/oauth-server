import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import Clock from '../components/clock'

import { connect, } from 'react-redux'
import { Dispatchable, mapDispatchToProps, } from '../lib/with-redux-store'
import { startClock, } from '../store'

const hiStyle = {
  color: 'red',
  paddingTop: '10px',
}

interface Props {

}

interface State {

}

class IndexPage extends React.Component<Dispatchable<Props>, State> {
  private timer: any

  constructor(props: Dispatchable<Props>) {
    super(props)
    this.timer = null
  }

  componentDidMount() {
    const { dispatch, } = this.props
    this.timer = startClock(dispatch)
  }

  componentWillUnmount() {
    if (this.timer !== null) {
      clearInterval(this.timer)
    }
  }

  render() {
    return (
      <Layout title='Home | Next.js + TypeScript Example'>
        <h1 style={hiStyle}>Hello Next.js 👋</h1>
        <p><Link href='/about'><a>About</a></Link></p>
        <Clock />
      </Layout>
    )
  }
}

export default connect(null, mapDispatchToProps)(IndexPage)
