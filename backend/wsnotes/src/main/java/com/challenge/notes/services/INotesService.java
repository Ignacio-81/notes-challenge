package com.challenge.notes.services;

import com.challenge.notes.dto.requests.NoteRequestDTO;
import com.challenge.notes.dto.responses.NoteDTO;
import com.challenge.notes.entities.UserNotes;

public interface INotesService {
  NoteDTO findByUserId(int userID, String category);

  UserNotes createNoteByUser(int userID, String note, String category);

  UserNotes updateNote(NoteRequestDTO request);

  void deleteNote(Integer noteID);
}
