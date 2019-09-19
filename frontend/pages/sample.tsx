import React, { MouseEvent, ChangeEvent, KeyboardEvent, } from 'react'

import Layout from '../container/Layout'
import Button from '../components/Button'
import Input from '../components/Input'
import UserAuthIcon from '../components/Icon/UserAuthIcon'
import PlusIcon from '../components/Icon/PlusIcon'
import TrashIcon from '../components/Icon/TrashIcon'
import FindIcon from '../components/Icon/FindIcon'
import EditIcon from '../components/Icon/EditIcon'
import LeftIcon from '../components/Icon/LeftIcon'
import UserEditIcon from '../components/Icon/UserEditIcon'
import Checkbox from '../components/Checkbox'
import MultipleInput, { MultipleInputChangeEvent, } from '../components/MultipleInput'
import Switch from '../components/Switch'

interface Props {

}

interface State {
  buttonDisabled: boolean,
  checkbox1Checked: boolean,
  checkbox2Disabled: boolean,
  switch1Checked: boolean,
  switch2Disabled: boolean,
  values: string[],
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
      values: [],
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

  onChangeMultipleInput = (event: MultipleInputChangeEvent): void => {
    this.setState({
      ...this.state,
      values: event.values,
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
      <Layout active={'client'}>
        <div>
          <div>
            <UserAuthIcon/><PlusIcon/><TrashIcon/><FindIcon/><EditIcon/><LeftIcon/><UserEditIcon/>
          </div>
          <div>
            <Button fullWidth={false} onClick={this.handleClick} size='large'>BUTTON</Button>
          </div>
          <div>
            <Button fullWidth={false} disabled={this.state.buttonDisabled}>button</Button>
          </div>
          <div>
            <Button fullWidth={false} style={'outline'} disabled={this.state.buttonDisabled}>outline</Button>
          </div>
          <div>
            <Input fullWidth={false} icon='userAuth' onChange={this.handleChangeInputValue}/>
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
      </Layout>
    )
  }
}

export default SamplePage
