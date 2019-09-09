import { Component, ChangeEvent, } from 'react'
import { login, } from '../../utils/tokenAPI'
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
}

class LoginPage extends Component<Dispatchable<Props>, State> {
  // static getInitialProps = async() => {
  //   try {
  //     const response: Token = await login('oauthAdmin', 'password')
  //     console.log(response)
  //     return {
  //       accessToken: response.access_token,
  //       refreshToken: response.refresh_token,
  //     }
  //   } catch (error) {
  //     return {
  //       errors: error.message,
  //     }
  //   }
  // }

  constructor(props: Dispatchable<Props>) {
    super(props)
    this.state = {
      username: 'oauthAdmin',
      password: 'password',
      disabled: false,
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
          })
          setToken(token.access_token, token.refresh_token)(dispatch)
        })
        .catch((error) => {
          console.log(error)
        })
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <ul>
          <li>
            <Input
                fullWidth
                icon='userAuth'
                value={this.state.username}
                disabled={this.state.disabled}
                onChange={this.onChangeUsername}
            />
          </li>
          <li className={styles.password}>
            <Input
                type='password'
                fullWidth
                icon='lock'
                value={this.state.password}
                disabled={this.state.disabled}
                onChange={this.onChangePassword}
            />
          </li>
          <li>
            <Button
                fullWidth
                size='large'
                disabled={this.state.disabled}
                onClick={this.onClickButton}>
              LOGIN
            </Button>
          </li>
        </ul>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(LoginPage)