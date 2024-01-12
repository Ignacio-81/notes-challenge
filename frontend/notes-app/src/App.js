//Meterial UI
import { createTheme, adaptV4Theme } from '@mui/material/styles';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';

//Fonts
import '@fontsource/roboto';

//Components
import Form from './Components/Form.js';

//COntextApi
import { NotesProvider } from "./context/notesProvider.js"


//Creamos en Tema para la aplicacion customizando MUI
const theme = createTheme(adaptV4Theme({
    typography: {
        "textAlign": 'left',
    },
    palette: {
        primary: {
            main: '#0a4894fe',
            secondary: '#4b4b4b',
        },
        secondary: {
            main: '#747474',
            secondary: '#ffff',
        },
        textColor: {
            text1: '938f8f',
            text2: 'white',
        },
        background: {
            list: '#b4b4b4'
        },
        button:{
            save: '#00FF00',
            delete: '#DE3163',
            default: '#999999'
        }
    }

}))
function App() {
    return (
        <NotesProvider>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <Form />
                </ThemeProvider>
            </StyledEngineProvider>
        </NotesProvider>
    );
}

export default App;
