const { remote } = require('electron');
const main = remote.require('./main');

let vendas = []
const vendaList = document.getElementById('assunto-table');

async function Receber(id){
    await main.RedirecionarVenda()
    localStorage.setItem('VendaId', id)
}

async function deleteProduct(id){
    const response = confirm("Realmente deseja excluir esta venda?");
    if(response){
        await main.deleteVenda(id);
        await getVenda();
    } return;
}


function renderVendas(vendas){
    vendaList.innerHTML = '';
    vendas.forEach(vendas => {
        vendaList.innerHTML += `
        <tr>
        <td class="cabecalho">${vendas.NOME_PRODUTO_VENDA}</td>
        <td class="cabecalho">${vendas.QUANTIDADE_VENDA}</td>
        <td class="cabecalho">${vendas.DATA_VENDA}</td>
        <td class="cabecalho">R$ ${vendas.VALOR_VENDA}</td>
        <td class="cabecalho">${vendas.PARCELAS_VENDA}</td>
        <td class="cabecalho">R$ ${vendas.COMISSAO}</td>
        <td class="cabecalho">${vendas.RESPONSAVEL_COMISSAO}</td>
        <td class="cabecalho" id="campo-lucro">R$ ${vendas.LUCRO}</td>
        <td class="campo-editar" class="cabecalho"><button type="button" id="button-editar" onclick="Receber(${vendas.CODIGO_VENDA})">Editar</button></td>
        <td class="campo-editar" class="cabecalho"><button type="button" id="button-editar" onclick="deleteProduct(${vendas.CODIGO_VENDA})">Excluir</button></td>
        </tr>
        `
    });
}

async function deleteInfo(){
    const response = confirm("Tem certeza que deseja reiniciar as vendas?")
    if(response){
        await main.deleteInfos()
        getVenda()
    } return   
}

const getVenda = async () =>{
    vendas = await main.getVendas();
    renderVendas(vendas)

}

async function init(){
    await getVenda();
}
 
init();