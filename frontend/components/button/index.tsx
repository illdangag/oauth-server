import React, { FunctionComponent, MouseEvent, MouseEventHandler, } from 'react'
import styles from './styles.scss'
import cx from 'classnames/bind'

type Props = {
  disabled?: boolean,
  fullWidth?: boolean,
  onClick?: MouseEventHandler,
}

const Button: FunctionComponent<Props> = ({
  children,
  disabled = false,
  fullWidth = false,
  onClick = (event: MouseEvent) => {
    event.preventDefault()
  },
}) => {
  return (
    <button
      className={cx(styles.button, { [styles.fullWidth]: fullWidth, })}
      disabled={disabled}
      onClick={onClick}>
        {children}
    </button>
  )
}

export default Button
