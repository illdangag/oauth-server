package com.illdangag.oauth.security.detail;

import com.illdangag.oauth.repository.UserRepository;
import com.illdangag.oauth.repository.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User dbUser = this.userRepository.findByUsername(username);

        if (dbUser != null) {
            org.springframework.security.core.userdetails.User user = new org.springframework.security.core.userdetails.User(
                    dbUser.getUsername(), dbUser.getPassword(), dbUser.getAuthorities());
            return user;
        } else {
            throw new UsernameNotFoundException(String.format("User '%s' not found", username));
        }
    }

}
