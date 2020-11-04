const { remote } = require('electron');
const main = remote.require('./main');

let produtosEstoque = [];
const estoqueList = document.getElementById('assunto-table');
//const estoqueForm = document.getElementById('estoqueForm');
const adicionaValor = document.getElementById('input-adicionar-quantidade');

function popupAdicionar(id){
    document.getElementById('popup-adicionar-quantidade').style.display = 'block';
    localStorage.setItem('estoqueId', id);
}


function popupFechar(){
    document.getElementById('popup-adicionar-quantidade').style.display = 'none';
}


async function adicionarValor(){
    const idEstoque = localStorage.getItem('estoqueId');
    const result = await main.getQuantidadeEstoque(idEstoque);
    let valorInput = adicionaValor.value;
    valorInput = parseInt(valorInput)
    const valorTotal = (result.QUANTIDADE_PRODUTO_ESTOQUE + valorInput)
                   await main.updateQuantidade(idEstoque, valorTotal);
    console.log(result.QUANTIDADE_PRODUTO_ESTOQUE)
    popupFechar();
    getProducts();
}



function renderEstoque(productEstoque){
    estoqueList.innerHTML = '';
    productEstoque.forEach(estoque => {
        estoqueList.innerHTML += `
        <tr>
        <td class="cabecalho">${estoque.NOME_PRODUTO_ESTOQUE}</td>
        <td class="cabecalho">${estoque.CODIGO_ESTOQUE}</td>
        <td class="cabecalho">${estoque.QUANTIDADE_PRODUTO_ESTOQUE}</td>
        <td class="cabecalho"><button onclick="popupAdicionar(${estoque.CODIGO_ESTOQUE})"type="button" id="button-adicionar">Adicionar</button></td>
        </tr>
        `
    });
}

async function getProducts() {
    produtosEstoque = await main.getEstoque();
    renderEstoque(produtosEstoque);
}

getProducts()