package com.challenge.notes.controller;

import com.challenge.notes.dto.requests.NoteRequestDTO;
import com.challenge.notes.dto.responses.NoteDTO;
import com.challenge.notes.dto.responses.ResponseDTO;
import com.challenge.notes.services.INotesService;
import com.challenge.notes.utils.messages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.ResourceAccessException;
import java.util.NoSuchElementException;

/** notes Controller */
@RestController
@RequestMapping("/notes")
public class NotesController {

  @Autowired private INotesService iNotesService;

  @PostMapping()
  @CrossOrigin(value = "http://localhost:3000")
  public ResponseDTO findAll(@RequestBody NoteRequestDTO request) {
    try {
      NoteDTO result = iNotesService.findByUserId(request.getIdUser(), request.getCategory());
      return ResponseDTO.general(HttpStatus.OK, result);
    } catch (NoSuchElementException e) {
      return ResponseDTO.custom(HttpStatus.NOT_FOUND, e.getMessage());
    }
  }

  @PostMapping("/create")
  @CrossOrigin(value = "http://localhost:3000")
  public ResponseDTO createNoteByUser(@RequestBody NoteRequestDTO request) {
    try {
      return ResponseDTO.general(
          HttpStatus.CREATED,
          iNotesService.createNoteByUser(request.getIdUser(), request.getNote(), request.getCategory()));
    } catch (ResourceAccessException e) {
      return ResponseDTO.custom(HttpStatus.GATEWAY_TIMEOUT, messages.CONNECTION_ERROR_MESSAGE);
    }
  }

  @PutMapping("/update")
  @CrossOrigin(value = "http://localhost:3000")
  public ResponseDTO updateNote(@RequestBody NoteRequestDTO request) {
    try {
      return ResponseDTO.general(
          HttpStatus.ACCEPTED,
          iNotesService.updateNote(request));
    } catch (NoSuchElementException e) {
      return ResponseDTO.custom(HttpStatus.NOT_FOUND, e.getMessage());
    } catch (IllegalArgumentException e) {
      return ResponseDTO.custom(HttpStatus.NOT_FOUND, e.getMessage());
    }
  }

  @DeleteMapping()
  @CrossOrigin(value = "http://localhost:3000")
  public ResponseDTO deleteNote(@RequestBody NoteRequestDTO request) {
    try {
      iNotesService.deleteNote(request.getIdNote());
      return ResponseDTO.general(HttpStatus.ACCEPTED, "OK");
    } catch (NoSuchElementException e) {
      return ResponseDTO.custom(HttpStatus.NOT_FOUND, e.getMessage());
    } catch (IllegalArgumentException e) {
      return ResponseDTO.custom(HttpStatus.NOT_FOUND, e.getMessage());
    }
  }
}
