import { Component, } from 'react'

import { checkToken, clearLocalToken, } from '../../../utils/tokenAPI';
import Router from 'next/router'

import Layout from '../../../container/Layout'

interface Props {

}

interface State {
  isLogin: boolean,
}

class UserCreate extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isLogin: false,
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

  render() {
    const { isLogin, } = this.state
    return(
      <>
        {isLogin && (
          <Layout title='USER CREATE | OAUTH' active='user'></Layout>
        )}
      </>
    )
  }
}

export default UserCreate
