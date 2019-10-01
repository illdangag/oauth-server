import { Component, ChangeEvent, } from 'react'
import { NextPageContext, } from 'next'
import Router from 'next/router'
import Link from 'next/link'
import styles from './styles.scss'

import Layout from '../../../container/Layout'
import Button from '../../../components/Button'
import Switch from '../../../components/Switch'
import Alert from '../../../components/Alert'
import { FaAngleLeft, } from 'react-icons/fa'

import { Token, User, } from '../../../interfaces'
import { getLocalToken, refreshToken, setLocalToken, clearLocalToken, } from '../../../utils/tokenAPI'
import { getUser, updateUser, } from '../../../utils/userAPI'

interface Props {
  username: string,
}

interface State {
  username: string,
  enabled: boolean,
  accountNonExpired: boolean,
  accountNonLocked: boolean,
  credentialsNonExpired: boolean,
  saveDisabled: boolean,
  isShowErrorAlert: boolean,
  errorTitle: string,
  errorMessage: string,
}

class UserUpdate extends Component<Props, State> {
  static getInitialProps({ query, }: NextPageContext) {
    return { username: query.username, }
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      username: '',
      enabled: false,
      accountNonExpired: false,
      accountNonLocked: false,
      credentialsNonExpired: false,
      saveDisabled: false,
      isShowErrorAlert: false,
      errorTitle: '',
      errorMessage: '',
    }
  }

  async componentDidMount() {
    const { username, } = this.props
    try {
      const token: Token = getLocalToken()
      await this.getUserInfo(token, username)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const token: Token = getLocalToken()
        const newToken: Token = await refreshToken(token)
        setLocalToken(newToken)

        try {
          await this.getUserInfo(newToken, username)
        } catch {
          // TODO: 토큰 오류인지 사용자가 없는 오류인지 구분하여 처리
          clearLocalToken()
          await Router.push('/')
        }
      } else if (error.response && error.response.status === 404) {
        Router.push('/user')
          .catch(() => {
            // empty block
          })
      } else {
        clearLocalToken()
        await Router.push('/')
      }
    }
  }

  async getUserInfo(token: Token, username: string): Promise<void> {
    const user: User = await getUser(token, username)
    this.setState({
      username: user.username,
      enabled: user.enabled,
      accountNonExpired: user.accountNonExpired,
      accountNonLocked: user.accountNonLocked,
      credentialsNonExpired: user.credentialsNonExpired,
    })
  }

  onChangeUsername = (event: ChangeEvent<HTMLInputElement>): void => {
    let value: string = event.target.value
    this.setState({
      ...this.state,
      username: value,
    })
  }

  onChangeEabled = (event: ChangeEvent<HTMLInputElement>): void => {
    let checked: boolean = event.target.checked
    this.setState({
      ...this.state,
      enabled: checked,
    })
  }

  onChangeAccountNonExpired = (event: ChangeEvent<HTMLInputElement>): void => {
    let checked: boolean = event.target.checked
    this.setState({
      ...this.state,
      accountNonExpired: checked,
    })
  }

  onChangeAccountNonLocked = (event: ChangeEvent<HTMLInputElement>): void => {
    let checked: boolean = event.target.checked
    this.setState({
      ...this.state,
      accountNonLocked: checked,
    })
  }

  onChangeCredentialsNonExpired = (event: ChangeEvent<HTMLInputElement>): void => {
    let checked: boolean = event.target.checked
    this.setState({
      ...this.state,
      credentialsNonExpired: checked,
    })
  }

  onClickSave = () => {
    const { username, enabled, accountNonExpired, accountNonLocked, credentialsNonExpired, } = this.state

    this.setState({
      ...this.state,
      saveDisabled: true,
    })
    
    const user: User = {
      username,
      enabled,
      accountNonExpired,
      accountNonLocked,
      credentialsNonExpired,
    }

    const token: Token = getLocalToken()
    updateUser(token, user)
      .then(() => {
        Router.push('/user')
          .catch(() => {
            // empty block
          })
      })
      .catch((error) => {
        const statusCode: number = error.response ? error.response.status : -1
        if (statusCode === 404) { // not found
          this.setState({
            ...this.state,
            errorTitle: 'Not Found User',
            errorMessage: 'Username is not exist.',
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
  }

  onClickErrorAlertClose = (): void => {
    this.setState({
      ...this.state,
      isShowErrorAlert: false,
    })
    Router.push('/user')
      .catch(() => {
        // empty block
      })
  }

  render() {
    const { username, enabled, accountNonExpired, accountNonLocked, credentialsNonExpired,
      saveDisabled, errorTitle, errorMessage, isShowErrorAlert, } = this.state
    return (
      <Layout title='USER EDIT | OAUTH' active='user'>
        <div className={styles.editUser}>
          <div className={styles.header}>
            <span className={styles.back}>
              <Link href='/user'>
                <a><FaAngleLeft/></a>
              </Link>
            </span>
            <span className={styles.username}>{username}</span>
            <span className={styles.save}><Button onClick={this.onClickSave} disabled={saveDisabled}>SAVE</Button></span>
          </div>
          <div className={styles.items}>
            <div className={styles.item}>
              <p className={styles.title}>Enabled</p>
              <p className={styles.discription}>discription</p>
              <p className={styles.input}>
                <Switch id='enabled' checked={enabled} onChange={this.onChangeEabled}/>
              </p>
            </div>
            <div className={styles.item}>
              <p className={styles.title}>Account Non-Expired</p>
              <p className={styles.discription}>discription</p>
              <p className={styles.input}>
                <Switch id='accountNonExpired' checked={accountNonExpired} onChange={this.onChangeAccountNonExpired}/>
              </p>
            </div>
            <div className={styles.item}>
              <p className={styles.title}>Account Non-Locked</p>
              <p className={styles.discription}>discription</p>
              <p className={styles.input}>
                <Switch id='accountNonLocked'checked={accountNonLocked} onChange={this.onChangeAccountNonLocked}/>
              </p>
            </div>
            <div className={styles.item}>
              <p className={styles.title}>Credentials Non-Expired</p>
              <p className={styles.discription}>discription</p>
              <p className={styles.input}>
                <Switch id='credentialsNonLocked' checked={credentialsNonExpired} onChange={this.onChangeCredentialsNonExpired}/>
              </p>
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

export default UserUpdate
