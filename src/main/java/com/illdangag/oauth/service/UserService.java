package com.illdangag.oauth.service;

import com.illdangag.oauth.repository.UserRepository;
import com.illdangag.oauth.repository.model.User;
import com.illdangag.oauth.service.exception.DuplicateException;
import com.illdangag.oauth.service.exception.InvalidPropertyException;
import com.illdangag.oauth.service.exception.NotFoundException;
import com.illdangag.oauth.service.exception.PropertyNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Value("${oauth.admin.username}")
    private String adminUsername;

    @Autowired
    private UserRepository userRepository;

    public User create(User user) throws DuplicateException, PropertyNotFoundException, InvalidPropertyException {
        User resultUser = null;

        if (user == null) {
            throw new NullPointerException();
        }

        if (user.getUsername() == null) {
            throw new PropertyNotFoundException("username");
        } else if (user.getUsername().equals("")) {
            throw new InvalidPropertyException("username");
        }

        if (this.userRepository.findByUsername(user.getUsername()) != null) {
            throw new DuplicateException();
        }

        String password = user.getPassword();
        if (password == null) {
            throw new PropertyNotFoundException("password");
        } else if (password.equals("")) {
            throw new InvalidPropertyException("password");
        }
        resultUser = this.userRepository.save(user);

        return resultUser;
    }

    public List<User> read() {
        return this.userRepository.findAll();
    }

    public User readByUsername(String username) throws NotFoundException {
        User user = this.userRepository.findByUsername(username);

        if (user == null) {
            throw new NotFoundException();
        }

        return user;
    }

    public User update(User user) throws NotFoundException, InvalidPropertyException {
        if (user == null) {
            throw new NullPointerException();
        }

        if (this.userRepository.findByUsername(user.getUsername()) == null) {
            throw new NotFoundException();
        }

        String newPassword = user.getPassword();
        if (newPassword != null && newPassword.equals("")) {
            throw new InvalidPropertyException("password");
        }

        return this.userRepository.save(user);
    }

    public void delete(String username) throws NotFoundException, InvalidPropertyException {
        if (username.equals(this.adminUsername)) {
            throw new InvalidPropertyException();
        }

        User user = this.readByUsername(username);

        if (user == null) {
            throw new NotFoundException();
        }

        this.userRepository.delete(user);
    }
}
