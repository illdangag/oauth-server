import React, { FunctionComponent, ChangeEventHandler, } from 'react'
import styles from './styles.scss'

type Props = {
  id: string,
  disabled?: boolean,
  checked?: boolean,
  onChange?: ChangeEventHandler,
}

const Switch: FunctionComponent<Props> = ({
  id,
  disabled,
  checked,
  onChange = () => {
    // emply block
  }
}) => {
  return(
    <>
      <input 
        className={styles.input}
        type='checkbox'
        id={id}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={id}
      ></label>
    </>
  )
}

export default Switch
