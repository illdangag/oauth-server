import React, { FunctionComponent, ChangeEventHandler, } from 'react'
import styles from './index.scss'

type Props = {
  label?: string,
  id: string,
  disabled?: boolean
  checked?: boolean
  onChange?: ChangeEventHandler,
}

const Checkbox: FunctionComponent<Props> = ({
  label = '',
  id,
  disabled = false,
  checked,
  onChange = () => {
    // empty block
  },
}) => {
  return (
    <>
      <input
          type='checkbox'
          id={id}
          className={styles.checkbox}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
      />
      <label htmlFor={id}>
      {label}
      </label>
    </>
  )
}

export default Checkbox
