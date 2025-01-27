// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type Token = {
  accessToken: string,
  refreshToken: string,
  tokenType: string,
  expiresIn: number,
  scope: string,
  jti: string,
  expiredTime?: number,
}

export type AccessTokenInfo = {
  username: string,
  scope: string[],
  active: boolean,
  exp: number,
  authorities: string[],
  jti: string,
  clientId: string,
}

export type User = {
  username: string,
  password?: string,
  accountNonExpired: boolean,
  accountNonLocked: boolean,
  credentialsNonExpired: boolean,
  enabled: boolean,
  authorities?: string[],
}

export type Client = {
  clientId: string,
  clientSecret?: string,
  resourceIds: string[],
  scope: string[],
  grantTypes: string[],
  redirectUri: string[],
  authorities: string[],
  accessTokenValiditySeconds: number,
  refreshTokenValiditySeconds: number,
  autoApprove: boolean,
}
