import Swal from 'sweetalert2';

export const  sweet = Swal.mixin({
    customClass: {
      confirmButton: "btn  btn-primary swal-alert-btn  me-2",
      cancelButton: "btn  btn-primary swal-alert-btn cancel-form",
       icon: 'swal2-icon-size-reduced'
    },
    didOpen: (popup) => {
      popup.style.border = '1px solid #e5e5e5'; // Aplica el borde directamente
    },
    backdrop: `rgba(255,255,255,0.6)`,
    buttonsStyling: true,
    confirmButtonText: "Aceptar",
    showCloseButton: true,
  });

  export const showAlertError = (error:any) => {
    console.log({error})
    switch (error.status) {
      case 0:
        sweet.fire("Error!","Error de conexión", "error");
        break;
      case 500:
        sweet.fire("Error!","Error de servidor", "error");
        break;
      default:
        sweet.fire("Error!", error.error.message, "error");
        break;
    }
  }