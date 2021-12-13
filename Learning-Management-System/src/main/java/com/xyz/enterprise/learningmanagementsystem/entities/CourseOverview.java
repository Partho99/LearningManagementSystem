package com.xyz.enterprise.learningmanagementsystem.entities;

import javax.persistence.*;

@Entity
public class CourseOverview extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Lob
    private String courseOverview;

    @Lob
    private String learningFromThisCourse;

    @Lob
    private String eligibleForThisCourse;

    @Lob
    private String courseIncludes;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCourseOverview() {
        return courseOverview;
    }

    public void setCourseOverview(String courseOverview) {
        this.courseOverview = courseOverview;
    }

    public String getLearningFromThisCourse() {
        return learningFromThisCourse;
    }

    public void setLearningFromThisCourse(String learningFromThisCourse) {
        this.learningFromThisCourse = learningFromThisCourse;
    }

    public String getEligibleForThisCourse() {
        return eligibleForThisCourse;
    }

    public void setEligibleForThisCourse(String eligibleForThisCourse) {
        this.eligibleForThisCourse = eligibleForThisCourse;
    }

    public String getCourseIncludes() {
        return courseIncludes;
    }

    public void setCourseIncludes(String courseIncludes) {
        this.courseIncludes = courseIncludes;
    }
}
