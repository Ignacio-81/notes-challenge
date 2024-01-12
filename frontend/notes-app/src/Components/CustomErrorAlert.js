import { Alert, AlertTitle } from '@mui/material';

export default function CustomErrorAlert() {
    return (

        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Error while getting data...
        </Alert>

    )
}
