import React, { FunctionComponent, MouseEventHandler, } from 'react'
import styles from './index.scss'
import cx from 'classnames/bind'

type Props = {
  disabled?: boolean,
  size?: 'large',
  style?: 'nomal' | 'outline',
  fullWidth?: boolean,
  onClick?: MouseEventHandler,
}

const Button: FunctionComponent<Props> = ({
  children,
  disabled = false,
  size = null,
  style = 'nomal',
  fullWidth = false,
  onClick = () => {
    // empty block
  },
}) => {
  return (
    <button
      className={cx(styles.button, {
        [styles.fullWidth]: fullWidth,
        [styles.large]: size === 'large',
        [styles[style]]: style,
      })}
      disabled={disabled}
      type='button'
      onClick={onClick}>
        <span>{children}</span>
    </button>
  )
}

export default Button
