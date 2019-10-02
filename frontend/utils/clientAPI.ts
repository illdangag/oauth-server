import { API_HOST, } from './config'
import { Client, Token, } from '../interfaces'
import axios, { AxiosRequestConfig, AxiosResponse, } from 'axios'

export async function getClients(token: Token): Promise<Client[]> {
  const config: AxiosRequestConfig = {
    baseURL: API_HOST,
    url: '/api/v1/clients',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.accessToken,
    },
  }
  const response: AxiosResponse = await axios.request(config)
  
  const clients: Client[] = []

  for (let clientData of response.data) {
    const client: Client = {
      clientId: clientData.clientId,
      resourceIds: clientData.resourceIds,
      scope: clientData.scope,
      grantTypes: clientData.grantTypes,
      redirectUri: clientData.redirectUri,
      authorities: clientData.authorities,
      accessTokenValiditySeconds: clientData.accessTokenValiditySeconds,
      refreshTokenValiditySeconds: clientData.refreshTokenValiditySeconds,
      autoApprove: clientData.autoApprove,
    }
    clients.push(client)
  }

  return clients
}

export async function createClient(token: Token, client: Client): Promise<void> {
  const config: AxiosRequestConfig = {
    baseURL: API_HOST,
    url: '/api/v1/clients',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.accessToken,
    },
    data: client,
  }
  await axios.request(config)
}

export async function getClient(token: Token, clientId: string): Promise<Client> {
  const config: AxiosRequestConfig = {
    baseURL: API_HOST,
    url: '/api/v1/clients/' + clientId,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.accessToken,
    },
  }
  const response: AxiosResponse = await axios.request(config)

  const client: Client = {
    clientId: response.data.clientId,
    resourceIds: response.data.resourceIds,
    scope: response.data.scope,
    grantTypes: response.data.grantTypes,
    redirectUri: response.data.redirectUri,
    authorities: response.data.authorities,
    accessTokenValiditySeconds: response.data.accessTokenValiditySeconds,
    refreshTokenValiditySeconds: response.data.refreshTokenValiditySeconds,
    autoApprove: response.data.autoApprove,
  }

  return client
}

export async function updateClient(token: Token, client: Client): Promise<void> {
  const config: AxiosRequestConfig = {
    baseURL: API_HOST,
    url: '/api/v1/clients',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token.accessToken,
    },
    data: client,
  }
  await axios.request(config)
}
