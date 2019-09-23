import { Component, } from 'react'
import Router from 'next/router'

import { User, Token, } from '../../interfaces'
import { checkToken, refreshToken, setLocalToken, getLocalToken, clearLocalToken, } from '../../utils/tokenAPI'
import { getUsers, } from '../../utils/userAPI'

import styles from './styles.scss'

import Layout from '../../container/Layout'
import ItemList, { ItemInfo, ItemDeleteMouseEvent, } from '../../container/ItemList'

interface Props {

}

interface State {
  isLogin: boolean,
  users: User[],
}

class UserPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isLogin: false,
      users: [],
    }
  }

  async componentDidMount() {
    try {
      const token: Token = getLocalToken()
      await checkToken(token)
      const users: User[] = await getUsers()
      this.setState({
        ...this.state,
        isLogin: true,
        users: users,
      })
    } catch {
      try {
        const token: Token = getLocalToken()
        const newToken: Token = await refreshToken(token)
        setLocalToken(newToken)
  
        const users: User[] = await getUsers()
        this.setState({
          ...this.state,
          isLogin: true,
          users: users,
        })
      } catch {
        clearLocalToken()
        Router.push('/')
          .catch(() => {
            // emply block
          })
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
      <>
        {this.state.isLogin && (
          <Layout title='USER | OAUTH' active='user'>
            <div className={styles.content}>
              <ItemList items={items} onClickCreate={this.onClickCreate} onClickDelete={this.onClickDelete}/>
            </div>
          </Layout>
        )}
      </>
    )
  }
}

export default UserPage
