import { Component, } from 'react'
import styles from './styles.scss'

import Layout from '../../../container/Layout'
import Button from '../../../components/Button'
import LeftIcon from '../../../components/Icon/LeftIcon'

import { checkToken, clearLocalToken, } from '../../../utils/tokenAPI';
import Router from 'next/router'
import Link from 'next/link'

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
          <Layout title='USER CREATE | OAUTH' active='user'>
            <div className={styles.createUser}>
              <div className={styles.header}>
                <span className={styles.back}>
                  <Link href='/user'>
                    <a><LeftIcon size='small'/></a>
                  </Link>
                </span>
                <span className={styles.save}><Button>SAVE</Button></span>
              </div>
            </div>
          </Layout>
        )}
      </>
    )
  }
}

export default UserCreate
