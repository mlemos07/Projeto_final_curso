const { remote } = require('electron');
const main = remote.require('./main');


const productForm = document.getElementById('productForm');
const vendaName = document.getElementById('nome-produto'); 
const vendaValor = document.getElementById('valor-venda');
const vendaParcela = document.getElementById('parcelas');
const vendaQuantidade = document.getElementById('quantidade');
const vendaComissao = document.getElementById('comissao');
const vendaResponsavelComissao = document.getElementById('responsavel-comissao');

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

idVenda = '';
let resultVenda = '';

async function edit(){
   
    const id = localStorage.getItem('VendaId');
    resultVenda = await main.getVendaById(id)
    console.log(resultVenda);

    vendaName.value = resultVenda.NOME_PRODUTO_VENDA
    vendaValor.value = resultVenda.VALOR_VENDA
    vendaParcela.value = resultVenda.PARCELAS_VENDA
    vendaQuantidade.value = resultVenda.QUANTIDADE_VENDA
    vendaComissao.value = resultVenda.COMISSAO
    vendaResponsavelComissao.value = resultVenda.RESPONSAVEL_COMISSAO
    idVenda = resultVenda.CODIGO_VENDA;
    
}

productForm.addEventListener('submit', async (e) =>{
    e.preventDefault();

    const result = await main.resultLucro(vendaName.value);
    //console.log(result)

    //console.log(result.VALOR_COMPRA)
    const lucro = (vendaValor.value - result.VALOR_COMPRA)
    //console.log(lucro)


    const newVenda = {
        nome_produto_venda: vendaName.value,
        valor_venda: vendaValor.value,
        parcelas_venda: vendaParcela.value,
        quantidade_venda: vendaQuantidade.value,
        comissao: vendaComissao.value,
        responsavel_comissao: vendaResponsavelComissao.value,
        data_venda: resultVenda.DATA_VENDA,
        lucro: lucro
    }

    await main.updateVenda(newVenda, idVenda);


});

edit();

async function init(){
    await getNomeProducts();
    
}

init();


