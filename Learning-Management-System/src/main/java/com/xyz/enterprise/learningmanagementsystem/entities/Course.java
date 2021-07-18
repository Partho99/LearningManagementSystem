package com.xyz.enterprise.learningmanagementsystem.entities;

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

    @OneToMany(cascade = CascadeType.ALL)
    private List<Section> sections;

    @ManyToOne(optional = false)
    private User user;

    @OneToMany(mappedBy = "course")
    private List<Tag> tags;

    @ManyToOne(cascade = CascadeType.DETACH, optional = false)
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
