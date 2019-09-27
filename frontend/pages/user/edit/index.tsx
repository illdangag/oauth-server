import { Component, ChangeEvent, } from 'react'
import { NextPageContext, } from 'next'
import Router from 'next/router'
import Link from 'next/link'
import styles from './styles.scss'

import Layout from '../../../container/Layout'
import Button from '../../../components/Button'
import LeftIcon from '../../../components/Icon/LeftIcon'
import Input from '../../../components/Input'
import Switch from '../../../components/Switch'

import { Token, User, } from '../../../interfaces'
import { getLocalToken, refreshToken, setLocalToken, clearLocalToken, } from '../../../utils/tokenAPI'
import { getUser, } from '../../../utils/userAPI'

interface Props {
  username: string,
}

interface State {
  username: string,
  password: string,
  confirmPassword: string,
  enabled: boolean,
  accountNonExpired: boolean,
  accountNonLocked: boolean,
  credentialsNonExpired: boolean,
}

class UserUpdate extends Component<Props, State> {
  static getInitialProps({ query, }: NextPageContext) {
    return { username: query.username, }
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      enabled: true,
      accountNonExpired: true,
      accountNonLocked: true,
      credentialsNonExpired: true,
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
      password: '',
      confirmPassword: '',
      enabled: user.enabled,
      accountNonExpired: user.accountNonExpired,
      accountNonLocked: user.accountNonLocked,
      credentialsNonExpired: user.credentialsNonExpired,
    })
  }

  onChangeUsername = (event: ChangeEvent<HTMLInputElement>): void => {
    // const { password, confirmPassword, } = this.state
    let value: string = event.target.value
    // let saveDisabled: boolean = (value.length === 0 || password.length === 0) || (password !== confirmPassword)
    this.setState({
      ...this.state,
      username: value,
      // saveDisabled,
    })
  }

  onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    // const { username, confirmPassword, } = this.state
    let value: string = event.target.value
    // let saveDisabled: boolean = (value.length === 0 || username.length === 0) || (value !== confirmPassword)
    this.setState({
      ...this.state,
      password: value,
      // saveDisabled,
    })
  }

  onChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>): void => {
    // const { username, password, } = this.state
    let value: string = event.target.value
    // let saveDisabled: boolean = (value.length === 0 || username.length === 0) || (value !== password)
    this.setState({
      ...this.state,
      confirmPassword: value,
      // saveDisabled,
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

  render() {
    const { username, password, confirmPassword, enabled, accountNonExpired, accountNonLocked, credentialsNonExpired,
      } = this.state
    return (
      <Layout title='USER EDIT | OAUTH' active='user'>
        <div className={styles.editUser}>
          <div className={styles.header}>
              <span className={styles.back}>
                <Link href='/user'>
                  <a><LeftIcon size='small'/></a>
                </Link>
              </span>
              <span className={styles.save}><Button>SAVE</Button></span>
            </div>
          <div className={styles.items}>
              <div className={styles.item}>
                <p className={styles.title}>Username</p>
                <p className={styles.discription}>discription</p>
                <p className={styles.input}>
                  <Input fullWidth={true} icon='userEdit' value={username} onChange={this.onChangeUsername}></Input>
                </p>
              </div>
              <div className={styles.item}>
                <p className={styles.title}>Password</p>
                <p className={styles.discription}>discription</p>
                <div className={styles.input}>
                  <p className={styles.password}>
                    <Input fullWidth={true} icon='lock' type='password' value={password} onChange={this.onChangePassword}></Input>
                  </p>
                  <p className={styles.confirmPassword}>
                    <Input fullWidth={true} icon='lock' type='password' value={confirmPassword} onChange={this.onChangeConfirmPassword}></Input>
                  </p>
                </div>
              </div>
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
      </Layout>
    )
  }
}

export default UserUpdate
