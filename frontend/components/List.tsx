import * as React from 'react'
import ListItem from './ListItem'
import { UserSample, } from '../interfaces'

type Props = {
  items: UserSample[],
}

const List: React.FunctionComponent<Props> = ({ items, }) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
)

export default List
