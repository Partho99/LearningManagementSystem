package com.lms.authorizationserver.resources;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@RestController
public class GoogleClient {

    @GetMapping
    public String welcome(@AuthenticationPrincipal OAuth2User user) {
        return "Welcome to Google Mr." + user.getAttribute("idToken.tokenValue");
    }

    @GetMapping("/user")
    public Principal user(Principal principal) {
        System.out.println("username --> " + principal.getName());
        return principal;
    }

    @GetMapping("/user/me")
    public Map<String, Object> userDetails(@AuthenticationPrincipal OAuth2User user) {
        OAuth2User u = user;

        System.out.println(user.getAuthorities());
        return user.getAttributes();
    }
}
