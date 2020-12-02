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

    products.forEach((produtos) => {
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

    const result = await main.resultLucro(vendaName.value);
    const resultQuantidade = await main.getQuantidadeEstoqueVenda(vendaName.value);
    const lucro = (vendaValor.value - result.VALOR_COMPRA)
    const quantidadeFinalEstoque = (resultQuantidade.QUANTIDADE_PRODUTO_ESTOQUE - vendaQuantidade.value);

    const newVenda = {
        nome_produto_venda: vendaName.value,
        valor_venda: vendaValor.value,
        parcelas_venda: vendaParcela.value,
        quantidade_venda: vendaQuantidade.value,
        comissao: vendaComissao.value,
        responsavel_comissao: vendaResponsavelComissao.value,
        data_venda: data,
        lucro: lucro
    }
    
    await main.createVenda(newVenda);
    await main.updateQuantidadeEstoqueVenda(vendaName.value, quantidadeFinalEstoque )

});

async function init(){
    await getNomeProducts();
    
}

init();

