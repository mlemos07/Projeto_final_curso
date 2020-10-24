const { remote } = require('electron');
const main = remote.require('./main.js');



const productForm = document.getElementById('productForm');
const productName = document.getElementById('nome-produto');
const productValueMin = document.getElementById('valor-minimo');
const productValueMax = document.getElementById('valor-maximo');
const productValueCompra = document.getElementById('valor-compra');
const productQuantidade = document.getElementById('quantidade');

let editProductId = '';
async function edit(){ 
        const id = localStorage.getItem('Produtoid');
        const product = await main.getProductById(id);
        console.log(product)


        productName.value = product.NOME_PRODUTO;
        productValueMin.value = product.VALOR_MINIMO;
        productValueMax.value = product.VALOR_MAXIMO;
        productValueCompra.value = product.VALOR_COMPRA;
        productQuantidade.value = product.QUANTIDADE;
        editProductId = product.CODIGO_PRODUTO; 

        
        
        
}
edit();

productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        

        const newProduct = {
                nome_produto: productName.value,
                valor_minimo: productValueMin.value,
                valor_maximo: productValueMax.value,
                valor_compra: productValueCompra.value,
                quantidade: productQuantidade.value
        }
        const response = confirm("Realmente deseja salvar com esses valores?");
                if(response){
                await main.updateProduct(editProductId, newProduct);
        } return;
        
})



 