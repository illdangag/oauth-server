import React, { MouseEvent, ChangeEvent, KeyboardEvent, } from 'react'

import Button from '../components/Button'
import Input from '../components/Input'
import UserAuthIcon from '../components/Icon/UserAuthIcon'
import Checkbox from '../components/Checkbox'

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

  handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value)
  }

  handleKeyup = (event: KeyboardEvent<HTMLInputElement>): void => {
    console.log(event.key)
  }

  onChangeCheckbox = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.checked)
  }

  render() {
    return (
      <div>
        <div>
          <Button fullWidth={false} onClick={this.handleClick} size='large'>BUTTON</Button>
        </div>
        <div>
          <Button fullWidth={false} disabled={this.state.buttonDisabled}>button</Button>
        </div>
        <div>
          <Input
              fullWidth={false}
              icon={<UserAuthIcon size='small'/>}
              onChange={this.handleChangeInputValue}
          />
        </div>
        <div>
          <Input fullWidth={false} onKeyup={this.handleKeyup}/>
        </div>
        <div>
          <Checkbox label='test label1' id='checkbox1' onChnage={this.onChangeCheckbox}/>
        </div>
        <div>
          <Checkbox label='한글레이블'id='checkbox2' disabled={true} checked/>
        </div>
      </div>
    )
  }
}

export default SamplePage
