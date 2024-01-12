import React from 'react';
//Material
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import makeStyles from '@mui/styles/makeStyles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        height: '60px',
        display: 'flex',
        alignItems: 'center',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    text: {
        flexGrow: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 10,
        fontSize: 40
    },
}));
export default function MainBar(props) {
    const classes = useStyles();
    const { text, setShowCreatePanel, setShowNotePanel, setIsArchivedNote } = props;

    const handleOnClick = () => {
        setShowCreatePanel(true)
        setShowNotePanel(false)
        setIsArchivedNote(false)
    }
    //Main Bar with Create Button.
    return (
        <div >
            <AppBar>
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.text} >{`${text}`}</Typography>
                    <Button variant="contained"
                        size="large"
                        className={classes.menuButton}
                        startIcon={<SaveIcon />}
                        onClick={() => handleOnClick()}
                    >CREATE</Button>

                </Toolbar>
            </AppBar>
        </div>
    );
}

