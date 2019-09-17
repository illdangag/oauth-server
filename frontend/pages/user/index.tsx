import { Component, } from 'react'
import Router from 'next/router'

import { User, Token, } from '../../interfaces'
import { getLocalToken, refreshToken, setLocalToken, clearLocalToken, } from '../../utils/tokenAPI'
import { getUsers, } from '../../utils/userAPI'

import styles from './styles.scss'

import Layout from '../../container/Layout'
import ItemList, { ItemInfo, } from '../../container/ItemList'

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

  componentDidMount() {
    try {
      const token: Token = getLocalToken()
      this.setState({
        ...this.state,
        isLogin: true,
      })
      getUsers()
        .then(users => {
          this.setState({
            ...this.state,
            users: users,
          })
        })
        .catch(() => {
          refreshToken(token.refreshToken)
            .then(newToken => {
              setLocalToken(newToken)
              getUsers()
                .then(users => {
                  this.setState({
                    ...this.state,
                    users: users,
                  })
                })
            })
            .catch(() => {
              clearLocalToken()
              Router.push('/')
                .catch(() => {
                  // emply block
                })
            })
          
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
            <ItemList items={items}/>
          </div>
          </Layout>
        )}
      </>
    )
  }
}

export default UserPage
