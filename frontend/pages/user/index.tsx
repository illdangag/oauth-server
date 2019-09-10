import { Component, } from 'react'
import styles from './styles.scss'

import Layout from '../../container/Layout'
import ItemList, { Item, } from '../../container/ItemList'

interface Props {

}

interface State {

}

class UserPage extends Component<Props, State> {

  render() {
    const items: Item[] = []
    items.push({
      id: 'id1',
      name: 'name1',
    })

    items.push({
      id: 'id2',
      name: 'name2',
    })

    return(
      <Layout title='USER | OAUTH' active='user'>
        <div className={styles.content}>
          <ItemList items={items}/>
        </div>
      </Layout>
    )
  }
}

export default UserPage
