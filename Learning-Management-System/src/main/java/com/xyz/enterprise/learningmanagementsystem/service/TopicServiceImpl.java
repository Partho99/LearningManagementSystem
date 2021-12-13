package com.xyz.enterprise.learningmanagementsystem.service;

import com.xyz.enterprise.learningmanagementsystem.entities.Topic;
import com.xyz.enterprise.learningmanagementsystem.repository.TopicRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;

    public TopicServiceImpl(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }


    @Override
    public List<Topic> findAll() {
        return topicRepository.findAll();
    }

    @Override
    public Optional<Topic> findById(int id) {
        return topicRepository.findById(id);
    }

    @Override
    public Topic save(Topic topic) {
        return topicRepository.save(topic);
    }

    @Override
    public void saveAll(List<Topic> topics) {
        topicRepository.saveAll(topics);
    }

    @Override
    public Optional<Topic> findByName(String topicName) {
        return topicRepository.findByName(topicName);
    }

    @Override
    public List<Topic> findTopicByCategoryName(String categoryName) {
        return topicRepository.findTopicByCategoryName(categoryName);
    }
}
