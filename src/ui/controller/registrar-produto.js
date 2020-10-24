const Swal = require('sweetalert2')

function mostrarPopup(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Produto registrado com sucesso!',
        showConfirmButton: false,
        timer: 5000
      })
}

module.exports = {
    mostrarPopup
}