const { remote } = require('electron');
const main = remote.require('./main');


const productsList = document.getElementById('assunto-table');


let products = [];

async function deleteProduct(id){
    const response = confirm("Realmente deseja excluir este produto?");
    if(response){
        await main.deleteProduct(id);
        await getProducts();
    } return;
}


async function Receber(id){
    await main.Redirecionar();
    localStorage.setItem('Produtoid', id);
}


function renderProducts(products) {
    productsList.innerHTML = "";
    products.forEach((produtos) => {
        productsList.innerHTML += `
        <tr>
        <td class="cabecalho">${produtos.NOME_PRODUTO}</td>
        <td class="cabecalho">${produtos.CODIGO_PRODUTO}</td>
        <td class="cabecalho">${produtos.VALOR_MINIMO}</td>
        <td class="cabecalho">${produtos.VALOR_MAXIMO}</td>
        <td class="cabecalho">${produtos.VALOR_COMPRA}</td>
        <td class="cabecalho">${produtos.QUANTIDADE}</td>
        <td class="cabecalho"><button id="button-editar" onclick="Receber('${produtos.CODIGO_PRODUTO}')">Editar</button></td>
        <td class="cabecalho"><button onclick="deleteProduct('${produtos.CODIGO_PRODUTO}')">Excluir</button></td>
        </tr>
        `;

        });
    }

const getProducts  = async () => {
    products = await main.getProducts();
    renderProducts(products);
}

async function init(){
   await getProducts();
}

init();