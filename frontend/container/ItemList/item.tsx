import { FunctionComponent, ChangeEventHandler, MouseEventHandler, } from 'react'
import styles from './item.scss'

import Checkbox from '../../components/Checkbox'
import { FaEdit, } from 'react-icons/fa'

type Props = {
  id: string,
  name: string,
  checked?: boolean,
  onChange?: ChangeEventHandler,
  onClickEdit?: MouseEventHandler,
}

const Item: FunctionComponent<Props> = ({
  id,
  name,
  checked = false,
  onChange = () => {
    // empty block
  },
  onClickEdit = () => {
    // empty block
  },
}) => {
  return (
    <div className={styles.item}>
      <span className={styles.checkbox}>
        <Checkbox id={id + '-check'} checked={checked} onChange={onChange}/>
      </span>
      {name}
      <span className={styles.edit} onClick={onClickEdit}>
        <FaEdit/>
      </span>
    </div>
  )
}

export default Item
