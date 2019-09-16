import { Component, ChangeEvent, } from 'react'

import styles from './index.scss'

import Input from '../../components/Input'
import Checkbox from '../../components/Checkbox'
import Item from './item'

import PlusIcon from '../../components/Icon/PlusIcon'
import TrashIcon from '../../components/Icon/TrashIcon'

export interface ItemInfo {
  id: string,
  name: string,
}

interface Props {
  items?: ItemInfo[],
}

interface State {

}

class ItemList extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  onChangeAllItemCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event)
  }

  onChangeItemCheckbox = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    console.log(event)
    console.log(index)
  }

  render() {
    const { items, } = this.props

    return(
      <div className={styles.warpper}>
        <div className={styles.header}>
          <div className={styles.find}>
            <Input icon='find' fullWidth={true}/>
          </div>
          <span className={styles.checkAll}>
            <Checkbox id='checkAll' onChange={this.onChangeAllItemCheckbox}/>
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
