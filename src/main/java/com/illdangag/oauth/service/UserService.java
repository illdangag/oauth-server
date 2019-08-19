package com.illdangag.oauth.service;

import com.illdangag.oauth.repository.UserRepository;
import com.illdangag.oauth.repository.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User create(User user) {
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        return this.userRepository.save(user);
    }

    public List<User> read() {
        return this.userRepository.findAll();
    }

    public User readByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }
}
