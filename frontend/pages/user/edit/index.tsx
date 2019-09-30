import { Component, ChangeEvent, } from 'react'
import { NextPageContext, } from 'next'
import Router from 'next/router'
import Link from 'next/link'
import styles from './styles.scss'

import Layout from '../../../container/Layout'
import Button from '../../../components/Button'
import LeftIcon from '../../../components/Icon/LeftIcon'
import Switch from '../../../components/Switch'

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
    const user: User = {
      username,
      enabled,
      accountNonExpired,
      accountNonLocked,
      credentialsNonExpired,
    }

    try {
      const token: Token = getLocalToken()
      updateUser(token, user)
    } catch (error) {
      
    }
  }

  render() {
    const { username, enabled, accountNonExpired, accountNonLocked, credentialsNonExpired,
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
            <span className={styles.username}>{username}</span>
            <span className={styles.save}><Button onClick={this.onClickSave}>SAVE</Button></span>
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
      </Layout>
    )
  }
}

export default UserUpdate
