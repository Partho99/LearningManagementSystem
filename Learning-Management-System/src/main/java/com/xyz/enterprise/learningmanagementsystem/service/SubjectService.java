package com.xyz.enterprise.learningmanagementsystem.service;

import com.xyz.enterprise.learningmanagementsystem.entities.Subject;

import java.util.List;
import java.util.Optional;

public interface SubjectService {

    List<Subject> findAll();

    Optional<Subject> findById(int id);

    Subject save(Subject subject);

    void saveAll(List<Subject> subjects);

    Optional<Subject> findByName(String subjectName);

}
