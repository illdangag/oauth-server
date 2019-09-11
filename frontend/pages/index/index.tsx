import { Component, ChangeEvent, KeyboardEvent, } from 'react'
import Head from 'next/head'
import Router from 'next/router'

import { login, getLocalToken, setLocalToken, } from '../../utils/tokenAPI'
import { Token, } from '../../interfaces'

import styles from './styles.scss'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { connect, } from 'react-redux'
import { Dispatchable, mapDispatchToProps, } from '../../lib/with-redux-store'
import { setToken, } from '../../store'

interface Props {
  accessToken?: string,
  refreshToken?: string,
}

interface State {
  username: string,
  password: string,
  disabled: boolean,
  isLogin: boolean,
}

class LoginPage extends Component<Dispatchable<Props>, State> {
  private passwordElement: HTMLInputElement | null = null

  constructor(props: Dispatchable<Props>) {
    super(props)
    this.state = {
      username: 'oauthAdmin',
      password: 'password',
      disabled: false,
      isLogin: true,
    }
  }

  componentDidMount() {
    try {
      getLocalToken()
      this.setState({
        ...this.state,
        isLogin: true,
      })

      Router.push('/user')
      .catch(() => {
        // emply block
      })
    } catch {
      this.setState({
        ...this.state,
        isLogin: false,
      })
    }
  }

  onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      username: event.target.value,
    })
  }

  onKeyupUsername = (event: KeyboardEvent<HTMLInputElement>) => {
    const { username, } = this.state
    if (event.key === 'Enter' && username.length > 0 && this.passwordElement !== null) {
      this.passwordElement.focus()
    }
  }

  onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      password: event.target.value,
    })
  }

  onKeyupPassword = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.setState({
        ...this.state,
        disabled: true,
      })
  
      this.startLogin()
    }
  }

  onClickButton = () => {
    this.setState({
      ...this.state,
      disabled: true,
    })

    this.startLogin()
  }

  startLogin = () => {
    const { dispatch, } = this.props
    const { username, password, } = this.state

    login(username, password)
    .then((token: Token) => {
      this.setState({
        ...this.state,
        disabled: false,
        isLogin: true,
      })
      setToken(token.accessToken, token.refreshToken)(dispatch)
      setLocalToken(token)
      Router.push('/user')
      .catch(() => {
        // emply block
      })
    })
    .catch(() => {
      this.setState({
        ...this.state,
        disabled: false,
      })
    })
  }

  render() {
    const { isLogin, } = this.state
    return (
      <>
        <Head>
          <title>Login</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        {!isLogin && (
          <form className={styles.wrapper}>
            <div>
              <Input
                  fullWidth
                  icon='userAuth'
                  value={this.state.username}
                  disabled={this.state.disabled}
                  onChange={this.onChangeUsername}
                  onKeyup={this.onKeyupUsername}
              />
            </div>
            <div className={styles.password}>
              <Input
                  type='password'
                  fullWidth
                  icon='lock'
                  value={this.state.password}
                  disabled={this.state.disabled}
                  onChange={this.onChangePassword}
                  onKeyup={this.onKeyupPassword}
                  inputRef={(instance) => { this.passwordElement = instance }}
              />
            </div>
            <div>
              <Button
                  fullWidth
                  size='large'
                  disabled={this.state.disabled}
                  onClick={this.onClickButton}>
                LOGIN
              </Button>
            </div>
          </form>
        )}
      </>
    )
  }
}

export default connect(null, mapDispatchToProps)(LoginPage)
