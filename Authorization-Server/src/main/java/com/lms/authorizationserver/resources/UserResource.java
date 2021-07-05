package com.lms.authorizationserver.resources;

import com.lms.authorizationserver.entities.Role;
import com.lms.authorizationserver.entities.User;
import com.lms.authorizationserver.repository.RoleRepository;
import com.lms.authorizationserver.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserResource {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResource(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> register(@Validated @RequestBody User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setActiveStatus(true);
        List<Role> role = roleRepository.findAll();
        System.out.println(role);
        List<Role> uRole = new ArrayList<>();
        for (Role userRole : role) {
            if (userRole.getName().equalsIgnoreCase("role_user")) {
                uRole.add(userRole);
            }
        }
        user.setRoles(uRole);
        User savedUser = userRepository.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
}
