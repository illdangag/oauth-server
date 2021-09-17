package com.illdangag.oauth;

import com.illdangag.oauth.repository.model.Client;
import com.illdangag.oauth.repository.model.User;
import com.illdangag.oauth.service.ClientService;
import com.illdangag.oauth.service.UserService;
import com.illdangag.oauth.service.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.aggregation.BooleanOperators;
import org.springframework.security.access.method.P;

@SpringBootApplication
public class OauthApplication implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private ClientService clientService;

    @Value("${oauth.admin.username}")
    private String adminUsername;

    @Value("${oauth.admin.password}")
    private String adminPassword;

    @Value("${oauth.admin.clientId}")
    private String adminClientId;

    @Value("${oauth.admin.clientSecret}")
    private String adminClientSecret;

    public static void main(String[] args) {
        SpringApplication.run(OauthApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            this.userService.readByUsername(this.adminUsername);
        } catch (NotFoundException exception) {
            User user = new User(this.adminUsername);
            user.setPassword(this.adminPassword);
            user.setAuthorities("ADMIN");
            user.setEnabled(true);
            this.userService.create(user);
        }

        try {
            this.clientService.readByClientId(this.adminClientId);
        } catch (NotFoundException exception) {
            Client client = new Client(this.adminClientId, this.adminClientSecret);

            client.setAuthorities("ADMIN");
            client.setScope("all");
            client.setGrantTypes("password", "client_credentials", "refresh_token");

            this.clientService.create(client);
        }
    }
}
