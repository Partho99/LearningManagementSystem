package com.xyz.enterprise.learningmanagementsystem.resources;

import com.xyz.enterprise.learningmanagementsystem.entities.Subject;
import com.xyz.enterprise.learningmanagementsystem.entities.Topic;
import com.xyz.enterprise.learningmanagementsystem.service.SubjectService;
import com.xyz.enterprise.learningmanagementsystem.service.TopicService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/topic/api/")
public class TopicResource {

    private final TopicService topicService;
    private final SubjectService subjectService;

    public TopicResource(TopicService topicService, SubjectService subjectService) {
        this.topicService = topicService;
        this.subjectService = subjectService;
    }

    @PostMapping("save")
    public void saveTopic(@RequestBody Topic topic) {
        List<Subject> subjects = subjectService.findAll();

        for (Subject s : subjects) {
            if (s.getId() == 1) {
                topic.setSubject(s);
            }
        }
        topicService.save(topic);
    }

    @GetMapping("all-topics")
    public List<Topic> showAllTopics() {
        return topicService.findAll();
    }

    @GetMapping("find-all-topic-by-category/{categoryName}")
    public List<Topic> showTopicByCategory(@PathVariable String categoryName) {
        return topicService.findTopicByCategoryName(categoryName);
    }
}
