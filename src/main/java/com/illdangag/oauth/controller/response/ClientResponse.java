package com.illdangag.oauth.controller.response;

import com.illdangag.oauth.repository.model.Client;
import org.springframework.security.core.GrantedAuthority;

import java.util.HashSet;
import java.util.Set;

public class ClientResponse {
    private String clientId;
    private Set<String> resourceIds;
    private Set<String> scope;
    private Set<String> grantTypes;
    private Set<String> redirectUri;
    private Set<String> authorities;
    private Integer accessTokenValiditySeconds;
    private Integer refreshTokenValiditySeconds;
    private Boolean autoApprove;

    public ClientResponse(Client client) {
        this.clientId = client.getClientId();
        this.resourceIds = client.getResourceIds();
        this.scope = client.getScope();
        this.grantTypes = client.getAuthorizedGrantTypes();
        this.redirectUri = client.getRegisteredRedirectUri();
        this.authorities = new HashSet<>();
        for (GrantedAuthority authority : client.getAuthorities()) {
            this.authorities.add(authority.toString());
        }
        this.accessTokenValiditySeconds = client.getAccessTokenValiditySeconds();
        this.refreshTokenValiditySeconds = client.getRefreshTokenValiditySeconds();
        this.autoApprove = client.isAutoApprove(null);
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
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
}
