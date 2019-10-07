import { Component, } from 'react'
import Router from 'next/router'

import { User, Token, } from '../../interfaces'
import { getLocalToken, refreshToken, setLocalToken, clearLocalToken, } from '../../utils/tokenAPI'
import { getUsers, deleteUser, } from '../../utils/userAPI'

import styles from './index.scss'

import Layout from '../../container/Layout'
import ItemList, { ItemInfo, ItemEditMouseEvent, ItemDeleteMouseEvent, } from '../../container/ItemList'
import Alert from '../../components/Alert'

interface Props {

}

interface State {
  users: User[],
  deleteUsernames: string[],
  isShowAlert: boolean,
  alertTitle: string,
  alertMessage: string,
}

class UserPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      users: [],
      deleteUsernames: [],
      isShowAlert: false,
      alertTitle: '',
      alertMessage: '',
    }
  }

  async componentDidMount() {
    await this.getUsers()
  }

  async getUsers() {
    try {
      const token: Token = getLocalToken()
      const users: User[] = await getUsers(token)
      this.setState({
        ...this.state,
        users: users,
      })
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const token: Token = getLocalToken()
          const newToken: Token = await refreshToken(token)
          setLocalToken(newToken)
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

  onClickEdit = (event: ItemEditMouseEvent): void => {
    const username: string = event.item.id
    Router.push('/user/edit?username=' + username)
      .catch(() => {
        // empty block
      })
  }

  onClickDelete = (event: ItemDeleteMouseEvent): void => {
    const deleteUsernames: string[] = []
    for (const item of event.items) {
      deleteUsernames.push(item.id)
    }

    if (deleteUsernames.length === 0) {
      return
    }

    this.setState({
      ...this.state,
      deleteUsernames,
      isShowAlert: true,
      alertTitle: 'Delete User?',
      alertMessage: deleteUsernames.join(', '),
    })
  }

  async deleteUsers(deleteUsernames: string[]) {
    for (const username of deleteUsernames) {
      try {
        const token: Token = getLocalToken()
        await deleteUser(token, username)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const token: Token = getLocalToken()
          const newToken: Token = await refreshToken(token)
          setLocalToken(newToken)
          await deleteUser(newToken, username)
        } else if (error.response && error.response.status === 404) {
          continue
        } else {
          clearLocalToken()
          await Router.push('/')
        }
      }
    }
  }

  onClickAlertOK = () => {
    const { deleteUsernames, } = this.state
    this.deleteUsers(deleteUsernames)
      .then(() => {
        this.setState({
          ...this.state,
          isShowAlert: false,
        })
        this.getUsers()
          .catch(() => {
            //
          })
      })
      .catch(() => {
        //
      })
  }

  onClickAlertCancle = () => {
    this.setState({
      ...this.state,
      isShowAlert: false,
    })
  }

  render() {
    const { isShowAlert, alertTitle, alertMessage, } = this.state
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
          <ItemList items={items} onClickCreate={this.onClickCreate} onClickDelete={this.onClickDelete} onClickEdit={this.onClickEdit}/>
        </div>
        {isShowAlert && 
          <Alert title={alertTitle} message={alertMessage} buttons={[{
            text: 'CANCLE',
            onClick: this.onClickAlertCancle,
          },{
            text: 'OK',
            onClick: this.onClickAlertOK,
          },]}/>}
      </Layout>
    )
  }
}

export default UserPage
