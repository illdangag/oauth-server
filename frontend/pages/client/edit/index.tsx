import { Component, ChangeEvent, } from 'react'
import { NextPageContext, } from 'next'
import Router from 'next/router'
import Link from 'next/link'
import styles from '../client.scss'

import Layout from '../../../container/Layout'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Switch from '../../../components/Switch'
import Alert from '../../../components/Alert'
import MultipleInput, { MultipleInputChangeEvent, } from '../../../components/MultipleInput'

import { FaAngleLeft, } from 'react-icons/fa'
import { Token, Client, } from '../../../interfaces'
import { getLocalToken, refreshToken, setLocalToken, clearLocalToken, } from '../../../utils/tokenAPI'
import { getClient, updateClient, } from '../../../utils/clientAPI'

interface Props {
  clientId: string,
}

interface State {
  clientSecret: string,
  resourceIds: string[],
  scope: string[],
  grantTypes: string[],
  redirectUri: string[],
  authorities: string[],
  accessTokenValiditySeconds: number,
  refreshTokenValiditySeconds: number,
  autoApprove: boolean,
  saveDisabled: boolean,
  isClientSecertEdit: boolean,
  errorTitle: string,
  errorMessage: string,
  isShowErrorAlert: boolean,
}

class ClientUpdate extends Component<Props, State> {
  static getInitialProps({ query, }: NextPageContext) {
    return { clientId: query.clientid, }
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      clientSecret: '',
      resourceIds: [],
      scope: [],
      grantTypes: [],
      redirectUri: [],
      authorities: [],
      accessTokenValiditySeconds: 0,
      refreshTokenValiditySeconds: 0,
      autoApprove: true,
      saveDisabled: false,
      isClientSecertEdit: false,
      errorTitle: '',
      errorMessage: '',
      isShowErrorAlert: false,
    }
  }

  async componentDidMount() {
    const { clientId, } = this.props
    try {
      const token: Token = getLocalToken()
      await this.getClientInfo(token, clientId)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const token: Token = getLocalToken()
        const newToken: Token = await refreshToken(token)
        setLocalToken(newToken)

        try {
          await this.getClientInfo(newToken, clientId)
        } catch {
          clearLocalToken()
          await Router.push('/')
        }
      } else if (error.response && error.response.status === 404) {
        await Router.push('/client')
      } else {
        clearLocalToken()
        await Router.push('/')
      }
    }
  }

  async getClientInfo(token: Token, clientId: string): Promise<void> {
    const client: Client = await getClient(token, clientId)
    this.setState({
      ...this.state,
      resourceIds: client.resourceIds,
      scope: client.scope,
      grantTypes: client.grantTypes,
      redirectUri: client.redirectUri,
      authorities: client.authorities,
      accessTokenValiditySeconds: client.accessTokenValiditySeconds,
      refreshTokenValiditySeconds: client.refreshTokenValiditySeconds,
      autoApprove: client.autoApprove,
    })
  }

  onChangeClientSecret = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    this.setState({
      ...this.state,
      clientSecret: value,
    })
  }

  onChangeResourceIds = (event: MultipleInputChangeEvent) => {
    this.setState({
      ...this.state,
      resourceIds: event.values,
    })
  }
  
  onChangeScope = (event: MultipleInputChangeEvent) => {
    this.setState({
      ...this.state,
      scope: event.values,
    })
  }

  onChangeGrantTypes = (event: MultipleInputChangeEvent) => {
    this.setState({
      ...this.state,
      grantTypes: event.values,
    })
  }

  onChangeRedirectUri = (event: MultipleInputChangeEvent) => {
    this.setState({
      ...this.state,
      redirectUri: event.values,
    })
  }

  onChangeAuthorities = (event: MultipleInputChangeEvent) => {
    this.setState({
      ...this.state,
      authorities: event.values,
    })
  }

  onChangeAccessTokenValiditySeconds = (event: ChangeEvent<HTMLInputElement>) => {
    const accessTokenValiditySeconds = Number(event.target.value)
    this.setState({
      ...this.state,
      accessTokenValiditySeconds,
    })
  }

  onChangeRefreshTokenValiditySeconds = (event: ChangeEvent<HTMLInputElement>) => {
    const refreshTokenValiditySeconds = Number(event.target.value)
    this.setState({
      ...this.state,
      refreshTokenValiditySeconds,
    })
  }

  onChangeAutoApprove = (event: ChangeEvent<HTMLInputElement>) => {
    const autoApprove = event.target.checked
    this.setState({
      ...this.state,
      autoApprove,
    })
  }

  onClickClientSecretEdit = () => {
    this.setState({
      ...this.state,
      isClientSecertEdit: true,
    })
  }

  onClickSave = () => {
    const { clientId, } = this.props
    const { clientSecret, resourceIds, scope, grantTypes, redirectUri, authorities,
      accessTokenValiditySeconds, refreshTokenValiditySeconds, autoApprove,
      isClientSecertEdit, } = this.state
    
    this.setState({
      ...this.state,
      saveDisabled: true,
    })

    const client: Client = {
      clientId,
      resourceIds,
      scope,
      grantTypes,
      redirectUri,
      authorities,
      accessTokenValiditySeconds,
      refreshTokenValiditySeconds,
      autoApprove,
    }

    if (isClientSecertEdit) {
      client.clientSecret = clientSecret
    }

    try {
      const token: Token = getLocalToken()
      updateClient(token, client)
        .then(() => {
          Router.push('/client')
          .catch(() => {
            //
          })
        })
        .catch((error) => {
          const statusCode: number = error.response ? error.response.status : -1
          if (statusCode === 404) { // not found
            this.setState({
              ...this.state,
              errorTitle: 'Not Found Client',
              errorMessage: 'Client id is not exist.',
              isShowErrorAlert: true,
            })
          } else { // Unknown
            this.setState({
              ...this.state,
              errorTitle: 'Unknown Error',
              errorMessage: 'An unknown error has occurred.',
              isShowErrorAlert: true,
            })
          }
        })
    } catch {
      clearLocalToken()
      Router.push('/')
        .catch(() => {
          //
        })
    }
  }

  onClickErrorAlertClose = (): void => {
    this.setState({
      ...this.state,
      isShowErrorAlert: false,
    })
    Router.push('/client')
      .catch(() => {
        // empty block
      })
  }

  render() {
    const { clientId, } = this.props
    const { clientSecret, resourceIds, scope, grantTypes, redirectUri, authorities,
      accessTokenValiditySeconds, refreshTokenValiditySeconds, autoApprove, 
      saveDisabled, isClientSecertEdit, errorTitle, errorMessage, isShowErrorAlert, } = this.state

    return(
      <Layout title='CLIENT EDIT | OAUTH' active='client'>
        <div className={styles.client}>
          <div className={styles.header}>
            <span className={styles.back}>
              <Link href='/client'>
                <a><FaAngleLeft/></a>
              </Link>
            </span>
            <span>{clientId}</span>
            <span className={styles.save}>
              <Button
                onClick={this.onClickSave}
                disabled={(isClientSecertEdit && clientSecret.length === 0) || saveDisabled}>
                  SAVE
              </Button>
            </span>
          </div>
          <div className={styles.items}>
            <div className={styles.item}>
              <p className={styles.title}>Client secret</p>
              <p className={styles.discription}>discription</p>
              <div className={styles.content}>
                <div className={styles.input}>
                  <span className={styles.clientSecret}>
                    <Input fullWidth={true} icon='lock' value={clientSecret} onChange={this.onChangeClientSecret} disabled={!isClientSecertEdit}/>
                  </span>
                  <span className={styles.edit}>
                    <Button fullWidth={true} onClick={this.onClickClientSecretEdit} disabled={isClientSecertEdit}>EDIT</Button>
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <p className={styles.title}>Resource id</p>
              <p className={styles.discription}>discription</p>
              <div className={styles.content}>
                <div className={styles.input}>
                  <MultipleInput values={resourceIds} fullWidth={true} onChange={this.onChangeResourceIds}/>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <p className={styles.title}>Scope</p>
              <p className={styles.discription}>discription</p>
              <div className={styles.content}>
                <div className={styles.input}>
                  <MultipleInput values={scope} fullWidth={true} onChange={this.onChangeScope}/>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <p className={styles.title}>Grant types</p>
              <p className={styles.discription}>discription</p>
              <div className={styles.content}>
                <div className={styles.input}>
                  <MultipleInput values={grantTypes} fullWidth={true} onChange={this.onChangeGrantTypes}/>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <p className={styles.title}>Redirect URI</p>
              <p className={styles.discription}>discription</p>
              <div className={styles.content}>
                <div className={styles.input}>
                  <MultipleInput values={redirectUri} fullWidth={true} onChange={this.onChangeRedirectUri}/>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <p className={styles.title}>Authorities</p>
              <p className={styles.discription}>discription</p>
              <div className={styles.content}>
                <div className={styles.input}>
                  <MultipleInput values={authorities} fullWidth={true} onChange={this.onChangeAuthorities}/>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <p className={styles.title}>Access token validity seconds</p>
              <p className={styles.discription}>discription</p>
              <div className={styles.content}>
                <p className={styles.input}>
                  <Input fullWidth={true} type='number' icon='clock'
                    value={accessTokenValiditySeconds} onChange={this.onChangeAccessTokenValiditySeconds}/>
                </p>
              </div>
            </div>
            <div className={styles.item}>
              <p className={styles.title}>Refresh token validity seconds</p>
              <p className={styles.discription}>discription</p>
              <div className={styles.content}>
                <p className={styles.input}>
                  <Input fullWidth={true} type='number' icon='clock'
                    value={refreshTokenValiditySeconds} onChange={this.onChangeRefreshTokenValiditySeconds}/>
                </p>
              </div>
            </div>
            <div className={styles.item}>
              <p className={styles.title}>Auto approve</p>
              <p className={styles.discription}>discription</p>
              <div className={styles.content}>
                <p className={styles.input}>
                  <Switch id='credentialsNonLocked' checked={autoApprove} onChange={this.onChangeAutoApprove}/>
                </p>
              </div>
            </div>
          </div>
        </div>
        {isShowErrorAlert && 
          <Alert title={errorTitle} message={errorMessage} buttons={[{
            text: 'CLOSE',
            onClick: this.onClickErrorAlertClose,
          },]}/>
        }
      </Layout>
    )
  }

}

export default ClientUpdate
