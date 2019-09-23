import { Component, } from 'react'
import { NextPageContext, } from 'next'
import Router from 'next/router'

import { Token, User, } from '../../../interfaces'
import { getLocalToken, refreshToken, setLocalToken, clearLocalToken, } from '../../../utils/tokenAPI'
import { getUser, } from '../../../utils/userAPI'

interface Props {
  id: string,
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
    return { id: query.id, }
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
    const { id, } = this.props
    try {
      const token: Token = getLocalToken()
      await this.getUserInfo(token, id)
    } catch (error) {
      if (error.response.status === 401) {
        const token: Token = getLocalToken()
        const newToken: Token = await refreshToken(token)
        setLocalToken(newToken)

        try {
          await this.getUserInfo(newToken, id)
        } catch {
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

  render() {
    return (
      <div>{this.state.username}</div>
    )
  }
}

export default UserUpdate
