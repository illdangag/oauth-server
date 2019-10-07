import { Component, } from 'react'
import styles from './index.scss'
import Router from 'next/router'

import Layout from '../../container/Layout'
import ItemList, { ItemInfo, ItemEditMouseEvent, ItemDeleteMouseEvent, } from '../../container/ItemList'
import Alert from '../../components/Alert'

import { Token, Client, } from '../../interfaces'
import { getLocalToken, refreshToken, setLocalToken, clearLocalToken, } from '../../utils/tokenAPI'
import { getClients, deleteClient, } from '../../utils/clientAPI'

interface Props {

}

interface State {
  clients: Client[],
  deleteClientIds: string[],
  isShowAlert: boolean,
  alertTitle: string,
  alertMessage: string,
}

class ClientPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      clients: [],
      deleteClientIds: [],
      isShowAlert: false,
      alertTitle: '',
      alertMessage: '',
    }
  }

  async componentDidMount() {
    await this.getClients()
  }

  async getClients() {
    try {
      const token: Token = getLocalToken()
      const clients: Client[] = await getClients(token)
      this.setState({
        ...this.state,
        clients,
      })
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const token: Token = getLocalToken()
          const newToken: Token = await refreshToken(token)
          setLocalToken(newToken)
          const clients: Client[] = await getClients(newToken)
          this.setState({
            ...this.state,
            clients,
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
    Router.push('/client/create')
      .catch(() => {
        // empty block
      })
  }

  onClickEdit = (event: ItemEditMouseEvent): void => {
    const clientId: string = event.item.id
    Router.push('/client/edit?clientid=' + clientId)
      .catch(() => {
        // empty block
      })
  }

  onClickDelete = (event: ItemDeleteMouseEvent): void => {
    const deleteClientIds: string[] = []
    for (const item of event.items) {
      deleteClientIds.push(item.id)
    }

    if (deleteClientIds.length === 0) {
      return
    }

    this.setState({
      ...this.state,
      deleteClientIds,
      isShowAlert: true,
      alertTitle: 'Delete Client?',
      alertMessage: deleteClientIds.join(', '),
    })
  }

  async deleteClients(deleteClientIds: string[]) {
    for (const username of deleteClientIds) {
      try {
        const token: Token = getLocalToken()
        await deleteClient(token, username)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const token: Token = getLocalToken()
          const newToken: Token = await refreshToken(token)
          setLocalToken(newToken)
          await deleteClient(newToken, username)
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
    const { deleteClientIds, } = this.state
    this.deleteClients(deleteClientIds)
      .then(() => {
        this.setState({
          ...this.state,
          isShowAlert: false,
        })
        this.getClients()
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

    for (let client of this.state.clients) {
      items.push({
        id: client.clientId,
        name: client.clientId,
      })
    }

    return(
      <Layout title='CLIENT | OAUTH' active='client'>
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
export default ClientPage
