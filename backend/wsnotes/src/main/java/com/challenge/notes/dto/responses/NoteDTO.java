package com.challenge.notes.dto.responses;

import com.challenge.notes.entities.UserNotes;
import java.util.List;
/**
 * DTO to manage Requests
 *
 */
public class NoteDTO {

    List<UserNotes> archivedNotes;
    List<UserNotes> unArchivedNotes;

    public NoteDTO(){}
    public NoteDTO(List<UserNotes> archivedNotes, List<UserNotes> unArchievedNotes) {
        this.archivedNotes = archivedNotes;
        this.unArchivedNotes = unArchievedNotes;
    }

    public List<UserNotes> getArchivedNotes() {
        return archivedNotes;
    }

    public void setArchivedNotes(List<UserNotes> archivedNotes) {
        this.archivedNotes = archivedNotes;
    }

    public List<UserNotes> getUnArchivedNotes() {
        return unArchivedNotes;
    }

    public void setUnArchivedNotes(List<UserNotes> unArchivedNotes) {
        this.unArchivedNotes = unArchivedNotes;
    }
}
