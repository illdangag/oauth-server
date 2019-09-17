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
  items: ItemInfo[],
}

interface State {
  items: ItemInfo[],
  checkedItems: boolean[],
  checkedAll: boolean,
}

class ItemList extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      items: [],
      checkedItems: [],
      checkedAll: false,
    }
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const checkedItems: boolean[] = []
    
    if (nextProps.items !== prevState.items) {
      for (let index = 0; index < nextProps.items.length; index++) {
        checkedItems.push(false)
      }

      return {
        ...prevState,
        items: nextProps.items,
        checkedItems,
        checkedAll: false,
      }
    } else {
      return null
    }
  }

  onChangeAllItemCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const { checkedItems, } = this.state
    const checkedAll: boolean = event.target.checked

    const updatedCheckedItems = checkedItems.map(() => {
      return checkedAll
    })

    this.setState({
      ...this.state,
      checkedItems: updatedCheckedItems,
      checkedAll,
    })
  }

  onChangeItemCheckbox = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const { checkedItems, } = this.state
    const updatedCheckedItems = set(checkedItems, index, event.target.checked)

    const checkedAll: boolean = updatedCheckedItems.reduce((previous, current) => {
      return previous && current
    }, true)


    this.setState({
      checkedItems: updatedCheckedItems,
      checkedAll,
    })
  }

  render() {
    const { items, checkedItems, checkedAll, } = this.state

    return(
      <div className={styles.warpper}>
        <div className={styles.header}>
          <div className={styles.find}>
            <Input icon='find' fullWidth={true}/>
          </div>
          <span className={styles.checkAll}>
            <Checkbox id='checkAll' checked={checkedAll} onChange={this.onChangeAllItemCheckbox}/>
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
