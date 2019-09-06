import React, { Component, ReactNode, ChangeEvent, ChangeEventHandler, KeyboardEvent, KeyboardEventHandler, } from 'react'
import styles from './styles.scss'
import cx from 'classnames/bind'

interface Props {
  disabled?: boolean,
  fullWidth?: boolean,
  icon?: ReactNode,
  onChange?: ChangeEventHandler,
  onKeyup?: KeyboardEventHandler,
}

interface State {

}

class Input extends Component<Props, State> {
  private textInput: HTMLInputElement | null

  constructor(props: Props) {
    super(props)
    this.textInput = null
  }

  onClickIcon = () => {
    if (this.textInput) {
      this.textInput.focus()
    }
  }

  onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange !== undefined) {
      this.props.onChange(event)
    }
  }

  onKeyupInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (this.props.onKeyup !== undefined) {
      this.props.onKeyup(event)
    }
  }

  render() {
    return (
      <>
        <span className={cx({ [styles.icon]: this.props.icon !== undefined, })} onClick={this.onClickIcon}>
          {this.props.icon}
        </span>
        <input className={cx(styles.input, { [styles.fullWidth]: this.props.fullWidth, [styles.leftIcon]: this.props.icon !== undefined, })}
            disabled={this.props.disabled}
            ref={(input) => { this.textInput = input }}
            onChange={this.onChangeInput}
            onKeyUp={this.onKeyupInput}
        >
        </input>
      </>
    )
  }
}

export default Input
