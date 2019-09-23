import { API_HOST, ADMIN_CLIENT, ADMIN_SECRET, } from './config'
import axios, { AxiosRequestConfig, AxiosBasicCredentials, AxiosResponse, } from 'axios'
import { Token, AccessTokenInfo, } from '../interfaces'

export async function createToken(username: string, password: string): Promise<Token> {
  const credentials: AxiosBasicCredentials = {
    username: ADMIN_CLIENT,
    password: ADMIN_SECRET,
  }

  const config: AxiosRequestConfig = {
    baseURL: API_HOST,
    url: '/api/oauth/token',
    method: 'POST',
    auth: credentials,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: 'grant_type=password&username=' + username + '&password=' + password,
  }

  const response: AxiosResponse = await axios.request(config)

  const token: Token = {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
    tokenType: response.data.token_type,
    expiresIn: response.data.expires_in,
    scope: response.data.scope,
    jti: response.data.jti,
    expiredTime: new Date().getTime() + response.data.expires_in * 1000,
  }
  return token
}

export async function refreshToken(token: Token): Promise<Token> {
  const credentials: AxiosBasicCredentials = {
    username: ADMIN_CLIENT,
    password: ADMIN_SECRET,
  }

  const config: AxiosRequestConfig = {
    baseURL: API_HOST,
    url: '/api/oauth/token',
    method: 'POST',
    auth: credentials,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: 'grant_type=refresh_token&refresh_token=' + token.refreshToken,
  }

  const response: AxiosResponse = await axios.request(config)

  const newToken: Token = {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
    tokenType: response.data.token_type,
    expiresIn: response.data.expires_in,
    scope: response.data.scope,
    jti: response.data.jti,
    expiredTime: new Date().getTime() + response.data.expires_in * 1000,
  }
  return newToken
}

export async function checkToken(token: Token): Promise<AccessTokenInfo> {
  const credentials: AxiosBasicCredentials = {
    username: ADMIN_CLIENT,
    password: ADMIN_SECRET,
  }

  const config: AxiosRequestConfig = {
    baseURL: API_HOST,
    url: '/api/oauth/check_token',
    method: 'POST',
    auth: credentials,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: 'token=' + token.accessToken,
  }

  const response: AxiosResponse = await axios.request(config)

  const accessTokenInfo: AccessTokenInfo = {
    username: response.data.user_name,
    scope: response.data.scope,
    active: response.data.active,
    exp: response.data.exp,
    authorities: response.data.authorities,
    jti: response.data.jti,
    clientId: response.data.client_id,
  }

  return accessTokenInfo
}

export function setLocalToken(token: Token): void {
  const serializedToken: string = JSON.stringify(token)
  localStorage.setItem('token', serializedToken)
}

export function getLocalToken(): Token {
  const serializedToken: string | null = localStorage.getItem('token')

  if (serializedToken === null) {
    throw Error()
  }

  return JSON.parse(serializedToken)
}

export function clearLocalToken(): void {
  localStorage.removeItem('token')
}

export function isExpiredToken(token: Token): boolean {
  const nowTime: number = new Date().getTime()

  if (token.expiredTime === undefined || nowTime > token.expiredTime + 5 * 60 * 1000) {
    return true
  }
  return false
}
