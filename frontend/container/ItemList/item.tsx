import { FunctionComponent, ChangeEventHandler, } from 'react'
import styles from './item.scss'

import Link from 'next/link'

import Checkbox from '../../components/Checkbox'
import EditIcon from '../../components/Icon/EditIcon'

type Props = {
  id: string,
  name: string,
  checked?: boolean,
  onChange?: ChangeEventHandler,
}

const Item: FunctionComponent<Props> = ({
  id,
  name,
  checked = false,
  onChange = () => {
    // emply block
  },
}) => {
  return (
    <div className={styles.item}>
      <span className={styles.checkbox}>
        <Checkbox id={id + '-check'} checked={checked} onChange={onChange}/>
      </span>
      {name}
      <span className={styles.edit}>
        <Link href='/sample'>
          <a><EditIcon size='small'/></a>
        </Link>
      </span>
      </div>
  )
}

export default Item
