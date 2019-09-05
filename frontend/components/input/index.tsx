import React, { FunctionComponent, } from 'react'
import styles from './styles.scss'
import cx from 'classnames/bind'

type Props = {
  disabled?: boolean,
  fullWidth?: boolean,
  icon?: React.ReactNode,
}

const Input: FunctionComponent<Props> = ({
  disabled = false,
  fullWidth = false,
  icon = null,
}) => {
  return (
    <>
      <span className={cx({ [styles.icon]: icon !== null, })}>
        {icon}
      </span>
      <input className={cx(styles.input, { [styles.fullWidth]: fullWidth, [styles.leftIcon]: icon !== null, })}
          disabled={disabled}>
      </input>
    </>
  )
}

export default Input
