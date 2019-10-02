import { Component, } from 'react'
import Router from 'next/router'

import styles from './index.scss'
import Layout from '../../container/Layout'
import ItemList, { ItemInfo, ItemEditMouseEvent, } from '../../container/ItemList'

import { Token, Client, } from '../../interfaces'
import { getLocalToken, refreshToken, setLocalToken, clearLocalToken, } from '../../utils/tokenAPI'
import { getClients, } from '../../utils/clientAPI'

interface Props {

}

interface State {
  clients: Client[],
}

class ClientPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      clients: [],
    }
  }

  async componentDidMount() {
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

  onClickDelete = (): void => {
    // event: ItemDeleteMouseEvent
    // empty block
  }

  onClickEdit = (event: ItemEditMouseEvent): void => {
    const clientId: string = event.item.id
    Router.push('/client/edit?clientid=' + clientId)
      .catch(() => {
        // empty block
      })
  }

  render() {
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
      </Layout>
    )
  }
}
export default ClientPage
