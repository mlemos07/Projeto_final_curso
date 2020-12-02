const { remote } = require('electron');
const main = remote.require('./main');

const productForm = document.getElementById('productForm');
const productName = document.getElementById('nome-produto');
const productValueMin = document.getElementById('valor-minimo');
const productValueMax = document.getElementById('valor-maximo');
const productValueCompra = document.getElementById('valor-compra');
const productQuantidade = document.getElementById('quantidade');



productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    

    const newProduct = {
        nome_produto: productName.value,
        valor_minimo: productValueMin.value,
        valor_maximo: productValueMax.value,
        valor_compra: productValueCompra.value,
        quantidade: productQuantidade.value
    }

    const newProductEstoque = {
        nome_produto_estoque: productName.value,
        quantidade_produto_estoque: productQuantidade.value
    }


    const result = await main.createProduct(newProduct);
    const estoque = await main.createProductEstoque(newProductEstoque);

    productForm.submit();

    
}); 



