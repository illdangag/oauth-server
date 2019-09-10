import React, { FunctionComponent, } from 'react'
import styles from './styles.scss'
import cx from 'classnames/bind'

type Props = {
  size?: 'small',
  disabled?: boolean,
}

const PlusIcon: FunctionComponent<Props> = ({
  size = '',
  disabled = false,
}) => {
  return (
    <span className={cx(styles.icon, styles[size], { [styles.disabled]: disabled, })}></span>
  )
}

export default PlusIcon
