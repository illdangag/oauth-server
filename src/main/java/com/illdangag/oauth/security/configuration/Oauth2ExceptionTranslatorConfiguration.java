package com.illdangag.oauth.security.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.common.exceptions.OAuth2Exception;
import org.springframework.security.oauth2.provider.error.DefaultWebResponseExceptionTranslator;
import org.springframework.security.oauth2.provider.error.WebResponseExceptionTranslator;

import java.sql.Timestamp;

@Configuration
public class Oauth2ExceptionTranslatorConfiguration {
    @Bean
    public WebResponseExceptionTranslator oauth2ResponseExceptionTranslator() {
        return new DefaultWebResponseExceptionTranslator() {

            @Override
            public ResponseEntity<OAuth2Exception> translate(Exception e) throws Exception {

                ResponseEntity<OAuth2Exception> responseEntity = super.translate(e);
                OAuth2Exception body = responseEntity.getBody();
                HttpStatus statusCode = responseEntity.getStatusCode();

                Timestamp timestamp = new Timestamp(System.currentTimeMillis());
                body.addAdditionalInformation("timestamp", timestamp.toString());
                body.addAdditionalInformation("status", "" + body.getHttpErrorCode());
                body.addAdditionalInformation("message", body.getMessage());
                body.addAdditionalInformation("code", body.getOAuth2ErrorCode().toUpperCase());

                HttpHeaders headers = new HttpHeaders();
                headers.setAll(responseEntity.getHeaders().toSingleValueMap());
                // do something with header or response
                return new ResponseEntity<>(body, headers, statusCode);
            }
        };
    }
}
