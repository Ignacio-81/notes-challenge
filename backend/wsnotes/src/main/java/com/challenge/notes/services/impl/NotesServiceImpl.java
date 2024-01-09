package com.challenge.notes.services.impl;

import com.challenge.notes.dto.requests.NoteRequestDTO;
import com.challenge.notes.dto.responses.NoteDTO;
import com.challenge.notes.entities.UserNotes;
import com.challenge.notes.repositories.NotesRepository;
import com.challenge.notes.services.INotesService;
import com.challenge.notes.utils.messages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import static com.challenge.notes.utils.Const.EMPTY_STRING;
import static com.challenge.notes.utils.Const.IS_ARCHIVE;
import static com.challenge.notes.utils.Const.IS_NOT_ARCHIVE;
import static com.challenge.notes.utils.messages.ERROR_ID_UPDATE;
import static com.challenge.notes.utils.messages.ERROR_PARAM_UPDATE;

@Service
public class NotesServiceImpl implements INotesService {

  @Autowired private NotesRepository notesRepository;

  /**
   * Find Notes by user ID
   *
   * @param, userID
   * @return, List of Notes
   */
  @Override
  public NoteDTO findByUserId(int userID, String category) {
    List<UserNotes> notesList = notesRepository.getUserNotesByUserId(userID);
    if (notesList.isEmpty()) {
      throw new NoSuchElementException(messages.NO_NOTES_FOUND);
    }
    if (category != null) {
      List<UserNotes> categoryList =
          notesList.stream()
              .filter(userNotes -> category.equalsIgnoreCase(userNotes.getCategory()))
              .collect(Collectors.toList());
      notesList = categoryList;
    }
    List<UserNotes> archivedNotes = new ArrayList<>();
    List<UserNotes> unarchivedNotes = new ArrayList<>();
    for (UserNotes note : notesList) {
      (note.getArchive() ? archivedNotes : unarchivedNotes).add(note);
    }
    return new NoteDTO(archivedNotes, unarchivedNotes);
  }

  /**
   * Create a new Note for User ID
   *
   * @param, userID
   * @return,
   */
  @Override
  public UserNotes createNoteByUser(int userID, String note, String category) {
    UserNotes newNote = new UserNotes();
    newNote.setUserId(userID);
    newNote.setArchive(false);
    newNote.setNotes(note);
    newNote.setCategory(category);
    return notesRepository.save(newNote);
  }

  /**
   * Update Note
   *
   * @param, noteID, note
   * @return, updated note
   */
  @Override
  public UserNotes updateNote(NoteRequestDTO request) {
    if (request.getIdNote() == null) throw new IllegalArgumentException(ERROR_ID_UPDATE);
    if (request.getNote() == null && request.getArchived() == null)
      throw new IllegalArgumentException(ERROR_PARAM_UPDATE);
    UserNotes noteToUpdate =
        notesRepository.findById(request.getIdNote()).orElseThrow(NoSuchElementException::new);
    if (request.getNote() != null) noteToUpdate.setNotes(request.getNote());
    noteToUpdate.setArchive(IS_ARCHIVE.equals(request.getArchived()) ? IS_ARCHIVE : IS_NOT_ARCHIVE);
    noteToUpdate.setCategory(
        (EMPTY_STRING.equals(request.getCategory()) || request.getCategory() == null)
            ? null
            : request.getCategory());
    return notesRepository.save(noteToUpdate);
  }

  /**
   * Delete Note
   *
   * @param, noteID
   */
  @Override
  public void deleteNote(Integer noteID) {
    if (noteID == null) throw new IllegalArgumentException(ERROR_ID_UPDATE);
    UserNotes noteToDelete =
        notesRepository.findById(noteID).orElseThrow(NoSuchElementException::new);
    notesRepository.delete(noteToDelete);
  }
}
