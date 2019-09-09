import React, { FunctionComponent, useState, ReactNode, ChangeEvent, ChangeEventHandler, KeyboardEvent, KeyboardEventHandler,} from 'react'
import styles from './styles.scss'
import cx from 'classnames/bind'

type Props = {
  disabled?: boolean,
  fullWidth?: boolean,
  icon?: ReactNode,
  onChange?: ChangeEventHandler,
  onKeyup?: KeyboardEventHandler,
}

const Input: FunctionComponent<Props> = ({
  disabled = false,
  fullWidth = false,
  icon = undefined,
  onChange = () => {
    // emply block
  },
  onKeyup = () => {
    // emply block
  },
}) => {
  const [input, setInput,] = useState<HTMLInputElement | null>(null)

  const onClickIcon = () => {
    if (input !== null) {
      input.focus()
    }
  }
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }
  const onKeyupInput = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyup(event)
  }
  return (
    <>
      <span className={cx({ [styles.icon]: icon !== undefined, })} onClick={onClickIcon}>
        {icon}
      </span>
      <input className={cx(styles.input, { [styles.fullWidth]: fullWidth, [styles.leftIcon]: icon !== undefined, })}
        disabled={disabled}
        ref={(input) => { setInput(input) }}
        onChange={onChangeInput}
        onKeyUp={onKeyupInput}
      >
      </input>
    </>
  )
}

export default Input
