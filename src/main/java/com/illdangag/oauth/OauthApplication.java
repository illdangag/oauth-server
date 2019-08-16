package com.illdangag.oauth;

import com.illdangag.oauth.repository.ClientRepository;
import com.illdangag.oauth.repository.UserRepository;
import com.illdangag.oauth.repository.model.Client;
import com.illdangag.oauth.repository.model.User;
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
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class OauthApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ClientRepository clientRepository;
	@Lazy
	@Autowired
	private PasswordEncoder passwordEncoder;

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
		if (this.userRepository.findByUsername(this.adminUsername) == null) {
			List<GrantedAuthority> authorities = new ArrayList<>();
			authorities.add(new SimpleGrantedAuthority("ADMIN"));

			User user = new User(this.adminUsername, passwordEncoder.encode(this.adminPassword), authorities);
			this.userRepository.save(user);
		}

		if (this.clientRepository.findByClientId(this.adminClientId) == null) {
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

			this.clientRepository.save(client);
		}
	}
}
