package com.xyz.enterprise.learningmanagementsystem.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.List;

@Entity
public class Course extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "overview_id")
    private CourseOverview overview;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(cascade = CascadeType.ALL)
    private List<Section> sections;

    @ManyToOne(optional = false,cascade = CascadeType.DETACH,fetch = FetchType.EAGER)
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "course")
    private List<Tag> tags;

    @ManyToOne(cascade = CascadeType.DETACH, optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

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

    public CourseOverview getOverview() {
        return overview;
    }

    public void setOverview(CourseOverview overview) {
        this.overview = overview;
    }

    public List<Section> getSections() {
        return sections;
    }

    public void setSections(List<Section> sections) {
        this.sections = sections;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }
}
