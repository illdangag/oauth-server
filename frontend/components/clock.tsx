    
import { connect, } from 'react-redux'
import React from 'react'
import { State, } from '../store'

const mapStateToProps = (state: State) => state

const format = (t: Date) => `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`

const pad = (n: number) => n < 10 ? `0${n}` : n

const Clock: React.FunctionComponent<State> = ({ lastUpdate, light, }) => {
  return (
    <div className={light ? 'light' : ''}>
      {format(new Date(lastUpdate))}
    </div>
  )
}

export default connect(mapStateToProps)(Clock)
