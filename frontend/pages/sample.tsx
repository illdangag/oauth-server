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
  buttonDisabled: boolean,
  checkbox1Checked: boolean,
  checkbox2Disabled: boolean,
  switch1Checked: boolean,
  switch2Disabled: boolean,
  values: List<string>,
}

class SamplePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      buttonDisabled: false,
      checkbox1Checked: false,
      checkbox2Disabled: false,
      switch1Checked: false,
      switch2Disabled: false,
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

  onChangeCheckbox1 = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      ...this.state,
      checkbox1Checked: event.target.checked,
      checkbox2Disabled: event.target.checked,
    })
  }

  onChangeMultipleInput = (evnet: MultipleInputChangeEvent): void => {
    this.setState({
      ...this.state,
      values: evnet.values,
    })
  }

  onChangeSwitch1 = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      ...this.state,
      switch1Checked: event.target.checked,
      switch2Disabled: event.target.checked,
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
          <Input fullWidth={false} icon={<UserAuthIcon size='small'/>} onChange={this.handleChangeInputValue}/>
        </div>
        <div>
          <Input fullWidth={false} onKeyup={this.handleKeyup}/>
        </div>
        <div>
          <Checkbox id='checkbox1' label='test label1' checked={this.state.checkbox1Checked} onChange={this.onChangeCheckbox1}/>
        </div>
        <div>
          <Checkbox id='checkbox2' label='한글레이블' disabled={this.state.checkbox2Disabled}/> TEXT
        </div>
        <div>
          <MultipleInput values={this.state.values} onChange={this.onChangeMultipleInput}/>
        </div>
        <div>
          <Switch id='switch1' checked={this.state.switch1Checked} onChange={this.onChangeSwitch1} label={'swtich'}/>
        </div>
        <div>
          <Switch id='switch2' disabled={this.state.switch2Disabled} label={'swtich'}/>
        </div>
      </div>
    )
  }
}

export default SamplePage
