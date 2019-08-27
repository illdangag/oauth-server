package com.illdangag.oauth.controller.request;

import com.illdangag.oauth.repository.model.Client;

import java.util.Set;

public class ClientRequest {
    private String clientId;
    private String clientSecret;
    private Set<String> resourceIds;
    private Set<String> scope;
    private Set<String> grantTypes;
    private Set<String> redirectUri;
    private Set<String> authorities;
    private Integer accessTokenValiditySeconds;
    private Integer refreshTokenValiditySeconds;
    private Boolean autoApprove;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public Set<String> getResourceIds() {
        return resourceIds;
    }

    public void setResourceIds(Set<String> resourceIds) {
        this.resourceIds = resourceIds;
    }

    public Set<String> getScope() {
        return scope;
    }

    public void setScope(Set<String> scope) {
        this.scope = scope;
    }

    public Set<String> getGrantTypes() {
        return grantTypes;
    }

    public void setGrantTypes(Set<String> grantTypes) {
        this.grantTypes = grantTypes;
    }

    public Set<String> getRedirectUri() {
        return redirectUri;
    }

    public void setRedirectUri(Set<String> redirectUri) {
        this.redirectUri = redirectUri;
    }

    public Set<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<String> authorities) {
        this.authorities = authorities;
    }

    public Integer getAccessTokenValiditySeconds() {
        return accessTokenValiditySeconds;
    }

    public void setAccessTokenValiditySeconds(Integer accessTokenValiditySeconds) {
        this.accessTokenValiditySeconds = accessTokenValiditySeconds;
    }

    public Integer getRefreshTokenValiditySeconds() {
        return refreshTokenValiditySeconds;
    }

    public void setRefreshTokenValiditySeconds(Integer refreshTokenValiditySeconds) {
        this.refreshTokenValiditySeconds = refreshTokenValiditySeconds;
    }

    public Boolean getAutoApprove() {
        return autoApprove;
    }

    public void setAutoApprove(Boolean autoApprove) {
        this.autoApprove = autoApprove;
    }

    public Client toClient() {
        Client client = new Client(this.getClientId(), this.getClientSecret());

        if (this.getResourceIds() != null && !this.getResourceIds().isEmpty()) {
            client.setResourceIds(this.getResourceIds());
        }
        if (this.getScope() != null && !this.getScope().isEmpty()) {
            client.setScope(this.getScope());
        }
        if (this.getGrantTypes() != null && !this.getGrantTypes().isEmpty()) {
            client.setGrantTypes(this.getGrantTypes());
        }
        if (this.getRedirectUri() != null && !this.getRedirectUri().isEmpty()) {
            client.setRedirectUri(this.getRedirectUri());
        }
        if (this.getAuthorities() != null && !this.getAuthorities().isEmpty()) {
            client.setAuthorities(this.getAuthorities());
        }
        if (this.getAccessTokenValiditySeconds() != null) {
            client.setAccessTokenValiditySeconds(this.getAccessTokenValiditySeconds());
        }
        if (this.getRefreshTokenValiditySeconds() != null) {
            client.setRefreshTokenValiditySeconds(this.getRefreshTokenValiditySeconds());
        }
        if (this.getAutoApprove() != null) {
            client.setAutoApprove(this.getAutoApprove());
        }

        return client;
    }
}
