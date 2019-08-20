package com.illdangag.oauth.controller.request;

import com.illdangag.oauth.repository.model.User;

import java.util.Set;

public class UserRequest {
    private String username;
    private String password;
    private Boolean accountNonExpired;
    private Boolean accountNonLocked;
    private Boolean credentialsNonExpired;
    private Boolean enabled;
    private Set<String> authorities;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<String> authorities) {
        this.authorities = authorities;
    }

    public User toUser() {
        User user = new User(this.username);
        user.setPassword(this.password);
        user.setAuthorities(authorities);

        if (this.accountNonExpired != null) {
            user.setAccountNonExpired(this.accountNonExpired);
        }
        if (this.accountNonLocked != null) {
            user.setAccountNonLocked(this.accountNonLocked);
        }
        if (this.credentialsNonExpired != null) {
            user.setCredentialsNonExpired(this.credentialsNonExpired);
        }
        if (this.enabled != null) {
            user.setEnabled(this.enabled);
        }

        return user;
    }
}
