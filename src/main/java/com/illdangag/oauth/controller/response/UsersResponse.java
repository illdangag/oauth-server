package com.illdangag.oauth.controller.response;

import com.illdangag.oauth.repository.model.User;

import java.util.List;

public class UsersResponse {
    private List<User> users;

    public UsersResponse(List<User> userList) {
        for (User user : userList) {
            user.setPassword(null);
        }
        this.users = userList;
    }

    public List<User> getUsers() {
        return users;
    }
}
