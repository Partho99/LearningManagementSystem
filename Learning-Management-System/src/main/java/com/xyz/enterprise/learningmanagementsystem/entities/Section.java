package com.xyz.enterprise.learningmanagementsystem.entities;

import javax.persistence.*;
import java.util.List;

@Entity
public class Section extends AuditableEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Lob
    private String overview;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<VideoContent> videoContents;

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

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public List<VideoContent> getVideoContents() {
        return videoContents;
    }

    public void setVideoContents(List<VideoContent> videoContents) {
        this.videoContents = videoContents;
    }
}
