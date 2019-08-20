package com.illdangag.oauth.controller;

import com.illdangag.oauth.controller.request.UserRequest;
import com.illdangag.oauth.controller.response.UserResponse;
import com.illdangag.oauth.repository.model.User;
import com.illdangag.oauth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/user", method = RequestMethod.POST, consumes = "application/json;charset=utf-8")
    public ResponseEntity createUser(@RequestBody UserRequest userRequest) {
        ResponseEntity responseEntity = null;
        User user = userRequest.toUser();

        // TODO: 각 종류별 예외 처리
        try {
            this.userService.create(user);
            responseEntity = new ResponseEntity(HttpStatus.CREATED);
        } catch (Exception e) {
            responseEntity = new ResponseEntity(HttpStatus.CONFLICT);
        }

        return responseEntity;
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ResponseEntity readUsers() {
        List<User> userList = this.userService.read();
        List<UserResponse> userResponseList = new ArrayList<>();

        for (User user : userList) {
            userResponseList.add(new UserResponse(user));
        }

        return new ResponseEntity<>(userResponseList, HttpStatus.OK);
    }
}
