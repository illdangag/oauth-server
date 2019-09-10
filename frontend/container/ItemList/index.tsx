import { Component, } from 'react'

import styles from './styles.scss'

import Input from '../../components/Input'
import PlusIcon from '../../components/Icon/PlusIcon'
import TrashIcon from '../../components/Icon/TrashIcon'

export interface Item {
  id: string,
  name: string,
}

interface Props {
  items?: Item[],
}

interface State {

}

class ItemList extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return(
      <div>
        <div className={styles.header}>
          <div className={styles.find}>
            <Input icon='find' fullWidth={true}/>
          </div>
          <span className={styles.icons}>
            <button className={styles.iconButton}>
              <PlusIcon size='small'/>
            </button>
            <button className={styles.iconButton}>
              <TrashIcon size='small'/>
            </button>
          </span>
        </div>
      </div>
    )
  }
}

export default ItemList
