package com.challenge.notes.dto.requests;

public class NoteRequestDTO {
  private Integer idNote;
  private Integer idUser;
  private String note;
  private Boolean archived;
  private String category;

  public Integer getIdUser() {
    return idUser;
  }

  public void setIdUser(Integer idUser) {
    this.idUser = idUser;
  }

  public String getNote() {
    return note;
  }

  public void setNote(String note) {
    this.note = note;
  }

  public Integer getIdNote() {
    return idNote;
  }

  public void setIdNote(Integer idNote) {
    this.idNote = idNote;
  }

  public Boolean getArchived() {
    return archived;
  }

  public void setArchived(Boolean archived) {
    this.archived = archived;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }
}
