import { Component, } from 'react'
import Router from 'next/router'

import { User, Token, } from '../../interfaces'
import { getLocalToken, refreshToken, setLocalToken, clearLocalToken, } from '../../utils/tokenAPI'
import { getUsers, } from '../../utils/userAPI'

import styles from './styles.scss'

import Layout from '../../container/Layout'
import ItemList, { ItemInfo, ItemDeleteMouseEvent, } from '../../container/ItemList'

interface Props {

}

interface State {
  users: User[],
}

class UserPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      users: [],
    }
  }

  async componentDidMount() {
    try {
      const token: Token = getLocalToken()
      const users: User[] = await getUsers(token)
      this.setState({
        ...this.state,
        users: users,
      })
    } catch (error) {
      if (error.response.status === 401) {
        const token: Token = getLocalToken()
        const newToken: Token = await refreshToken(token)
        setLocalToken(newToken)

        try {
          const users: User[] = await getUsers(newToken)
          this.setState({
            ...this.state,
            users,
          })
        } catch {
          clearLocalToken()
          await Router.push('/')
        }
      } else {
        clearLocalToken()
        await Router.push('/')
      }
    }
  }

  onClickCreate = () => {
    Router.push('/user/create')
      .catch(() => {
        // empty block
      })
  }

  onClickDelete = (event: ItemDeleteMouseEvent): void => {
    console.log(event)
  }

  render() {
    const items: ItemInfo[] = []
    
    for (let user of this.state.users) {
      items.push({
        id: user.username,
        name: user.username,
      })
    }
    
    return(
      <Layout title='USER | OAUTH' active='user'>
        <div className={styles.content}>
          <ItemList items={items} onClickCreate={this.onClickCreate} onClickDelete={this.onClickDelete}/>
        </div>
      </Layout>
    )
  }
}

export default UserPage
