import { Component, ChangeEvent, MouseEventHandler, } from 'react'

import styles from './index.scss'

import Input from '../../components/Input'
import Checkbox from '../../components/Checkbox'
import Item from './item'

import PlusIcon from '../../components/Icon/PlusIcon'
import TrashIcon from '../../components/Icon/TrashIcon'

export interface ItemInfo {
  id: string,
  name: string,
  checked?: boolean,
}

interface ItemDeleteMouseEventHandler {
  (event: ItemDeleteMouseEvent): void,
}

export interface ItemDeleteMouseEvent {
  items: ItemInfo[],
}

interface Props {
  items: ItemInfo[],
  onClickCreate?: MouseEventHandler,
  onClickDelete?: ItemDeleteMouseEventHandler,
}

interface State {
  items: ItemInfo[],
  sortedItems: ItemInfo[],
  checkedAll: boolean,
  searchKeyword: string,
}

class ItemList extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      items: [],
      sortedItems: [],
      checkedAll: false,
      searchKeyword: '',
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
        sortedItems: ItemList.sortItems(nextProps.items, prevState.searchKeyword),
        checkedItems,
        checkedAll: prevState.checkedAll,
      }
    } else {
      return null
    }
  }

  onChangeAllItemCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const { items, searchKeyword, } = this.state
    const checked = event.target.checked

    const updateItems: ItemInfo[] = items.map((value) => {
      value.checked = checked
      return value
    })
    const updateSortedItems: ItemInfo[] = ItemList.sortItems(updateItems, searchKeyword)
    
    this.setState({
      ...this.state,
      items: updateItems,
      sortedItems: updateSortedItems,
      checkedAll: checked,
    })
  }

  onChangeItemCheckbox = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const { sortedItems, items, } = this.state
    const selectedId: string = sortedItems[index].id
    sortedItems[index].checked = true

    const updateItems: ItemInfo[] = items.map((value) => {
      if (value.id === selectedId) {
        value.checked = event.target.checked
      }
      return value
    })

    const checkedAll: boolean = !sortedItems.some((value) => (
      !value.checked
    ))

    this.setState({
      ...this.state,
      items: updateItems,
      sortedItems,
      checkedAll,
    })
  }
  
  onChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    const { items, } = this.state
    const searchKeyword: string = event.target.value
    const updateItems: ItemInfo[] = items.map((value) => {
      value.checked = false
      return value
    })
    const sortedItems: ItemInfo[] = ItemList.sortItems(updateItems, searchKeyword)
    this.setState({
      ...this.state,
      items: updateItems,
      sortedItems,
      searchKeyword,
      checkedAll: false,
    })
  }

  onClickDelete = (): void => {
    const { sortedItems, } = this.state
    
    if (this.props.onClickDelete) {
      const checkedItems: ItemInfo[] = sortedItems.filter((value) => (value.checked))
      this.props.onClickDelete({
        items: checkedItems,
      })
    }
  }

  private static sortItems(items: ItemInfo[], searchKeyword: string): ItemInfo[] {
    return items.filter((value) => (searchKeyword === '' || value.name.toLowerCase().indexOf(searchKeyword) > -1))
    .sort((a, b) => (a.name < b.name ? -1 : 1))
  }

  render() {
    const { onClickCreate, } = this.props
    const { sortedItems, checkedAll, searchKeyword, } = this.state

    return(
      <div className={styles.warpper}>
        <div className={styles.header}>
          <div className={styles.find}>
            <Input icon='find' fullWidth={true} value={searchKeyword} onChange={this.onChangeSearch}/>
          </div>
          <span className={styles.checkAll}>
            <Checkbox id='checkAll' checked={checkedAll} onChange={this.onChangeAllItemCheckbox}/>
          </span>
          <span className={styles.icons}>
            <button className={styles.iconButton} onClick={onClickCreate}>
              <PlusIcon size='small'/>
            </button>
            <button className={styles.iconButton} onClick={this.onClickDelete}>
              <TrashIcon size='small'/>
            </button>
          </span>
        </div>
        <div>
          {sortedItems && sortedItems.map((value, key) => (
            <div key={key}>
              <Item
                id={value.id}
                name={value.name}
                checked={value.checked}
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
