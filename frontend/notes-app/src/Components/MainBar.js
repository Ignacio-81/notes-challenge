import React from 'react';
//Material
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';


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

