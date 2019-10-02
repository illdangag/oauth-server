import React, { FunctionComponent, useState, ChangeEvent, ChangeEventHandler, KeyboardEvent, KeyboardEventHandler, } from 'react'
import styles from './index.scss'
import cx from 'classnames/bind'

import { FaUserLock, FaUserCog, FaLock, FaSearch, FaRegClock, } from 'react-icons/fa'

type Props = {
  type?: 'text' | 'password' | 'number',
  value?: string | number,
  disabled?: boolean,
  fullWidth?: boolean,
  icon?: 'userAuth' | 'userEdit' | 'lock' | 'find' | 'clock',
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
    // empty block
  },
  onKeyup = () => {
    // empty block
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
      return <FaUserLock/>
    } else if (icon === 'userEdit') {
      return <FaUserCog/>
    } else if (icon === 'lock') {
      return <FaLock/>
    } else if (icon === 'find') {
      return <FaSearch/>
    } else if (icon === 'clock') {
      return <FaRegClock/>
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
