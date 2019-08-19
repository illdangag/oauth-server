package com.illdangag.oauth.controller;

import com.illdangag.oauth.controller.response.UsersResponse;
import com.illdangag.oauth.repository.model.User;
import com.illdangag.oauth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ResponseEntity getUsers() {
        List<User> userList = this.userService.read();

        UsersResponse usersResponse = new UsersResponse(userList);
        return new ResponseEntity<>(usersResponse, HttpStatus.OK);
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST, consumes = "application/json;charset=utf-8")
    public ResponseEntity addUser(@RequestBody User user) {
        this.userService.create(user);

        return new ResponseEntity(HttpStatus.CREATED);
    }
}
