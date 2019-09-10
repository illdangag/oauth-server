import { Token, } from '../interfaces'
import axios, { AxiosRequestConfig, AxiosBasicCredentials, AxiosResponse, } from 'axios'

export async function login(username: string, password: string): Promise<Token> {
  const credentials: AxiosBasicCredentials = {
    username: 'oauth-client',
    password: 'oauth-secret',
  }

  const config: AxiosRequestConfig = {
    baseURL: 'http://localhost:8080',
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
    expiresIn: response.data.expireds_in,
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
