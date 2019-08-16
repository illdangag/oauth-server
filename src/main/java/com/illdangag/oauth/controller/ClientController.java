package com.illdangag.oauth.controller;

import com.illdangag.oauth.repository.model.Client;
import com.illdangag.oauth.repository.model.User;
import com.illdangag.oauth.service.ClientService;
import com.illdangag.oauth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Client> getClientList(HttpServletRequest request) {
        System.out.println(request.isUserInRole("ADMIN"));
        return this.clientService.read();
    }
}
