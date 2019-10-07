import { API_HOST, } from './config'
import { User, Token, } from '../interfaces'
import axios, { AxiosRequestConfig, AxiosResponse, } from 'axios'

export async function getUsers(token: Token): Promise<User[]> {
  const config: AxiosRequestConfig = {
    baseURL: API_HOST,
    url: '/api/v1/users',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.accessToken,
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

export async function createUser(token: Token, user: User): Promise<void> {
  const config: AxiosRequestConfig = {
    baseURL: API_HOST,
    url: '/api/v1/users',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.accessToken,
    },
    data: user,
  }
  await axios.request(config)
}

export async function getUser(token: Token, username: string): Promise<User> {
  const config: AxiosRequestConfig = {
    baseURL: API_HOST,
    url: '/api/v1/users/' + username,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.accessToken,
    },
  }
  const response: AxiosResponse = await axios.request(config)

  const user: User = {
    username: response.data.username,
    accountNonExpired: response.data.accountNonExpired,
    accountNonLocked: response.data.accountNonLocked,
    credentialsNonExpired: response.data.credentialsNonExpired,
    enabled: response.data.enabled,
    authorities: response.data.authorities,
  }

  return user
}

export async function updateUser(token: Token, user: User): Promise<void> {
  const config: AxiosRequestConfig = {
    baseURL: API_HOST,
    url: '/api/v1/users',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.accessToken,
    },
    data: user,
  }
  await axios.request(config)
}

export async function deleteUser(token: Token, username: string): Promise<void> {
  const config: AxiosRequestConfig = {
    baseURL: API_HOST,
    url: '/api/v1/users/' + username,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.accessToken,
    },
  }
  await axios.request(config)
}
