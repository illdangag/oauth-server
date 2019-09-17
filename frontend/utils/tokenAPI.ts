import { API_HOST, } from './config'
import axios, { AxiosRequestConfig, AxiosBasicCredentials, AxiosResponse, } from 'axios'
import { Token, } from '../interfaces'

export async function createToken(username: string, password: string): Promise<Token> {
  const credentials: AxiosBasicCredentials = {
    username: 'oauth-client',
    password: 'oauth-secret',
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
  }
  return token
}

export async function refreshToken(refreshToken: string): Promise<Token> {
  const credentials: AxiosBasicCredentials = {
    username: 'oauth-client',
    password: 'oauth-secret',
  }

  const config: AxiosRequestConfig = {
    baseURL: API_HOST,
    url: '/api/oauth/token',
    method: 'POST',
    auth: credentials,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: 'grant_type=refresh_token&refresh_token=' + refreshToken,
  }
  const response: AxiosResponse = await axios.request(config)

  const token: Token = {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
    tokenType: response.data.token_type,
    expiresIn: response.data.expires_in,
    scope: response.data.scope,
    jti: response.data.jti,
  }
  return token
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
