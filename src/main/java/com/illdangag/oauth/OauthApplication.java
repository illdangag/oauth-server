package com.illdangag.oauth;

import com.illdangag.oauth.repository.model.Client;
import com.illdangag.oauth.repository.model.User;
import com.illdangag.oauth.service.ClientService;
import com.illdangag.oauth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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
		if (this.userService.readByUsername(this.adminUsername) == null) {
			User user = new User(this.adminUsername, this.adminPassword, "ADMIN");
			this.userService.create(user);
		}

		if (this.clientService.readByClientId(this.adminClientId) == null) {
			Client client = new Client();

			client.setClientId(this.adminClientId);
			client.setClientSecret(this.adminClientSecret);

			client.setAuthorities("CLIENT");
			client.setScope("all");
			client.setGrantTypes("password", "client_credentials", "refresh_token");
			client.setRedirectUri("");

			client.setAccessTokenValiditySeconds(3600);
			client.setRefreshTokenValiditySeconds(86400);

			client.setAutoApprove(false);

			this.clientService.create(client);
		}
	}
}
