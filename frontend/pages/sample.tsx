import React, { MouseEvent, ChangeEvent, KeyboardEvent, } from 'react'

import Button from '../components/Button'
import Input from '../components/Input'
import UserAuthIcon from '../components/Icon/UserAuthIcon'
import CrossIcon from '../components/Icon/CrossIcon'
import Checkbox from '../components/Checkbox'
import MultipleInput, { MultipleInputChangeEvent, } from '../components/MultipleInput'
import Switch from '../components/Switch'

import { List, } from 'immutable'

interface Props {

}

interface State {
  buttonDisabled?: boolean,
  switchChecked: boolean,
  values: List<string>,
}

class SamplePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      buttonDisabled: false,
      switchChecked: false,
      values: List(),
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

  onChangeMultipleInput = (evnet: MultipleInputChangeEvent): void => {
    this.setState({
      ...this.state,
      values: evnet.values,
    })
  }

  onChangeSwitch = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      ...this.state,
      switchChecked: event.target.checked,
    })
  }

  render() {
    return (
      <div>
        <div>
          <UserAuthIcon/>
          <CrossIcon/>
        </div>
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
          <Checkbox label='test label1' id='checkbox1' onChange={this.onChangeCheckbox}/>
        </div>
        <div>
          <Checkbox label='한글레이블'id='checkbox2' disabled={true} checked/> TEXT
        </div>
        <div>
          <MultipleInput values={this.state.values} onChange={this.onChangeMultipleInput}/>
        </div>
        <div>
          <Switch id='switch1' checked={this.state.switchChecked} onChange={this.onChangeSwitch} label={'swtich'}/>
        </div>
      </div>
    )
  }
}

export default SamplePage
