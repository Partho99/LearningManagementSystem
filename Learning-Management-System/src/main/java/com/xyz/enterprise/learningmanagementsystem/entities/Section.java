package com.xyz.enterprise.learningmanagementsystem.entities;

import javax.persistence.*;
import java.util.List;

@Entity
public class Section extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String sectionName;

    @Lob
    private String sectionOverview;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<VideoContent> videoContents;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSectionName() {
        return sectionName;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

    public String getSectionOverview() {
        return sectionOverview;
    }

    public void setSectionOverview(String sectionOverview) {
        this.sectionOverview = sectionOverview;
    }

    public List<VideoContent> getVideoContents() {
        return videoContents;
    }

    public void setVideoContents(List<VideoContent> videoContents) {
        this.videoContents = videoContents;
    }
}
