import React, { MouseEvent, } from 'react'

import Button from '../components/button'

interface Props {

}

interface State {

}

class SamplePage extends React.Component<Props, State> {
  handleClick(event: MouseEvent) {
    event.preventDefault()
  }

  render() {
    return (
      <Button text='BUTTON' fullWidth={false} onClick={this.handleClick}></Button>
    )
  }
}

export default SamplePage
