import React, { FunctionComponent, CSSProperties, MouseEvent, MouseEventHandler, } from 'react'

const defaultStyle = {
  backgroundColor: '#3B5BDB',
  color: '#F1F3F5',

  height: 30,

  margin: 0,
  border: 'none',
  padding: 4,

  textAlign: 'center',
} as CSSProperties

const fullWidthStyle = {
  width: '100%',
} as CSSProperties

type Props = {
  text?: string,
  disabled?: boolean,
  fullWidth?: boolean,
  onClick?: MouseEventHandler,
}

const Button: FunctionComponent<Props> = ({
  text = 'button',
  disabled = false,
  fullWidth = false,
  onClick = (event: MouseEvent) => {
    event.preventDefault()
  },
}) => {
  let mergedStyle: CSSProperties = Object.assign({}, defaultStyle)

  if (fullWidth) {
    mergedStyle = Object.assign(mergedStyle, fullWidthStyle)
  }

  return (
    <button style={mergedStyle} disabled={disabled} onClick={onClick} >{text}</button>
  )
}

export default Button
