import { useState, useEffect } from 'react';
//ContextApi
import useNotes from '../hooks/useNotes.js'
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
//Components
import MainBar from './MainBar.js';
import NotesList from './NotesList.js';
import Note from './Note.js';
import CustomErrorAlert from './CustomErrorAlert.js';
import CustomLoading from './CustomLoading.js';
//Utils
import { updateCreateErrorMsg, updateCreateOKMsg } from '../Utils/messageHelper.js'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginLeft: '2vw',
        marginRight: '2vw',
    },
    button: {
        margin: theme.spacing(1),
    },
    content: {
        height: '100%',
        width: '95%',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 70,
    },
    noteWindow: {
        width: '100%',
        margin: `${theme.spacing(1)} auto`,
        padding: theme.spacing(2),
    },
    list: {
        width: '100%',
        maxWidth: 760,
        backgroundColor: theme.palette.background.list,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 250,
    },
}))

export default function Form() {
    const classes = useStyles();
    const { request, setRequest, getNotes, loading, comError, dataModifOK, setDataModifOK, dataDelOK, setDataDelOK } = useNotes()
    const [showCreatePanel, setShowCreatePanel] = useState(false);
    const [showSelectdNote, setShowNotePanel] = useState(false);
    const [isArchivedNote, setIsArchivedNote] = useState(false);
    const [editNoteInfo, setEditNoteInfo] = useState({});
    const [dataError, setDataError] = useState(false);


    const getAllNotesForUser = (category) => {
        const newRequest = request
        newRequest.idUser = 1 //User id will be harcoded for this version.
        newRequest.category = category != null && category != '' ? category : null;
        setRequest(newRequest)
        getNotes(request)
    }
    //Get information on component Load
    useEffect(() => {
        getAllNotesForUser(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Manage user message for data modification
    useEffect(() => {
        if (!loading){
            console.log(loading, comError)
            if (!dataModifOK && !dataDelOK && comError) {
                setDataError(true)

                return 
            }
        if ((dataModifOK || dataDelOK) && !comError) {
            updateCreateOKMsg(dataDelOK ? true : false)
            setDataModifOK(false)
            setDataDelOK(false)
            setDataError(false)
            getAllNotesForUser()
        }
        if ((!dataModifOK || !dataDelOK) && comError) {
            updateCreateErrorMsg(dataDelOK ? true : false)
        }
    }
    }, [loading])

    return (
        <div className={classes.root}>
            {/* //Main Bar */}
            <MainBar
                text='Notes Manager'
                setShowCreatePanel={setShowCreatePanel}
                setShowNotePanel={setShowNotePanel}
                setIsArchivedNote={setIsArchivedNote}
            />
            {/* //Messages Form */}
            <main className={classes.content}>
                {
                    dataError ? <CustomErrorAlert /> :
                        loading ? <CustomLoading loading={loading} /> :
                            <Grid
                                container
                                direction="row"
                                justifyContent='space-evenly'
                                alignItems="flex-start"
                                spacing={2}
                                className={classes.root}
                            >
                                <NotesList
                                    setShowNotePanel={setShowNotePanel}
                                    setEditNoteInfo={setEditNoteInfo}
                                    setIsArchivedNote={setIsArchivedNote}
                                    getAllNotesForUser={getAllNotesForUser}
                                />
                                <Note
                                    showCreatePanel={showCreatePanel}
                                    setShowCreatePanel={setShowCreatePanel}
                                    showSelectdNote={showSelectdNote}
                                    setShowNotePanel={setShowNotePanel}
                                    editNoteInfo={editNoteInfo}
                                    isArchivedNote={isArchivedNote}
                                    setIsArchivedNote={setIsArchivedNote}
                                />
                            </Grid>
                }
            </main>
        </div>
    )
}
