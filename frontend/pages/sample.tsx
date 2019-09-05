import React, { MouseEvent, } from 'react'

import Button from '../components/Button'
import Input from '../components/Input'
import UserAuthIcon from '../components/Icon/UserAuthIcon'

interface Props {

}

interface State {
  buttonDisabled?: boolean,
}

class SamplePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      buttonDisabled: false,
    }
  }

  handleClick = (event: MouseEvent): void => {
    event.preventDefault()

    this.setState({
      buttonDisabled: !this.state.buttonDisabled,
    })
  }

  render() {
    return (
      <div>
        <div>
          <Button fullWidth={false} onClick={this.handleClick}>button</Button>
        </div>
        <div>
          <Button fullWidth={false} disabled={this.state.buttonDisabled}>button</Button>
        </div>
        <div>
          <Input fullWidth={false} icon={<UserAuthIcon size='small'/>}/>
          {/* <Input fullWidth={false}/> */}
        </div>
      </div>
    )
  }
}

export default SamplePage
