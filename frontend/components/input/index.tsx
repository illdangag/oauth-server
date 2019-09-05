import React, { FunctionComponent, } from 'react'
import styles from './styles.scss'
import cx from 'classnames/bind'

type Props = {
  disabled?: boolean,
  fullWidth?: boolean,
}

const Input: FunctionComponent<Props> = ({
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <input className={cx(styles.input, { [styles.fullWidth]: fullWidth, })} disabled={disabled}></input>
  )
}

export default Input
