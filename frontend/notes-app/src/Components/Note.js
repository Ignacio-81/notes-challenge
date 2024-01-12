import { useState, useEffect } from 'react'
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

//ContextApi
import useNotes from '../hooks/useNotes.js'
const useStyles = makeStyles((theme) => ({
    buttonSave: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.button.save
    },
    buttonDelete: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.button.delete
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.button.defaut
    },
    noteWindow: {
        width: '100%',
        margin: `${theme.spacing(1)} auto`,
        padding: theme.spacing(2),
    },
    categoryText: {
       /*  width: '100%', */
        margin: `${theme.spacing(1)} auto`,
        padding: theme.spacing(2),
    }
}))

const Note = (props) => {
    const classes = useStyles();
    const { showCreatePanel, setShowCreatePanel, showSelectdNote, setShowNotePanel, editNoteInfo, isArchivedNote, setIsArchivedNote } = props
    const { createNote, updateNote, deleteNote } = useNotes()
    const [noteText, setNoteText] = useState('');
    const [noteCategory, setNoteCategory] = useState('');
    useEffect(() => {
        if (editNoteInfo != '') {
            setNoteText(editNoteInfo.note)
            setNoteCategory(editNoteInfo.category != null ? editNoteInfo.category : '')
        }
    }, [editNoteInfo])

    const handleOnClickSave = () => {
        if (showCreatePanel) {
            createNote({ idUser: 1, note: noteText, category: noteCategory !=null && noteCategory != '' ? noteCategory : null })
            setShowCreatePanel(false)
        }
        if (showSelectdNote) {
            updateNote({ idNote: editNoteInfo.idNote, note: noteText, category: noteCategory !=null && noteCategory != '' ? noteCategory : null })
            setShowNotePanel(false)
        }
    }
    const handleNoteChange = (event) => {
        setNoteText(event.target.value);
    };
    const handleOnClickDelete = () => {
        deleteNote({ idNote: editNoteInfo.idNote })
        setShowNotePanel(false)
        setIsArchivedNote(false)
    }
    const handleOnClickArchive = () => {
        updateNote({ idNote: editNoteInfo.idNote, archived: !isArchivedNote ? true : false })
    }
    
    //Note Management behaviour change for each function: Create, Updata, Delete.
    return (
        <Grid item xs={6} sm container alignItems="stretch" >
            {(showCreatePanel || showSelectdNote) ?
                <>
                    <Grid item direction="row" justifyContent="center" container>
                        <Typography variant="h3" className={classes.title}>
                            Note:
                        </Typography>
                        {!isArchivedNote ?
                            <Button
                                variant="contained"
                                size="small"
                                className={classes.buttonSave}
                                startIcon={<SaveIcon />}
                                onClick={handleOnClickSave}
                            >
                                Save
                            </Button>
                            : null}
                        {showSelectdNote ?
                            <>
                                <Button
                                    variant="contained"
                                    size="small"
                                    className={classes.button}
                                    startIcon={isArchivedNote ? <UnarchiveIcon /> : <ArchiveIcon />}
                                    onClick={handleOnClickArchive}
                                >
                                    {isArchivedNote ? "UnArchive Note" : "Archive Note"}
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    className={classes.buttonDelete}
                                    startIcon={<DeleteIcon />}
                                    onClick={handleOnClickDelete}
                                >
                                    Delete
                                </Button>
                            </> : null}
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            id="note-category"
                            label="Category :"
                            disabled={isArchivedNote}
                            value={noteCategory}
                            onChange={(e)=>{setNoteCategory(e.target.value)}}
                            variant="outlined"
                            className={classes.categoryText}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="note-text"
                            label="Note :"
                            disabled={isArchivedNote}
                            multiline
                            value={noteText}
                            onChange={handleNoteChange}
                            variant="outlined"
                            className={classes.noteWindow}
                        />
                    </Grid>
                </> : null}
        </Grid>
    )
}

export default Note
