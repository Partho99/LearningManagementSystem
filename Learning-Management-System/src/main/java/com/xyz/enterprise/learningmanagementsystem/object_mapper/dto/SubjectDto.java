package com.xyz.enterprise.learningmanagementsystem.object_mapper.dto;

import com.xyz.enterprise.learningmanagementsystem.entities.SubjectDescription;
import com.xyz.enterprise.learningmanagementsystem.entities.Topic;

import java.util.List;

public class SubjectDto {

    private int id;
    private String name;
    private SubjectDescription description;
    private List<Topic> topics;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SubjectDescription getDescription() {
        return description;
    }

    public void setDescription(SubjectDescription description) {
        this.description = description;
    }

    public List<Topic> getTopics() {
        return topics;
    }

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
    }
}
