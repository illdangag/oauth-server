package com.illdangag.oauth.repository.model.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.illdangag.oauth.repository.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class UserDeserializer extends JsonDeserializer<User> {
    @Override
    public User deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        ObjectCodec objectCodec = parser.getCodec();
        JsonNode jsonNode = objectCodec.readTree(parser);

        String username = jsonNode.get("username").asText();
        String password = jsonNode.get("password").asText();

        List<GrantedAuthority> authorities = new ArrayList<>();

        for(JsonNode authNode : jsonNode.path("authorities")) {
            String authority = authNode.asText();
            authorities.add(new SimpleGrantedAuthority(authority));
        }
        return new User(username, password);
    }
}
