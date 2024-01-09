//SweetAlert
import Swal from 'sweetalert2'

export const updateCreateErrorMsg = (delAction) => {
    Swal.fire({
        icon: "error",
        title: delAction ? "Error Delete" : "Error Update/Create",
        text: delAction ? "Error while deleting Note, please try again" : "Error while saving or creating Note, please try again",
    })
  }

  export const updateCreateOKMsg = (delAction) => {
    Swal.fire({
        icon: "success",
        title: delAction ? "Data Delete" : "Data Update/Create",
        text: delAction ? "data was deleted successfully" : "Data was updated/created successfully",
    })
  }