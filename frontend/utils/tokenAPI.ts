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
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token,
    token_type: response.data.token_type,
    expires_in: response.data.expireds_in,
    scope: response.data.scope,
    jti: response.data.jti,
  }
  return token
}
