import React, { FunctionComponent, } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import styles from './styles.scss'
import cx from 'classnames/bind'

import { clearLocalToken, } from '../../utils/tokenAPI'

import Button from '../../components/Button'

type Props = {
  title?: string,
  active?: 'user' | 'client',
}

const Layout: FunctionComponent<Props> = ({
  children,
  title = 'OAUTH',
  active = null,
}) => {
  const logout = () => {
    clearLocalToken()
    Router.push('/')
      .catch(() => {
        // emply block
      })
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {/* <header></header> */}
      <nav className={styles.menu}>
        <div className={styles.linkList}>
          <span className={cx(styles.link, { [styles.active]: active === 'user', })}>
            <Link href='/user'><a>USER</a></Link>
          </span>
          <span className={cx(styles.link, { [styles.active]: active === 'client', })}>
            <Link href='/sample'><a>CLIENT</a></Link>
          </span>
        </div>
        <span className={styles.logout}>
          <Button style='outline' onClick={logout}>LOGOUT</Button>
        </span>
      </nav>
      {children}
    </>
  )
}

export default Layout
