import { Component, ChangeEvent, } from 'react'
import styles from './styles.scss'

import Layout from '../../../container/Layout'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Switch from '../../../components/Switch'
import Alert from '../../../components/Alert'
import { FaAngleLeft, } from 'react-icons/fa'

import { checkToken, clearLocalToken, refreshToken, getLocalToken, setLocalToken, } from '../../../utils/tokenAPI'
import { createUser, } from '../../../utils/userAPI'
import Router from 'next/router'
import Link from 'next/link'
import { User, Token, } from '../../../interfaces'

interface Props {

}

interface State {
  username: string,
  password: string,
  confirmPassword: string,
  enabled: boolean,
  accountNonExpired: boolean,
  accountNonLocked: boolean,
  credentialsNonExpired: boolean,
  saveDisabled: boolean,
  isShowErrorAlert: boolean,
  errorTitle: string,
  errorMessage: string,
}

class UserCreate extends Component<Props, State> {
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
      saveDisabled: true,
      isShowErrorAlert: false,
      errorTitle: '',
      errorMessage: '',
    }
  }

  async componentDidMount() {
    try {
      const token: Token = getLocalToken()
      await checkToken(token)
      this.setState({
        ...this.state,
      })
    } catch {
      try {
        const token: Token = getLocalToken()
        const newToken: Token = await refreshToken(token)
        setLocalToken(newToken)
        this.setState({
          ...this.state,
        })
      } catch {
        clearLocalToken()
        await Router.push('/')
      }
    }
  }

  onChangeUsername = (event: ChangeEvent<HTMLInputElement>): void => {
    const { password, confirmPassword, } = this.state
    let value: string = event.target.value
    let saveDisabled: boolean = (value.length === 0 || password.length === 0) || (password !== confirmPassword)
    this.setState({
      ...this.state,
      username: value,
      saveDisabled,
    })
  }

  onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    const { username, confirmPassword, } = this.state
    let value: string = event.target.value
    let saveDisabled: boolean = (value.length === 0 || username.length === 0) || (value !== confirmPassword)
    this.setState({
      ...this.state,
      password: value,
      saveDisabled,
    })
  }

  onChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>): void => {
    const { username, password, } = this.state
    let value: string = event.target.value
    let saveDisabled: boolean = (value.length === 0 || username.length === 0) || (value !== password)
    this.setState({
      ...this.state,
      confirmPassword: value,
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

  onChangeCredentialsNonExpired = (event: ChangeEvent<HTMLInputElement>): void => {
    let checked: boolean = event.target.checked
    this.setState({
      ...this.state,
      credentialsNonExpired: checked,
    })
  }

  onClickSave = () => {
    const { username, password, enabled, accountNonExpired, accountNonLocked, credentialsNonExpired, } = this.state

    this.setState({
      ...this.state,
      saveDisabled: true,
    })

    const user: User = {
      username,
      password,
      enabled,
      accountNonExpired,
      accountNonLocked,
      credentialsNonExpired,
      authorities: ['USER',],
    }
    
    const token: Token = getLocalToken()
    createUser(token, user)
      .then(() => {
        Router.push('/user')
          .catch(() => {
            // empty block
          })
      })
      .catch((error) => {
        const statusCode: number = error.response ? error.response.status : -1
        if (statusCode === 409) { // Duplicate
          this.setState({
            ...this.state,
            errorTitle: 'Duplicate User',
            errorMessage: 'Username is a duplicate.',
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
  }

  render() {
    const { username, password, confirmPassword, enabled, accountNonExpired, accountNonLocked, credentialsNonExpired,
      saveDisabled, isShowErrorAlert, errorTitle, errorMessage, } = this.state
    return(
      <Layout title='USER CREATE | OAUTH' active='user'>
        <div className={styles.createUser}>
          <div className={styles.header}>
            <span className={styles.back}>
              <Link href='/user'>
                <a><FaAngleLeft/></a>
              </Link>
            </span>
            <span className={styles.save}><Button disabled={saveDisabled} onClick={this.onClickSave}>SAVE</Button></span>
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

export default UserCreate
