package com.challenge.notes.repositories;

import com.challenge.notes.entities.UserNotes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/** Notes Repository */
@Repository
public interface NotesRepository extends JpaRepository<UserNotes, Integer> {
  List<UserNotes> getUserNotesByUserId(Integer userId);
}
