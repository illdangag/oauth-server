import React, { FunctionComponent, } from 'react'
import styles from './styles.scss'
import cx from 'classnames/bind'

type Props = {
  size?: string,
}

const CorssIcon: FunctionComponent<Props> = ({
  size= '',
}) => {
  return (
    <span className={cx(styles.icon, styles[size])}></span>
  )
}

export default CorssIcon
