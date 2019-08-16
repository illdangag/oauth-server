package com.illdangag.oauth.security.detail;

import com.illdangag.oauth.repository.ClientRepository;
import com.illdangag.oauth.repository.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.ClientDetails;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.ClientRegistrationException;
import org.springframework.security.oauth2.provider.client.BaseClientDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomClientDetailsService implements ClientDetailsService {
    @Autowired
    ClientRepository clientRepository;

    @Override
    @Transactional
    public ClientDetails loadClientByClientId(String clientId) throws ClientRegistrationException {
        Client client = this.clientRepository.findByClientId(clientId);
        return new BaseClientDetails(client);
    }
}

