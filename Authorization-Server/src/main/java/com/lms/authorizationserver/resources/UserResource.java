package com.lms.authorizationserver.resources;

import com.lms.authorizationserver.entities.Role;
import com.lms.authorizationserver.entities.User;
import com.lms.authorizationserver.repository.RoleRepository;
import com.lms.authorizationserver.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserResource {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    private String noUses;

    public UserResource(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registeringUser(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
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

    @PostMapping(value = "/register-google-user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registeringGoogleUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            user.setId(userRepository.findByEmail(user.getEmail()).getId());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setFullName(user.getFullName());
            user.setImageUrl(user.getImageUrl());
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
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setFullName(user.getFullName());
        user.setImageUrl(user.getImageUrl());
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

    @PostMapping(value = "/register-facebook-user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registeringFacebookUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            user.setId(userRepository.findByEmail(user.getEmail()).getId());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setFullName(user.getFullName());
            user.setImageUrl(user.getImageUrl());
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
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setFullName(user.getFullName());
        user.setImageUrl(user.getImageUrl());
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

    @PutMapping(value = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updatingUser(@RequestBody User user) {
        User principal = (User) SecurityContextHolder
                .getContext().getAuthentication()
                .getPrincipal();
        return null;
    }
}
