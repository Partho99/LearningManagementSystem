package com.lms.authorizationserver.service;

import com.lms.authorizationserver.entities.User;
import com.lms.authorizationserver.repository.UserRepository;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service(value = "userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        User user = userRepository.findByEmail(email);

        if (user == null)
            throw new BadCredentialsException("Bad credentials");

        new AccountStatusUserDetailsChecker().check(user);

        return user;
    }
}
