package com.illdangag.oauth.repository.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.provider.ClientDetails;

import java.util.*;

@Document(collection = "clients")
public class Client implements ClientDetails {
    @Id
    private String id;

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

    public Client() {
        this.resourceIds = new HashSet<>();
        this.scope = new HashSet<>();
        this.grantTypes = new HashSet<>();
        this.redirectUri = new HashSet<>();
        this.authorities = new HashSet<>();
    }

    @Override
    public String getClientId() {
        return clientId;
    }

    @Override
    public Set<String> getResourceIds() {
        return this.resourceIds;
    }

    @Override
    public boolean isSecretRequired() {
        return clientSecret != null;
    }

    @Override
    public String getClientSecret() {
        return clientSecret;
    }

    @Override
    public boolean isScoped() {
        return scope != null;
    }

    @Override
    public Set<String> getScope() {
        return this.scope;
    }

    @Override
    public Set<String> getAuthorizedGrantTypes() {
        return this.grantTypes;
    }

    @Override
    public Set<String> getRegisteredRedirectUri() {
        return this.redirectUri;
    }

    @Override
    public Set<GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();

        for (String authorityValue : this.authorities) {
            SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(authorityValue);
            grantedAuthorities.add(simpleGrantedAuthority);
        }

        return grantedAuthorities;
    }

    @Override
    public Integer getAccessTokenValiditySeconds() {
        return accessTokenValiditySeconds;
    }

    @Override
    public Integer getRefreshTokenValiditySeconds() {
        return refreshTokenValiditySeconds;
    }

    @Override
    public boolean isAutoApprove(String scope) {
        return autoApprove;
    }

    @Override
    public Map<String, Object> getAdditionalInformation() {
        return null;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public void setResourceIds(String ...resourceIdList) {
        this.setRedirectUri(Arrays.asList(resourceIdList));
    }
    public void setResourceIds(List<String> resourceIdList) {
        this.setRedirectUri(new HashSet<>(resourceIdList));
    }
    public void setResourceIds(Set<String> resourceIdSet) {
        this.resourceIds = resourceIdSet;
    }

    public void setScope(String ...scopeList) {
        this.setScope(Arrays.asList(scopeList));
    }
    public void setScope(List<String> scopeList) {
        this.scope = new HashSet<>(scopeList);
    }

    public void setGrantTypes(String ...grantTypeList) {
        this.setGrantTypes(Arrays.asList(grantTypeList));
    }
    public void setGrantTypes(List<String> grantTypeList) {
        this.setGrantTypes(new HashSet<>(grantTypeList));
    }
    public void setGrantTypes(Set<String> grantTypeList) {
        this.grantTypes = grantTypeList;
    }

    public void setRedirectUri(String ...redirectUriList) {
        this.setRedirectUri(Arrays.asList(redirectUriList));
    }
    public void setRedirectUri(List<String> redirectUriList) {
        this.setRedirectUri(new HashSet<>(redirectUriList));
    }
    public void setRedirectUri(Set<String> redirectUriList) {
        this.redirectUri = redirectUriList;
    }

    public void setAuthorities(String ...authorityList) {
        this.setAuthorities(Arrays.asList(authorityList));
    }
    public void setAuthorities(List<String> authorityList) {
        this.setAuthorities(new HashSet<>(authorityList));
    }
    public void setAuthorities(Set<String> authorityList) {
        this.authorities = authorityList;
    }

    public void setAccessTokenValiditySeconds(Integer accessTokenValiditySeconds) {
        this.accessTokenValiditySeconds = accessTokenValiditySeconds;
    }

    public void setRefreshTokenValiditySeconds(Integer refreshTokenValiditySeconds) {
        this.refreshTokenValiditySeconds = refreshTokenValiditySeconds;
    }

    public void setAutoApprove(Boolean autoApprove) {
        this.autoApprove = autoApprove;
    }
}
