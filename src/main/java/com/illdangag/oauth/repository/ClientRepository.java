package com.illdangag.oauth.repository;

import com.illdangag.oauth.repository.model.Client;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClientRepository extends MongoRepository<Client, String> {
    Client findByClientId(String clientId);
}
