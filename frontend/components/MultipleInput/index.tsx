import React, { Component, KeyboardEvent, ChangeEvent, MouseEvent, } from 'react'
import styles from './index.scss'

import { set, remove, } from 'immutable'

interface MultipleInputChangeEventHandler {
  (event: MultipleInputChangeEvent): void,
}

export interface MultipleInputChangeEvent {
  values: string[],
}

interface Props {
  values: string[],
  onChange?: MultipleInputChangeEventHandler,
}

interface State {
  inputValue: string,
}

class MultipleInput extends Component<Props, State> {
  private input: HTMLInputElement | null

  constructor(props: Props) {
    super(props)
    this.state = {
      inputValue: '',
    }
    this.input = null
  }

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      inputValue: event.target.value,
    })
  }

  onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const { inputValue, } = this.state
      const { values, } = this.props

      if (inputValue === '') {
        return
      }
      
      const addedValues: string[] = set(values, values.length, inputValue)

      this.setState({
        ...this.state,
        inputValue: '',
      })

      if (this.input !== null) {
        this.input.value = ''
      }

      this.callChangeEvent(addedValues)
    }
  }
  
  onClickDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const { values, } = this.props

    const deleteIndex: number = Number(event.currentTarget.dataset.index)
    const deletedValues: string[] = remove(values, deleteIndex)

    this.setState({
      ...this.state,
    })
    
    if (this.input !== null) {
      this.input.focus()
    }
    
    this.callChangeEvent(deletedValues)
  }

  callChangeEvent = (values: string[]) => {
    if (this.props.onChange !== undefined) {
      const result: MultipleInputChangeEvent = {
        values: values,
      }

      this.props.onChange(result)
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          ref={input => { this.input = input }}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
        />
        <div>
          {this.props.values.map((value, key) => (
            <span className={styles.value} key={key}>{value}
              <button className={styles.delete}
                onClick={this.onClickDelete}
                data-index={key}></button>
            </span>
          ))}
        </div>
      </div>
    )
  }
}

export default MultipleInput
