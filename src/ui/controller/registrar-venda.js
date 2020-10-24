const productForm = document.getElementById('productForm');

productForm.addEventListener('submit', (e) =>{
    e.preventDefault();

});

function mostrarPopup(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Venda registrada com sucesso!',
        showConfirmButton: false,
        timer: 5000
      })

      document.getElementById('productForm').reset();
}

