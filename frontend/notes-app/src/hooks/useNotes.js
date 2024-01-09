import { useContext } from 'react'
import NotesContext from '../context/notesProvider.js'

const useNotes = () => {
    return useContext(NotesContext)
}

export default useNotes