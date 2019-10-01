import { Component, } from 'react'
import styles from '../client.scss'
import Router from 'next/router'
import Link from 'next/link'

import Layout from '../../../container/Layout'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import { FaAngleLeft, } from 'react-icons/fa'

import { Token, } from '../../../interfaces'
import { getLocalToken, checkToken, refreshToken, setLocalToken, clearLocalToken, } from '../../../utils/tokenAPI'

interface Props {

}

interface State {
  saveDisabled: boolean,
}

class ClientCreate extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      saveDisabled: true,
    }
  }

  async componentDidMount() {
    try {
      const token: Token = getLocalToken()
      await checkToken(token)
    } catch {
      try {
        const token: Token = getLocalToken()
        const newToken: Token = await refreshToken(token)
        setLocalToken(newToken)
      } catch {
        clearLocalToken()
        await Router.push('/')
      }
    }
  }

  onClickSave = () => {
    //
  }

  render() {
    const { saveDisabled, } = this.state

    return(
      <Layout title='CLIENT CREATE | OAUTH' active='client'>
        <div className={styles.client}>
          <div className={styles.header}>
            <span className={styles.back}>
              <Link href='/client'>
                <a><FaAngleLeft/></a>
              </Link>
            </span>
            <span className={styles.save}><Button disabled={saveDisabled} onClick={this.onClickSave}>SAVE</Button></span>
          </div>
          <div className={styles.items}>
            <div className={styles.item}>
              <p className={styles.title}>Client id</p>
              <p className={styles.discription}>discription</p>
              <div className={styles.content}>
                <p className={styles.input}>
                  <Input fullWidth={true} icon='userAuth'></Input>
                </p>
              </div>
            </div>
            <div className={styles.item}>
              <p className={styles.title}>Client secret</p>
              <p className={styles.discription}>discription</p>
              <div className={styles.content}>
                <div className={styles.input}>
                  <p className={styles.password}>
                    <Input fullWidth={true} icon='lock' type='password'></Input>
                  </p>
                  <p className={styles.confirmPassword}>
                    <Input fullWidth={true} icon='lock' type='password'></Input>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ClientCreate
