import React, { FunctionComponent, useState, ChangeEvent, ChangeEventHandler, KeyboardEvent, KeyboardEventHandler, } from 'react'
import styles from './styles.scss'
import cx from 'classnames/bind'

import UserAuthIcon from '../Icon/UserAuthIcon'
import UserEditIcon from '../Icon/UserEditIcon'
import LockIcon from '../Icon/LockIcon'
import FindIcon from '../Icon/FindIcon'

type Props = {
  type?: 'text' | 'password',
  value?: string,
  disabled?: boolean,
  fullWidth?: boolean,
  icon?: 'userAuth' | 'userEdit' | 'lock' | 'find',
  onChange?: ChangeEventHandler,
  onKeyup?: KeyboardEventHandler,
  inputRef?: ((instance: HTMLInputElement | null) => void) | null | undefined,
}

const Input: FunctionComponent<Props> = ({
  type = 'text',
  value,
  disabled = false,
  fullWidth = false,
  icon = undefined,
  onChange = () => {
    // emply block
  },
  onKeyup = () => {
    // emply block
  },
  inputRef,
}) => {
  const [input, setInput,] = useState<HTMLInputElement | null>(null)

  const onClickIcon = () => {
    if (input !== null) {
      input.focus()
    }
  }

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }

  const onKeyupInput = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyup(event)
  }

  const getIcon = () => {
    if (icon === 'userAuth') {
      return <UserAuthIcon size='small' disabled={disabled}/>
    } else if (icon === 'userEdit') {
      return <UserEditIcon size='small' disabled={disabled}/>
    } else if (icon === 'lock') {
      return <LockIcon size='small' disabled={disabled}/>
    } else if (icon === 'find') {
      return <FindIcon size='small' disabled={disabled}/>
    }
  }

  return (
    <>
      <span className={cx({ [styles.icon]: icon !== undefined, })} onClick={onClickIcon}>
        {getIcon()}
      </span>
      <input className={cx(styles.input, { [styles.fullWidth]: fullWidth, [styles.leftIcon]: icon !== undefined, })}
        type={type}
        autoComplete={type === 'password' ? 'on' : undefined}
        value={value}
        disabled={disabled}
        ref={(input) => {
          setInput(input)
          if (inputRef !== null && inputRef !== undefined) {
            inputRef(input)
          }
        }}
        onChange={onChangeInput}
        onKeyUp={onKeyupInput}
      >
      </input>
    </>
  )
}

export default Input
