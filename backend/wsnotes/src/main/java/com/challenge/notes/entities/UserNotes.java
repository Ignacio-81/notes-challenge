package com.challenge.notes.entities;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/** Notes Entity */
@Entity
@Table(name = "user_notes", schema = "notes", catalog = "")
public class UserNotes {
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Id
  @Column(name = "iduser_notes")
  private int idUserNotes;

  @Basic
  @Column(name = "user_id")
  private Integer userId;

  @Basic
  @Column(name = "notes")
  private String notes;

  @Basic
  @Column(name = "is_archive")
  private Boolean isArchive;

  @Column(name = "category")
  private String category;

  public int getIdUserNotes() {
    return idUserNotes;
  }

  public void setIdUserNotes(int iduserNotes) {
    this.idUserNotes = iduserNotes;
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public String getNotes() {
    return notes;
  }

  public void setNotes(String notes) {
    this.notes = notes;
  }

  public Boolean getArchive() {
    return isArchive;
  }

  public void setArchive(Boolean archive) {
    isArchive = archive;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }
}
