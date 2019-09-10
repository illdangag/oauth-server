import { Component, ChangeEvent, } from 'react'
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

      Router.push('/sample')
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

  onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      password: event.target.value,
    })
  }

  onClickButton = () => {
    const { dispatch, } = this.props
    const { username, password, } = this.state
    
    this.setState({
      ...this.state,
      disabled: true,
    })

    login(username, password)
        .then((token: Token) => {
          this.setState({
            ...this.state,
            disabled: false,
            isLogin: true,
          })
          setToken(token.accessToken, token.refreshToken)(dispatch)
          setLocalToken(token)
        })
        .catch(() => {
          this.setState({
            ...this.state,
            disabled: false,
          })

          Router.push('/')
            .catch(() => {
              // emply block
            })
        })
  }

  render() {
    const { isLogin, } = this.state
    return (
      <>
        {!isLogin && (
          <form className={styles.wrapper}>
            <div>
              <Input
                  fullWidth
                  icon='userAuth'
                  value={this.state.username}
                  disabled={this.state.disabled}
                  onChange={this.onChangeUsername}
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
