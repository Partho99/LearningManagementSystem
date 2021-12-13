package com.xyz.enterprise.learningmanagementsystem.service;

import com.xyz.enterprise.learningmanagementsystem.entities.Topic;

import java.util.List;
import java.util.Optional;

public interface TopicService {

    List<Topic> findAll();

    Optional<Topic> findById(int id);

    Topic save(Topic topic);

    void saveAll(List<Topic> topics);

    Optional<Topic> findByName(String topicName);

    List<Topic> findTopicByCategoryName(String categoryName);
}
