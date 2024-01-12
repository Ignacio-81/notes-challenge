import React from 'react'; 
import makeStyles from '@mui/styles/makeStyles';
import { CircularProgress, Backdrop } from '@mui/material';
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1300,
        color: '#fff',
    } 
}));
const CustomLoading = props => {
    const { loading } = props
    const classes = useStyles();
    return (
        <Backdrop open={loading} className={classes.backdrop} >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};
export default CustomLoading;