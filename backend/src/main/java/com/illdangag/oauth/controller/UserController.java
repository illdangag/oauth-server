package com.illdangag.oauth.controller;

import com.illdangag.oauth.controller.request.UserRequest;
import com.illdangag.oauth.controller.response.ErrorResponse;
import com.illdangag.oauth.controller.response.UserResponse;
import com.illdangag.oauth.controller.response.type.ErrorType;
import com.illdangag.oauth.repository.model.User;
import com.illdangag.oauth.service.UserService;
import com.illdangag.oauth.service.exception.DuplicateException;
import com.illdangag.oauth.service.exception.InvalidPropertyException;
import com.illdangag.oauth.service.exception.NotFoundException;
import com.illdangag.oauth.service.exception.PropertyNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Lazy
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Value("${oauth.admin.username}")
    private String adminUsername;

    /**
     * 사용자 생성
     *
     * @param userRequest 사용자 정보
     * @return 결과
     */
    @RequestMapping(value = "", method = RequestMethod.POST, consumes = "application/json;charset=utf-8")
    public ResponseEntity create(@RequestBody UserRequest userRequest) {
        User user = userRequest.toUser();

        if (userRequest.getPassword() == null || userRequest.getPassword().equals("")) {
            ErrorType errorType = ErrorType.USER_CREATE_INVALID_PROPERTY;
            String errorMessage = errorType.getMessage() + " - password";
            ErrorResponse errorResponse = new ErrorResponse(errorType.getCode(), errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        ResponseEntity responseEntity = null;
        try {
            user.setPassword(this.passwordEncoder.encode(user.getPassword()));
            this.userService.create(user);
            responseEntity = new ResponseEntity(HttpStatus.CREATED);
        } catch (NullPointerException | PropertyNotFoundException | InvalidPropertyException e) {
            ErrorType errorType = ErrorType.USER_CREATE_INVALID_PROPERTY;
            String errorMessage = errorType.getMessage() + " - " + e.getMessage();
            ErrorResponse errorResponse = new ErrorResponse(errorType.getCode(), errorMessage);
            responseEntity = new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        } catch (DuplicateException e) {
            ErrorResponse errorResponse = new ErrorResponse(ErrorType.USER_CREATE_DUPLICATED_USERNAME);
            responseEntity = new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
        }

        return responseEntity;
    }

    /**
     * 사용자 목록 조회
     *
     * @return 결과
     */
    @RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ResponseEntity readList(@RequestParam(required = false, defaultValue = "false") String includedAdmin) {
        List<User> userList = this.userService.read();
        List<UserResponse> userResponseList = new ArrayList<>();

        for (User user : userList) {
            if (!user.getUsername().equals(adminUsername) ||
                    includedAdmin.equalsIgnoreCase("true")) {
                userResponseList.add(new UserResponse(user));
            }
        }

        return new ResponseEntity<>(userResponseList, HttpStatus.OK);
    }

    /**
     * 사용자 조회
     *
     * @param username 사용자 이름
     * @return 결과
     */
    @RequestMapping(value = "/{username}", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public ResponseEntity read(@PathVariable String username) {
        if (username == null || username.equals("")) {
            ErrorType errorType = ErrorType.USER_READ_INVALID_PROPERTY;
            String errorMessage = errorType.getMessage() + " - username";
            ErrorResponse errorResponse = new ErrorResponse(errorType.getCode(), errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        ResponseEntity responseEntity = null;
        try {
            User user = this.userService.readByUsername(username);
            responseEntity = new ResponseEntity<>(new UserResponse(user), HttpStatus.OK);
        } catch (NotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse(ErrorType.USER_READ_NOT_EXIST_USER);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(ErrorType.UNKNOWN_ERROR);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }


        return responseEntity;
    }

    /**
     * 사용자 정보 갱신
     *
     * @param userRequest 사용자 정보
     * @return 결과
     */
    @RequestMapping(value = "", method = RequestMethod.PATCH, produces = "application/json;charset=utf-8")
    public ResponseEntity update(@RequestBody UserRequest userRequest) {
        String username = userRequest.getUsername();

        if (username == null || username.equals("")) {
            ErrorType errorType = ErrorType.USER_UPDATE_INVALID_PROPERTY;
            String errorMessage = errorType.getMessage() + " - username";
            ErrorResponse errorResponse = new ErrorResponse(errorType.getCode(), errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        User dbUser = null;
        try {
            dbUser = this.userService.readByUsername(username);
        } catch (NotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse(ErrorType.USER_UPDATE_NOT_EXIST_USER);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        String password = userRequest.getPassword();
        if (password != null && password.equals("")) {
            ErrorType errorType = ErrorType.USER_UPDATE_INVALID_PROPERTY;
            String errorMessage = errorType.getMessage() + " - password";
            ErrorResponse errorResponse = new ErrorResponse(errorType.getCode(), errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        } else if (password != null) {
            dbUser.setPassword(this.passwordEncoder.encode(password));
        }

        if (userRequest.getAccountNonExpired() != null) {
            dbUser.setAccountNonExpired(userRequest.getAccountNonExpired());
        }

        if (userRequest.getAccountNonLocked() != null) {
            dbUser.setAccountNonLocked(userRequest.getAccountNonLocked());
        }

        if (userRequest.getCredentialsNonExpired() != null) {
            dbUser.setCredentialsNonExpired(userRequest.getCredentialsNonExpired());
        }

        if (userRequest.getEnabled() != null) {
            dbUser.setEnabled(userRequest.getEnabled());
        }

        ResponseEntity responseEntity = null;
        try {
            this.userService.update(dbUser);
            responseEntity = new ResponseEntity(HttpStatus.OK);
        } catch (NotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse(ErrorType.USER_UPDATE_NOT_EXIST_USER);
            responseEntity = new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        } catch (InvalidPropertyException e) {
            ErrorType errorType = ErrorType.USER_UPDATE_INVALID_PROPERTY;
            String errorMessage = errorType.getMessage() + " - " + e.getMessage();
            ErrorResponse errorResponse = new ErrorResponse(errorType.getCode(), errorMessage);
            responseEntity = new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        return responseEntity;
    }

    /**
     * 사용자 삭제
     *
     * @param username
     * @return
     */
    @RequestMapping(value = "/{username}", method = RequestMethod.DELETE, produces = "application/json;charset=utf-8")
    public ResponseEntity delete(@PathVariable String username) {
        if (username == null || username.equals("")) {
            ErrorType errorType = ErrorType.USER_DELETE_INVALID_PROPERTY;
            String errorMessage = errorType.getMessage() + " - username";
            ErrorResponse errorResponse = new ErrorResponse(errorType.getCode(), errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        ResponseEntity responseEntity = null;
        try {
            this.userService.delete(username);
            responseEntity = new ResponseEntity(HttpStatus.OK);
        } catch (NullPointerException | NotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse(ErrorType.USER_DELETE_NOT_EXIST_USER);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        } catch (InvalidPropertyException e) {
            ErrorResponse errorResponse = new ErrorResponse(ErrorType.USER_DELETE_NO_PERMISSION);
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }

        return responseEntity;
    }
}
