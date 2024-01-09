//NotesProvider for API communication 
import { useState, createContext } from 'react'
import { URL_NOTES, URL_CREATE_NOTES, URL_UPDATE_NOTES } from '../Utils/consts.js'
const NotesContext = createContext()

const NotesProvider = ({ children }) => {

    const [request, setRequest] = useState({
        idUser: null,
        idNote: null,
        note: null
    })
    const [response, setResponse] = useState({})
    const [loading, setLoading] = useState(false)
    const [comError, setComError] = useState(false)
    const [dataModifOK, setDataModifOK] = useState(false)
    const [dataDelOK, setDataDelOK] = useState(false)
    
    //Get All Notes for user , Request: iserId
    const getNotes = async request => {
        setLoading(true)
        setComError(false)
        fetch(URL_NOTES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify(request)
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json()
                        .then(data => {
                            setResponse(data.body)
                            setLoading(false)
                        })
                } else {
                    setComError(true)
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
                setComError(true)
                setLoading(false)
            })

    }
    //Update Note , Request: Could receive noteId, note, archived
    const updateNote = async request => {
        setLoading(true)    
        setComError(false)
        setDataModifOK(false)
        fetch(URL_UPDATE_NOTES, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json()
                        .then(data => {
                            if (data.status === 202) {
                                setDataModifOK(true)
                                setLoading(false)
                            }
                        })
                } else {
                    setComError(true)
                   setLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
                setComError(true)
                setLoading(false)
            })
    }
    //Delete note, request: noteId
    const deleteNote = async request => {
        setLoading(true)
        setComError(false)
        setDataDelOK(true)
        fetch(URL_NOTES, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify(request)
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json()
                        .then(data => {
                            if (data.status === 202) {
                            setDataDelOK(true)
                            setLoading(false)
                            }else{
                                setComError(true)
                                setLoading(false)  
                            }
                        })
                } else {
                    setComError(true)
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
                setComError(true)
                setLoading(false)
            })
    }
    //Create Note, Request: userID, note
    const createNote = async request => {
        setLoading(true)
        setComError(false)
        setDataModifOK(true)
        fetch(URL_CREATE_NOTES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json()
                        .then(data => {
                            if (data.status === 201) {
                            setDataModifOK(true)
                            setLoading(false)
                            }else{
                                setComError(true)
                                setLoading(false)  
                            }
                        })
                } else {
                    setComError(true)
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
                setComError(true)
                setLoading(false)
            })
    }


    return (
        <NotesContext.Provider
            value={{
                request,
                setRequest,
                response,
                loading,
                comError,
                getNotes,
                createNote,
                updateNote,
                deleteNote,
                dataModifOK,
                setDataModifOK,
                dataDelOK,
                setDataDelOK
            }}
        >
            {children}
        </NotesContext.Provider>
    )
}

export {
    NotesProvider
}
export default NotesContext