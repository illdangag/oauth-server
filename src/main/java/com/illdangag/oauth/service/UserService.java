package com.illdangag.oauth.service;

import com.illdangag.oauth.repository.UserRepository;
import com.illdangag.oauth.repository.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Lazy
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    public User create(User user) throws Exception {
        // TODO: 비밀번호가 없는 경우 exception
        User resultUser = null;

        if (this.userRepository.findByUsername(user.getUsername()) != null) {
            throw new Exception();
        } else {
            user.setPassword(this.passwordEncoder.encode(user.getPassword()));
            resultUser = this.userRepository.save(user);
        }

        return resultUser;
    }

    public List<User> read() {
        return this.userRepository.findAll();
    }

    public User readByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }
}
