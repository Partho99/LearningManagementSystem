package com.xyz.enterprise.learningmanagementsystem.service;

import com.xyz.enterprise.learningmanagementsystem.entities.User;
import com.xyz.enterprise.learningmanagementsystem.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User saveUser(User user) {
        return null;
    }

    @Override
    public List<User> findAllInstructor() {
        return userRepository.findAllInstructor();
    }
}
