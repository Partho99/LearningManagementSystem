package com.xyz.enterprise.learningmanagementsystem.object_mapper.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.xyz.enterprise.learningmanagementsystem.entities.Section;
import com.xyz.enterprise.learningmanagementsystem.entities.Topic;
import com.xyz.enterprise.learningmanagementsystem.entities.User;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public class CoursePageDto {
    private long id;
    private String name;
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Optional<Date> created_time;
    private Optional<String> createdBy;
    private Optional<RatingDetailsDto> rating_details;
    private Topic topic;
    private User user;

    public List<Section> getSections() {
        return sections;
    }

    public void setSections(List<Section> sections) {
        this.sections = sections;
    }

    private List<Section> sections;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Optional<Date> getCreated_time() {
        return created_time;
    }

    public void setCreated_time(Optional<Date> created_time) {
        this.created_time = created_time;
    }

    public Optional<String> getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Optional<String> createdBy) {
        this.createdBy = createdBy;
    }

    public Optional<RatingDetailsDto> getRating_details() {
        return rating_details;
    }

    public void setRating_details(Optional<RatingDetailsDto> rating_details) {
        this.rating_details = rating_details;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
