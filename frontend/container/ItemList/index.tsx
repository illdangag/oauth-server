import { Component, ChangeEvent, } from 'react'

import styles from './index.scss'

import Input from '../../components/Input'
import Checkbox from '../../components/Checkbox'
import Item from './item'


import PlusIcon from '../../components/Icon/PlusIcon'
import TrashIcon from '../../components/Icon/TrashIcon'

import { set, } from 'immutable'

export interface ItemInfo {
  id: string,
  name: string,
}

interface Props {
  items?: ItemInfo[],
}

interface State {
  checkedItems: boolean[],
  allChecked: boolean,
}

class ItemList extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { items, } = this.props
    const checkedItems: boolean[] = []
    if (items !== undefined) {
      for (let index = 0; index < items.length; index++) {
        checkedItems.push(false)
      }
    }

    this.state = {
      checkedItems: checkedItems,
      allChecked: false,
    }
  }

  onChangeAllItemCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const { items, } = this.props
    const allChecked = event.target.checked
    const checkedItems: boolean[] = []

    if (items !== undefined) {
      for (let index = 0; index < items.length; index++) {
        checkedItems.push(allChecked)
      }
    }
    this.setState({
      ...this.state,
      checkedItems,
      allChecked,
    })
  }

  onChangeItemCheckbox = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const { checkedItems, } = this.state
    const updatedCheckedItems = set(checkedItems, index, event.target.checked)

    const allChecked: boolean = updatedCheckedItems.reduce((previous, current) => {
      return previous && current
    }, true)

    this.setState({
      ...this.state,
      checkedItems: updatedCheckedItems,
      allChecked,
    })
  }

  render() {
    const { items, } = this.props
    const { allChecked, checkedItems, } = this.state

    return(
      <div className={styles.warpper}>
        <div className={styles.header}>
          <div className={styles.find}>
            <Input icon='find' fullWidth={true}/>
          </div>
          <span className={styles.checkAll}>
            <Checkbox id='checkAll' checked={allChecked} onChange={this.onChangeAllItemCheckbox}/>
          </span>
          <span className={styles.icons}>
            <button className={styles.iconButton}>
              <PlusIcon size='small'/>
            </button>
            <button className={styles.iconButton}>
              <TrashIcon size='small'/>
            </button>
          </span>
        </div>
        <div>
          {items && items.map((value, key) => (
            <div key={key}>
              <Item
                id={value.id}
                name={value.name}
                checked={checkedItems[key]}
                onChange={(event: ChangeEvent<HTMLInputElement>) => (this.onChangeItemCheckbox(event, key))}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default ItemList
