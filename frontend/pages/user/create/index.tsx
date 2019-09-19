import { Component, ChangeEvent, } from 'react'
import styles from './styles.scss'

import Layout from '../../../container/Layout'
import Button from '../../../components/Button'
import LeftIcon from '../../../components/Icon/LeftIcon'
import Input from '../../../components/Input'
import Switch from '../../../components/Switch'

import { checkToken, clearLocalToken, } from '../../../utils/tokenAPI';
import Router from 'next/router'
import Link from 'next/link'

interface Props {

}

interface State {
  isLogin: boolean,
  username: string,
  enabled: boolean,
  accountNonExpired: boolean,
  accountNonLocked: boolean,
  credentialsNonLocked: boolean,
  authorities: boolean,
  saveDisabled: boolean,
}

class UserCreate extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isLogin: false,
      username: '',
      enabled: true,
      accountNonExpired: true,
      accountNonLocked: true,
      credentialsNonLocked: true,
      authorities: true,
      saveDisabled: true,
    }
  }

  async componentDidMount() {
    try {
      await checkToken()
      this.setState({
        ...this.state,
        isLogin: true,
      })
    } catch {
      clearLocalToken()
      Router.push('/')
    }
  }

  onChangeUsername = (event: ChangeEvent<HTMLInputElement>): void => {
    let value: string = event.target.value
    let saveDisabled: boolean = value.length === 0
    this.setState({
      ...this.state,
      username: value,
      saveDisabled,
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

  onChangeCredentialsNonLocked = (event: ChangeEvent<HTMLInputElement>): void => {
    let checked: boolean = event.target.checked
    this.setState({
      ...this.state,
      credentialsNonLocked: checked,
    })
  }

  onChangeAuthorities = (event: ChangeEvent<HTMLInputElement>): void => {
    let checked: boolean = event.target.checked
    this.setState({
      ...this.state,
      authorities: checked,
    })
  }

  render() {
    const { isLogin, username, enabled, accountNonExpired, accountNonLocked, credentialsNonLocked, authorities, saveDisabled, } = this.state
    return(
      <>
        {isLogin && (
          <Layout title='USER CREATE | OAUTH' active='user'>
            <div className={styles.createUser}>
              <div className={styles.header}>
                <span className={styles.back}>
                  <Link href='/user'>
                    <a><LeftIcon size='small'/></a>
                  </Link>
                </span>
                <span className={styles.save}><Button disabled={saveDisabled}>SAVE</Button></span>
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
                    <Switch id='credentialsNonLocked' checked={credentialsNonLocked} onChange={this.onChangeCredentialsNonLocked}/>
                  </p>
                </div>
                <div className={styles.item}>
                  <p className={styles.title}>Authorities</p>
                  <p className={styles.discription}>discription</p>
                  <p className={styles.input}>
                    <Switch id='authorities' checked={authorities} onChange={this.onChangeAuthorities}/>
                  </p>
                </div>
              </div>
            </div>
          </Layout>
        )}
      </>
    )
  }
}

export default UserCreate
