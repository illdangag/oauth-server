import React, { FunctionComponent, ChangeEventHandler, } from 'react'
import styles from './styles.scss'

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
    // emply block
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
