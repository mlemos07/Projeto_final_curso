const { remote } = require('electron');
const main = remote.require('./main');


const productForm = document.getElementById('productForm');
const vendaName = document.getElementById('nome-produto'); 
const vendaValor = document.getElementById('valor-venda');
const vendaParcela = document.getElementById('parcelas');
const vendaQuantidade = document.getElementById('quantidade');
const vendaComissao = document.getElementById('comissao');
const vendaResponsavelComissao = document.getElementById('responsavel-comissao');

let products = [];

const getNomeProducts = async () => {
    products = await main.getNomeProducts();
    renderProducts(products);
}

function renderProducts(products) {
    vendaName.innerHTML = "";
    products.forEach((produtos) => {
        //console.log(produtos)
        vendaName.innerHTML += `
        <option value="${produtos.NOME_PRODUTO}">${produtos.NOME_PRODUTO}</option>
        `;
        });
};

const time = new Date();
const dia = time.getDate();
const mes = time.getMonth() + 1;
const ano = time.getFullYear();
const data = `${dia}/${mes}/${ano}`;


productForm.addEventListener('submit', async (e) =>{
    e.preventDefault();


    const newProduct = {
        nome_produto_venda: vendaName.value,
        valor_venda: vendaValor.value,
        parcelas_venda: vendaParcela.value,
        quantidade_venda: vendaQuantidade.value,
        comissao: vendaComissao.value,
        responsavel_comissao: vendaResponsavelComissao.value,
        data_venda = data,
        lucro
    }

});

async function init(){
    await getNomeProducts();
    
}

init();

