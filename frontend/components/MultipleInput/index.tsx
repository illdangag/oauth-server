import React, { Component, KeyboardEvent, ChangeEvent, } from 'react'
import styles from './styles.scss'

import { List } from 'immutable'

interface MultipleInputChangeEventHandler {
  (event: MultipleInputChangeEvent): void,
}

export interface MultipleInputChangeEvent {
  values: string[],
}

interface Props {
  onChange?: MultipleInputChangeEventHandler,
}

interface State {
  inputValue: string,
  values: List<string>,
}

class MultipleInput extends Component<Props, State> {
  private input: HTMLInputElement | null

  constructor(props: Props) {
    super(props)
    this.state = {
      inputValue: '',
      values : List(),
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
      const { inputValue, values, } = this.state

      if (inputValue === '') {
        return
      }

      const addedInputValue = values.push(inputValue)

      this.setState({
        ...this.state,
        inputValue: '',
        values: addedInputValue,
      })

      if (this.input !== null) {
        this.input.value = ''
      }

      if (this.props.onChange !== undefined) {
        const results: string[] = []
        for (const value of addedInputValue) {
          results.push(value)
        }
        const result: MultipleInputChangeEvent = {
          values: results,
        }

        this.props.onChange(result)
      }
    }
  }

  render() {
    return (
      <div className={styles.background}>
        {this.state.values.map((value, key) => (<span className={styles.value} key={key}>{value}</span>))}
        <input
          className={styles.input}
          ref={input => { this.input = input}}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
        />
      </div>
    )
  }
}

export default MultipleInput
