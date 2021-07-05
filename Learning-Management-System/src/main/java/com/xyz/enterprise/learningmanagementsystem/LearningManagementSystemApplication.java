package com.xyz.enterprise.learningmanagementsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.security.oauth2.provider.token.store.jwk.JwkTokenStore;

@SpringBootApplication
public class LearningManagementSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(LearningManagementSystemApplication.class, args);
    }

}