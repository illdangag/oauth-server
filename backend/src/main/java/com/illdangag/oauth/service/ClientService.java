package com.illdangag.oauth.service;

import com.illdangag.oauth.repository.ClientRepository;
import com.illdangag.oauth.repository.model.Client;
import com.illdangag.oauth.service.exception.DuplicateException;
import com.illdangag.oauth.service.exception.InvalidPropertyException;
import com.illdangag.oauth.service.exception.NotFoundException;
import com.illdangag.oauth.service.exception.PropertyNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    @Value("${oauth.admin.clientId}")
    private String adminClientId;

    @Autowired
    private ClientRepository clientRepository;

    public Client create(Client client) throws PropertyNotFoundException, DuplicateException, InvalidPropertyException {
        if (client == null) {
            throw new NullPointerException();
        }

        if (client.getClientId() == null) {
            throw new PropertyNotFoundException("client id");
        } else if (client.getClientSecret() == null) {
            throw new PropertyNotFoundException("client secret");
        }

        if (this.clientRepository.findByClientId(client.getClientId()) != null) {
            throw new DuplicateException("client id");
        }

        String clientSecret = client.getClientSecret();
        if (clientSecret.equals("")) {
            throw new InvalidPropertyException("client secret");
        }

        return this.clientRepository.save(client);
    }

    public List<Client> read() {
        return this.clientRepository.findAll();
    }

    public Client readByClientId(String clientId) throws NotFoundException {
        Client client = this.clientRepository.findByClientId(clientId);

        if (client == null) {
            throw new NotFoundException();
        }

        return client;
    }

    public Client update(Client client) throws NotFoundException, InvalidPropertyException {
        if (client == null) {
            throw new NullPointerException();
        }

        if (this.clientRepository.findByClientId(client.getClientId()) == null) {
            throw new NotFoundException();
        }

        String clientSecret = client.getClientSecret();
        if (clientSecret != null && clientSecret.equals("")) {
            throw new InvalidPropertyException("client secret");
        }

        return this.clientRepository.save(client);
    }

    public Client delete(String clientId) throws InvalidPropertyException, NotFoundException {
        if (clientId != null && clientId.equals(this.adminClientId)) {
            throw new InvalidPropertyException();
        }

        Client client = this.clientRepository.findByClientId(clientId);

        if (client == null) {
            throw new NotFoundException();
        }

        this.clientRepository.delete(client);
        return client;
    }
}
