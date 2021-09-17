package com.illdangag.oauth.repository;

import com.illdangag.oauth.repository.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
}
