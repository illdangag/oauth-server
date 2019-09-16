import { API_HOST, } from './config'
import axios, { AxiosRequestConfig, AxiosResponse, } from 'axios'
import { User, } from '../interfaces'
import { getLocalToken, } from './tokenAPI'

export async function getUsers(): Promise<User[]> {
  const config: AxiosRequestConfig = {
    baseURL: API_HOST,
    url: '/api/v1/users',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + getLocalToken().accessToken,
    },
  }
  const response: AxiosResponse = await axios.request(config)

  const users: User[] = []

  for (let userData of response.data) {
    const user: User = {
      username: userData.username,
      accountNonExpired: userData.accountNonExpired,
      accountNonLocked: userData.accountNonLocked,
      credentialsNonExpired: userData.credentialsNonExpired,
      enabled: userData.enabled,
      authorities: userData.authorities,
    }
    users.push(user)
  }

  return users
}
