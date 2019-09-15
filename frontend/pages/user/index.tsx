import { Component, } from 'react'
import Router from 'next/router'

import { getLocalToken, } from '../../utils/tokenAPI'

import styles from './styles.scss'

import Layout from '../../container/Layout'
import ItemList, { ItemInfo, } from '../../container/ItemList'

interface Props {

}

interface State {
  isLogin: boolean,
}

class UserPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isLogin: false,
    }
  }

  componentDidMount() {
    try {
      getLocalToken()
      this.setState({
        ...this.state,
        isLogin: true,
      })
    } catch {
      Router.push('/')
      .catch(() => {
        // emply block
      })
    }
  }

  render() {
    const items: ItemInfo[] = []
    items.push({
      id: 'id1',
      name: 'name1',
    })

    items.push({
      id: 'id2',
      name: 'NAME',
    })

    return(
      <>
        {this.state.isLogin && (
          <Layout title='USER | OAUTH' active='user'>
          <div className={styles.content}>
            <ItemList items={items}/>
          </div>
          </Layout>
        )}
      </>
    )
  }
}

export default UserPage
