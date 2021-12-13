package com.lms.authorizationserver.resources;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.lms.authorizationserver.configuration.OAuth2Configuration;
import com.lms.authorizationserver.entities.Role;
import com.lms.authorizationserver.entities.User;
import com.lms.authorizationserver.repository.RoleRepository;
import com.lms.authorizationserver.repository.UserRepository;
import com.lms.authorizationserver.utils.AuthMetaData;
import net.minidev.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.*;

@RestController
@RequestMapping("/api/user")
public class UserResource {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final OAuth2Configuration oAuth2Configuration;

    public UserResource(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder,
                        OAuth2Configuration oAuth2Configuration) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.oAuth2Configuration = oAuth2Configuration;
    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registeringUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setActiveStatus(true);
        List<Role> role = roleRepository.findAll();
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
    public ResponseEntity<?> registeringGoogleUser(@RequestBody Object idTokenString) throws GeneralSecurityException, IOException {
        JSONObject obj = new JSONObject((Map<String, ?>) idTokenString);
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(AuthMetaData.CLIENT_ID))
                .build();

        GoogleIdToken idToken = verifier.verify((String) obj.get("idTokenString"));

        if (idToken != null) {
            Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            boolean emailVerified = payload.getEmailVerified();
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");

            if (userRepository.findByEmail(email) != null) {
                User loadUser = userRepository.findByEmail(email);
                Map<String, String> currentUser = new HashMap<>();
                Map<String, Object> response = new HashMap<>();
                loadUser.setImageUrl(pictureUrl);
                loadUser.setActiveStatus(emailVerified);

                userRepository.save(loadUser);

                currentUser.put("email", loadUser.getEmail());
                currentUser.put("scope", String.valueOf(loadUser.getAuthorities()));
                currentUser.put("fullName", loadUser.getFullName());
                currentUser.put("image_url", loadUser.getImageUrl());
                currentUser.put("access_token", String.valueOf(oAuth2Configuration.token(loadUser)));

                response.put("user", currentUser);
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            } else {
                User user = new User();
                Map<String, String> currentUser = new HashMap<>();
                Map<String, Object> response = new HashMap<>();
                user.setEmail(email);
                user.setPassword(passwordEncoder.encode(obj.getAsString("idTokenString").substring(11, 31)));
                user.setFullName(name);
                user.setImageUrl(pictureUrl);
                user.setActiveStatus(emailVerified);
                List<Role> role = roleRepository.findAll();
                List<Role> uRole = new ArrayList<>();
                for (Role userRole : role) {
                    if (userRole.getName().equalsIgnoreCase("role_user")) {
                        uRole.add(userRole);
                    }
                }
                user.setRoles(uRole);
                User savedUser = userRepository.save(user);

                currentUser.put("email", savedUser.getEmail());
                currentUser.put("scope", String.valueOf(savedUser.getAuthorities()));
                currentUser.put("fullName", savedUser.getFullName());
                currentUser.put("image_url", savedUser.getImageUrl());
                currentUser.put("access_token", String.valueOf(oAuth2Configuration.token(savedUser)));
                response.put("user", currentUser);
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

    }

    @PostMapping(value = "/register-facebook-user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registeringFacebookUser(@RequestBody Object fbObject) {
        JSONObject obj = new JSONObject((Map<String, ?>) fbObject);
        RestTemplate restTemplate = new RestTemplate();
        Object facebookObject = restTemplate.getForObject(AuthMetaData.fbUrl + obj.getAsString("accessToken"), Object.class);
        JSONObject checkFbAuth = new JSONObject((Map<String, ?>) facebookObject);
        String fbTokenUserFullName = checkFbAuth.getAsString("name");

        if (fbTokenUserFullName.equals(obj.getAsString("fullName"))) {
            if (userRepository.findByEmail(obj.getAsString("email")) != null) {
                User user = userRepository.findByEmail(obj.getAsString("email"));
                Map<String, String> currentUser = new HashMap<>();
                Map<String, Object> response = new HashMap<>();
                user.setId(user.getId());
                user.setFullName(obj.getAsString("fullName"));
                user.setImageUrl(obj.getAsString("imageUrl"));
                user.setActiveStatus(true);
                List<Role> role = roleRepository.findAll();
                List<Role> uRole = new ArrayList<>();
                for (Role userRole : role) {
                    if (userRole.getName().equalsIgnoreCase("role_user")) {
                        uRole.add(userRole);
                    }
                }
                user.setRoles(uRole);
                User savedUser = userRepository.save(user);

                currentUser.put("email", savedUser.getEmail());
                currentUser.put("scope", String.valueOf(savedUser.getAuthorities()));
                currentUser.put("fullName", savedUser.getFullName());
                currentUser.put("image_url", savedUser.getImageUrl());
                currentUser.put("access_token", String.valueOf(oAuth2Configuration.token(savedUser)));

                response.put("user", currentUser);

                return new ResponseEntity<>(response, HttpStatus.CREATED);
            } else {
                User user = new User();
                Map<String, String> currentUser = new HashMap<>();
                Map<String, Object> response = new HashMap<>();
                user.setEmail(obj.getAsString("email"));
                user.setPassword(passwordEncoder.encode(obj.getAsString("password")));
                user.setFullName(obj.getAsString("fullName"));
                user.setImageUrl(obj.getAsString("imageUrl"));
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

                currentUser.put("email", savedUser.getEmail());
                currentUser.put("scope", String.valueOf(savedUser.getAuthorities()));
                currentUser.put("fullName", savedUser.getFullName());
                currentUser.put("image_url", savedUser.getImageUrl());
                currentUser.put("access_token", String.valueOf(oAuth2Configuration.token(savedUser)));

                response.put("user", currentUser);
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
}
