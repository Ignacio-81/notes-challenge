import { useState } from 'react';

//Material
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
//ContextApi
import useNotes from '../hooks/useNotes.js'

const useStyles = makeStyles((theme) => ({
    content: {
        height: '100%',
        width: '95%',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 70,
    },
    list: {
        width: '100%',
        maxWidth: 760,
        backgroundColor: theme.palette.background.list,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 250,
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.button.defaut
    },
}))

const NotesList = (props) => {
    const classes = useStyles();
    const { setShowNotePanel, setEditNoteInfo, setIsArchivedNote,getAllNotesForUser } = props
    const { response } = useNotes();
    const [searchText, setSearchText] = useState('');

    const handleOnClickNote = (e, noteText, id, category) => {
        setEditNoteInfo({ idNote: id, note: noteText, category: category })
        setShowNotePanel(true)
        setIsArchivedNote(false)
    }
    const handleOnClickArchivedNote = (e, noteText, id, category) => {
        setEditNoteInfo({ idNote: id, note: noteText, category: category })
        setIsArchivedNote(true)
        setShowNotePanel(true)
    }
    //Notes Lists Management and visualization
    return (
        <Grid item xs={6} sm container direction="column">
            <Grid item>
                <TextField id="cateogry-search"
                    label="Search Note by Category"
                    type="search"
                    variant="outlined"
                    onChange={(e) => { setSearchText(e.target.value) }}
                />
                <Button
                    variant="contained"
                    size="medium"
                    className={classes.button}
                    startIcon={<SearchIcon />}
                    onClick={() => getAllNotesForUser(searchText)}
                >
                    Search
                </Button>
            </Grid>
            {/* //Unarchived Notes */}
            <Typography variant="h6" className={classes.title}>
                UnArchived Notes
            </Typography>
            <List className={classes.list} >
                {response && response.unArchivedNotes && (response.unArchivedNotes.length > 0) ?
                    response.unArchivedNotes.map((item, index) => (
                        <ListItem button key={`unArchivedNotes-${index}`}>
                            <ListItemText
                                primary={`${item.notes}`}
                                secondary={item.category != null ? `Note ID - ${item.idUserNotes}` + ` / Category - ${item.category}` : `Note ID - ${item.idUserNotes}`}
                                onClick={(e) => handleOnClickNote(e, item.notes, item.idUserNotes, item.category)}
                            />
                        </ListItem>
                    ))
                    :
                    <ListItemText primary="No UnArchived Notes" />
                }
            </List>
            {/* //Archived Notes */}
            <Typography variant="h6" className={classes.title}>
                Archived Notes
            </Typography>
            <List className={classes.list} >
                {response && response.archivedNotes && response.archivedNotes.length > 0 ?
                    response.archivedNotes.map((item, index) => (
                        <ListItem button key={`archivedNotes-${index}`}>
                            <ListItemText
                                primary={`${item.notes}`}
                                secondary={item.category != null ? `Note ID - ${item.idUserNotes}` + ` / Category - ${item.category}` : `Note ID - ${item.idUserNotes}`}
                                onClick={(e) => handleOnClickArchivedNote(e, item.notes, item.idUserNotes, item.category)}
                            />

                        </ListItem>
                    ))
                    :
                    <ListItemText primary="No Archived Notes" />
                }
            </List>
        </Grid>
    )
}

export default NotesList
