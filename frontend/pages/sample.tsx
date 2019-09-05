import React, { MouseEvent, } from 'react'

import Button from '../components/button'
import Input from '../components/input'

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
      <div>
        <div>
          <Button fullWidth={false} onClick={this.handleClick}>button</Button>
        </div>
        <div>
          <Input fullWidth={false}/>
        </div>
      </div>
    )
  }
}

export default SamplePage
