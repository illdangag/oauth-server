package com.illdangag.oauth.controller;

import com.illdangag.oauth.controller.request.ClientRequest;
import com.illdangag.oauth.controller.response.ClientResponse;
import com.illdangag.oauth.controller.response.ErrorResponse;
import com.illdangag.oauth.controller.response.type.ErrorType;
import com.illdangag.oauth.repository.model.Client;
import com.illdangag.oauth.service.ClientService;
import com.illdangag.oauth.service.exception.DuplicateException;
import com.illdangag.oauth.service.exception.InvalidPropertyException;
import com.illdangag.oauth.service.exception.NotFoundException;
import com.illdangag.oauth.service.exception.PropertyNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/clients")
public class ClientController {
    @Lazy
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ClientService clientService;

    @Value("${oauth.admin.clientId}")
    private String adminClientId;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity create(@RequestBody ClientRequest clientRequest) {
        Client client = clientRequest.toClient();

        String clientSecret = client.getClientSecret();
        if (clientSecret == null || clientSecret.isEmpty()) {
            ErrorType errorType = ErrorType.CLIENT_CREATE_INVALID_PROPERTY;
            String errorMessage = errorType.getMessage() + " - client secret";
            ErrorResponse errorResponse = new ErrorResponse(errorType.getCode(), errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        ResponseEntity responseEntity = null;
        try {
            client.setClientSecret(this.passwordEncoder.encode(client.getClientSecret()));
            this.clientService.create(client);
            responseEntity = new ResponseEntity(HttpStatus.CREATED);
        } catch (NullPointerException | PropertyNotFoundException | InvalidPropertyException e) {
            ErrorType errorType = ErrorType.CLIENT_CREATE_INVALID_PROPERTY;
            String errorMessage = errorType.getMessage() + " - " + e.getMessage();
            ErrorResponse errorResponse = new ErrorResponse(errorType.getCode(), errorMessage);
            responseEntity = new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        } catch (DuplicateException e) {
            ErrorType errorType = ErrorType.CLIENT_CREATE_DUPLICATED_CLIENT_ID;
            String errorMessage = errorType.getMessage() + " - " + e.getMessage();
            ErrorResponse errorResponse = new ErrorResponse(errorType.getCode(), errorMessage);
            responseEntity = new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
        }
        return responseEntity;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity readList(@RequestParam(required = false, defaultValue = "false") String includedAdmin) {
        List<Client> clientList = this.clientService.read();
        List<ClientResponse> clientResponseList = new ArrayList<>();

        for (Client client : clientList) {
            if (!client.getClientId().equals(adminClientId) ||
                    includedAdmin.equalsIgnoreCase("true")) {
                clientResponseList.add(new ClientResponse(client));
            }
        }

        return new ResponseEntity<>(clientResponseList, HttpStatus.OK);
    }

    @RequestMapping(value = "/{clientId}", method =  RequestMethod.GET)
    public ResponseEntity read(@PathVariable String clientId) {
        if (clientId == null || clientId.equals("")) {
            ErrorType errorType = ErrorType.CLIENT_READ_INVALID_PROPERTY;
            String errorMessage = errorType.getMessage() + " - client id";
            ErrorResponse errorResponse = new ErrorResponse(errorType.getCode(), errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        ResponseEntity responseEntity = null;
        try {
            Client client = this.clientService.readByClientId(clientId);
            responseEntity = new ResponseEntity<>(new ClientResponse(client), HttpStatus.OK);
        } catch (NotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse(ErrorType.CLIENT_READ_NOT_EXIST_CLIENT);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(ErrorType.UNKNOWN_ERROR);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        return responseEntity;
    }

    @RequestMapping(value = "", method = RequestMethod.PATCH, produces = "application/json;charset=utf-8")
    public ResponseEntity update(@RequestBody ClientRequest clientRequest) {
        String clientId = clientRequest.getClientId();
        String clientSecret = clientRequest.getClientSecret();

        if (clientId == null || clientId.isEmpty()) {
            ErrorType errorType = ErrorType.CLIENT_UPDATE_INVALID_PROPERTY;
            String errorMessage = errorType.getMessage() + " - client id";
            ErrorResponse errorResponse = new ErrorResponse(errorType.getCode(), errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        Client dbClient = null;
        try {
            dbClient = this.clientService.readByClientId(clientId);
        } catch (NotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse(ErrorType.CLIENT_UPDATE_NOT_EXIST_CLIENT);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        if (clientRequest.getClientSecret() != null) {
            dbClient.setClientSecret(this.passwordEncoder.encode(clientSecret));
        }

        if (clientRequest.getResourceIds() != null) {
            dbClient.setResourceIds(clientRequest.getResourceIds());
        }
        if (clientRequest.getScope() != null) {
            dbClient.setScope(clientRequest.getScope());
        }
        if (clientRequest.getGrantTypes() != null) {
            dbClient.setGrantTypes(clientRequest.getGrantTypes());
        }
        if (clientRequest.getAuthorities() != null) {
            dbClient.setGrantTypes(clientRequest.getAuthorities());
        }
        if (clientRequest.getAccessTokenValiditySeconds() != null) {
            dbClient.setAccessTokenValiditySeconds(clientRequest.getAccessTokenValiditySeconds());
        }
        if (clientRequest.getRefreshTokenValiditySeconds() != null) {
            dbClient.setRefreshTokenValiditySeconds(clientRequest.getRefreshTokenValiditySeconds());
        }
        if (clientRequest.getAutoApprove() != null) {
            dbClient.setAutoApprove(clientRequest.getAutoApprove());
        }

        ResponseEntity responseEntity = null;
        try {
            this.clientService.update(dbClient);
            responseEntity = new ResponseEntity(HttpStatus.OK);
        } catch (NotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse(ErrorType.CLIENT_UPDATE_NOT_EXIST_CLIENT);
            responseEntity = new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        } catch (InvalidPropertyException e) {
            ErrorType errorType = ErrorType.CLIENT_UPDATE_INVALID_PROPERTY;
            String errorMessage = errorType.getMessage() + " - " + e.getMessage();
            ErrorResponse errorResponse = new ErrorResponse(errorType.getCode(), errorMessage);
            responseEntity = new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        return responseEntity;
    }

    @RequestMapping(value = "/{clientId}", method = RequestMethod.DELETE, produces = "application/json;charset=utf-8")
    public ResponseEntity delete(@PathVariable String clientId) {
        if (clientId == null || clientId.equals("")) {
            ErrorType errorType = ErrorType.CLIENT_DELETE_INVALID_PROPERTY;
            String errorMessage = errorType.getMessage() + " - client id";
            ErrorResponse errorResponse = new ErrorResponse(errorType.getCode(), errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        ResponseEntity responseEntity = null;
        try {
            this.clientService.delete(clientId);
            responseEntity = new ResponseEntity(HttpStatus.OK);
        } catch (NullPointerException | NotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse(ErrorType.CLIENT_DELETE_NOT_EXIST_CLIENT);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        } catch (InvalidPropertyException e) {
            ErrorResponse errorResponse = new ErrorResponse(ErrorType.CLIENT_DELETE_NO_PERMISSION);
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }

        return responseEntity;
    }
}
