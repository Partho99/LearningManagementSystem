package com.xyz.enterprise.learningmanagementsystem.service;

import com.xyz.enterprise.learningmanagementsystem.entities.User;
import com.xyz.enterprise.learningmanagementsystem.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserService {

    public Optional<User> findByEmail(String email);

    public User saveUser(User user);

    List<User> findAllInstructor();
}
