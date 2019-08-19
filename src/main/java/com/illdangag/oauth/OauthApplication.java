package com.illdangag.oauth;

import com.illdangag.oauth.repository.model.Client;
import com.illdangag.oauth.repository.model.User;
import com.illdangag.oauth.repository.model.type.UserAuthority;
import com.illdangag.oauth.service.ClientService;
import com.illdangag.oauth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class OauthApplication implements CommandLineRunner {

	@Lazy
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserService userService;
	@Autowired
	private ClientService clientService;

	public static void main(String[] args) {
		SpringApplication.run(OauthApplication.class, args);
	}

	@Value("${oauth.admin.username}")
	private String adminUsername;
	@Value("${oauth.admin.password}")
	private String adminPassword;
	@Value("${oauth.admin.clientId}")
	private String adminClientId;
	@Value("${oauth.admin.clientSecret}")
	private String adminClientSecret;

	@Override
	public void run(String... args) throws Exception {
		if (this.userService.readByUsername(this.adminUsername) == null) {
			User user = new User(this.adminUsername, passwordEncoder.encode(this.adminPassword));
			user.setAuthorities(UserAuthority.ADMIN);
			this.userService.create(user);
		}

		if (this.clientService.readByClientId(this.adminClientId) == null) {
			Client client = new Client();
			client.setIdx(0);
			client.setAuthorities("CLIENT");
			client.setAutoApprove(false);
			client.setClientId(this.adminClientId);
			client.setClientSecret(passwordEncoder.encode(this.adminClientSecret));
			client.setGrantTypes("password,client_credentials,refresh_token");
			client.setRedirectUri("");
			client.setScope("all");
			client.setAccessTokenValiditySeconds(3600);
			client.setRefreshTokenValiditySeconds(86400);

			this.clientService.create(client);
		}
	}
}
