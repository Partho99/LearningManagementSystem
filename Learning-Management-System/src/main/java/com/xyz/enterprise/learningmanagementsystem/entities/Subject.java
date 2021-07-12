package com.xyz.enterprise.learningmanagementsystem.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
public class Subject extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String name;

    @OneToMany(cascade = CascadeType.DETACH, mappedBy = "subject",fetch = FetchType.EAGER)
    private List<Topic> topics;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "description_id")
    private SubjectDescription description;

    @JsonIgnore
    @OneToMany(mappedBy = "subject")
    private List<Tag> tags;

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

    public List<Topic> getTopics() {
        return topics;
    }

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
    }

    public SubjectDescription getDescription() {
        return description;
    }

    public void setDescription(SubjectDescription description) {
        this.description = description;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }
}
