import { Component, ChangeEvent, } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import styles from '../client.scss'

import Layout from '../../../container/Layout'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Switch from '../../../components/Switch'
import MultipleInput, { MultipleInputChangeEvent, } from '../../../components/MultipleInput'
import Alert from '../../../components/Alert'
import { FaAngleLeft, } from 'react-icons/fa'

import { Token, Client, } from '../../../interfaces'
import { getLocalToken, checkToken, refreshToken, setLocalToken, clearLocalToken, } from '../../../utils/tokenAPI'
import { createClient, } from '../../../utils/clientAPI'

interface Props {

}

interface State {
  clientId: string,
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
  errorTitle: string,
  errorMessage: string,
  isShowErrorAlert: boolean,
}

class ClientCreate extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      clientId: '',
      clientSecret: '',
      resourceIds: [],
      scope: [],
      grantTypes: [],
      redirectUri: [],
      authorities: [],
      accessTokenValiditySeconds: 3600,
      refreshTokenValiditySeconds: 86400,
      autoApprove: true,
      saveDisabled: true,
      errorTitle: '',
      errorMessage: '',
      isShowErrorAlert: false,
    }
  }

  async componentDidMount() {
    try {
      const token: Token = getLocalToken()
      await checkToken(token)
    } catch {
      try {
        const token: Token = getLocalToken()
        const newToken: Token = await refreshToken(token)
        setLocalToken(newToken)
      } catch {
        clearLocalToken()
        await Router.push('/')
      }
    }
  }

  onChangeClientId = (event: ChangeEvent<HTMLInputElement>) => {
    const { clientSecret, } = this.state
    const value = event.target.value
    const saveDisabled: boolean = (value.length === 0) || (clientSecret.length === 0)
    this.setState({
      ...this.state,
      clientId: value,
      saveDisabled,
    })
  }

  onChangeClientSecret = (event: ChangeEvent<HTMLInputElement>) => {
    const { clientId, } = this.state
    const value = event.target.value
    const saveDisabled: boolean = (value.length === 0) || (clientId.length === 0)
    this.setState({
      ...this.state,
      clientSecret: value,
      saveDisabled,
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

  onClickSave = () => {
    const { clientId, clientSecret, resourceIds, scope, grantTypes, redirectUri, authorities,
      accessTokenValiditySeconds, refreshTokenValiditySeconds, autoApprove, } = this.state
    
    this.setState({
      ...this.state,
      saveDisabled: true,
    })

    const client: Client = {
      clientId,
      clientSecret,
      resourceIds,
      scope,
      grantTypes,
      redirectUri,
      authorities,
      accessTokenValiditySeconds,
      refreshTokenValiditySeconds,
      autoApprove,
    }

    try {
      const token: Token = getLocalToken()
      createClient(token, client)
        .then(() => {
          Router.push('/client')
            .catch(() => {
              //
            })
        })
        .catch((error) => {
          const statusCode: number = error.response ? error.response.status : -1
          if (statusCode === 409) {
            this.setState({
              ...this.state,
              errorTitle: 'Duplicate client',
              errorMessage: 'Client id is a duplicate.',
              isShowErrorAlert: true,
            })
          } else {
            this.setState({
              ...this.state,
              errorTitle: 'Unknown Error',
              errorMessage: 'An unknown error has occurred.',
              isShowErrorAlert: true,
            })
          }
        })
    } catch {
      // local token error
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
  }

  render() {
    const { clientId, clientSecret, resourceIds, scope, grantTypes, redirectUri, authorities,
      accessTokenValiditySeconds, refreshTokenValiditySeconds, autoApprove,
      saveDisabled, errorTitle, errorMessage, isShowErrorAlert, } = this.state

    return(
      <Layout title='CLIENT CREATE | OAUTH' active='client'>
        <div className={styles.client}>
          <div className={styles.header}>
            <span className={styles.back}>
              <Link href='/client'>
                <a><FaAngleLeft/></a>
              </Link>
            </span>
            <span className={styles.save}><Button disabled={saveDisabled} onClick={this.onClickSave}>SAVE</Button></span>
          </div>
          <div className={styles.items}>
            <div className={styles.item}>
              <p className={styles.title}>Client id</p>
              <p className={styles.discription}>discription</p>
              <div className={styles.content}>
                <p className={styles.input}>
                  <Input fullWidth={true} icon='userAuth' value={clientId} onChange={this.onChangeClientId}/>
                </p>
              </div>
            </div>
            <div className={styles.item}>
              <p className={styles.title}>Client secret</p>
              <p className={styles.discription}>discription</p>
              <div className={styles.content}>
                <div className={styles.input}>
                  <Input fullWidth={true} icon='lock' value={clientSecret} onChange={this.onChangeClientSecret}/>
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

export default ClientCreate
