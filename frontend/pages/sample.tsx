import React, { MouseEvent, } from 'react'

import Button from '../components/Button'
import Input from '../components/Input'
import UserAuth from '../components/Icon/UserAuth'

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
        <div>
          <UserAuth/>
        </div>
      </div>
    )
  }
}

export default SamplePage
