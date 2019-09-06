import React, { FunctionComponent, MouseEventHandler, } from 'react'
import styles from './styles.scss'
import cx from 'classnames/bind'

type Props = {
  disabled?: boolean,
  size?: string,
  fullWidth?: boolean,
  onClick?: MouseEventHandler,
}

const Button: FunctionComponent<Props> = ({
  children,
  disabled = false,
  size = null,
  fullWidth = false,
  onClick = () => {
    // emply block
  },
}) => {
  return (
    <button
      className={cx(styles.button, { [styles.fullWidth]: fullWidth, [styles.large]: size === 'large', })}
      disabled={disabled}
      onClick={onClick}>
        {children}
    </button>
  )
}

export default Button
