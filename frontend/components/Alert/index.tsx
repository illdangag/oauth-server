import { FunctionComponent, MouseEventHandler, } from 'react'
import styles from './styles.scss'

import Button from '../../components/Button'

export interface AlertButtonInfo {
  text: string,
  onClick?: MouseEventHandler,
}

type Props = {
  title: string,
  message: string,
  buttons: AlertButtonInfo[],
}

const Alert: FunctionComponent<Props> = ({
  title = '',
  message = '',
  buttons = [],
}) => {
  return (
    <div className={styles.alert}>
      <div className={styles.body}>
        <div className={styles.header}>{title}</div>
        <div className={styles.content}>{message}</div>
        <div className={styles.footer}>
          {buttons && buttons.map((button, index) => (
            <span key={index} className={styles.button}>
              <Button onClick={button.onClick}>{button.text}</Button>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Alert
