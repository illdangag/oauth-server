package com.illdangag.oauth.service;

import com.illdangag.oauth.repository.ClientRepository;
import com.illdangag.oauth.repository.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public Client create(Client client) {
        return this.clientRepository.save(client);
    }

    public List<Client> read() {
        return this.clientRepository.findAll();
    }

    public Client readByClientId(String clientId) {
        return this.clientRepository.findByClientId(clientId);
    }
}
