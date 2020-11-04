const { BrowserWindow, Notification } = require("electron");
const { getConnection } = require("./database");


//const { mostrarPopup } = require('./ui/controller/registrar-produto');

// Produtos

async function createProduct(produtos){
    try {
        const conn = await getConnection();
        produtos.valor_minimo =  parseFloat(produtos.valor_minimo);
        produtos.valor_maximo =  parseFloat(produtos.valor_maximo);
        produtos.valor_compra =  parseFloat(produtos.valor_compra);
        produtos.quantidade =  parseInt(produtos.quantidade);
        const result = await conn.query('INSERT INTO produtos SET ?', produtos);
        //mostrarPopup();

        new Notification ({
          title: 'Cadastro de produto',
          body: 'Produto cadastrado com sucesso'
        }).show();

        produtos.id = result.insertId;            
        return produtos;
        

    } catch (error) {
      console.log(error);
    }
    
}

async function getProducts(){
  const conn = await getConnection();
  const results = await conn.query('SELECT * FROM produtos');
  //console.log(results);
  return results;
}  

async function deleteProduct(id){
  const conn = await getConnection();
  const result = await conn.query('DELETE FROM produtos WHERE CODIGO_PRODUTO = ?', id);
  //console.log(result);
  return result;
}

async function getProductById(id){
  const conn = await getConnection();
  try{
    const result = await conn.query('SELECT * FROM produtos WHERE CODIGO_PRODUTO = ?', id)
    //console.log(result[0]);
    return result[0];   
  }catch(error){
    console.log(error);
  }
} 

async function updateProduct(id, product){

  try {
    const conn = await getConnection();
    await conn.query('UPDATE produtos SET ? WHERE CODIGO_PRODUTO = ?', [product, id]);
    window.loadFile("src/ui/views/ver-produtos.html");

    new Notification ({
      title: 'Editar produto',
      body: 'Alteração feita com sucesso!'
    }).show();

  } catch (error) {
    console.log(error);
  }
  
}

//Vendas

async function getNomeProducts(){
  const conn = await getConnection();
  const results = await conn.query('SELECT produtos.NOME_PRODUTO FROM produtos');
  console.log(results);
  return results;
}

async function resultLucro(nome){
  const conn = await getConnection();
  const valorCompra = await conn.query('SELECT produtos.VALOR_COMPRA FROM produtos WHERE NOME_PRODUTO = ?', nome);
  return valorCompra[0];
}

async function createVenda(venda){
  try {
    const conn = await getConnection();
    venda.valor_venda = parseFloat(venda.valor_venda);
    venda.parcelas_venda = parseInt(venda.parcelas_venda);
    venda.quantidade_venda = parseInt(venda.quantidade_venda);
    venda.comissao = parseInt(venda.comissao);
    venda.lucro = parseInt(venda.lucro);
    const result = await conn.query('INSERT INTO vendas SET ?', venda)

    new Notification({
      title: 'Cadastro de venda',
      body: 'Venda cadastrada com sucesso'
    }).show()

    return venda
  } catch (error) {
    console.log(error)
  }
  
  
}

async function getVendas(){
  const conn = await getConnection();
  const result = await conn.query('SELECT * FROM vendas')
  return result
}

async function getVendaById(id){
  const conn = await getConnection();
  try {
    const result = await conn.query('SELECT * FROM vendas WHERE CODIGO_VENDA = ?', id)
    //console.log(result[0])
    return result[0]

  } catch (error) {
    console.log(error)
  }
  
}

async function updateVenda(venda, id){
  try {
    const conn = await getConnection();
    await conn.query('UPDATE vendas SET ? WHERE CODIGO_VENDA = ?', [venda, id])
    window.loadFile('src/ui/views/ver-vendas.html')
  } catch (error) {
    console.log(error)
  }
  

}

async function deleteVenda(id){
  try {
    const conn = await getConnection();
    const result = await conn.query('DELETE FROM vendas WHERE CODIGO_VENDA = ?', id);
    return result
  } catch (error) {
    
  }
}

async function deleteInfos(){
  const conn = await getConnection();
  const result = await conn.query('DELETE FROM vendas');
  return result
}

// Estoque 

async function createProductEstoque(productEstoque){
  try {
    const conn = await getConnection();
    const result = await conn.query('INSERT INTO estoque SET ?', productEstoque)
    console.log(result);
    return productEstoque

  } catch (error) {
    console.log(error)
  }
  
}

async function getEstoque(){
  try {
    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM estoque')
    return result
  } catch (error) {
    console.log(error)
  }
  
}

async function getQuantidadeEstoque(id){
  try {
    const conn = await getConnection();
    const quantidade = await conn.query('SELECT estoque.QUANTIDADE_PRODUTO_ESTOQUE FROM estoque WHERE CODIGO_ESTOQUE = ?', id)
    console.log(quantidade[0])
    return quantidade[0]
  } catch (error) {
    console.log(error);
  }
}

async function updateQuantidade(id, valor){
  try {
    const conn = await getConnection();
    await conn.query('UPDATE estoque SET estoque.QUANTIDADE_PRODUTO_ESTOQUE = ? WHERE CODIGO_ESTOQUE = ?', [valor, id])
  } catch (error) {
    console.log(error)
  }
}


let window;

function Redirecionar(){
  window.loadFile('src/ui/views/editar-produto.html');
}

function RedirecionarVenda(){
  window.loadFile('src/ui/views/editar-venda.html');
}

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.loadFile("src/ui/views/home.html");
}

module.exports = {
  //PRODUTOS
  createWindow,
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  Redirecionar,
  updateProduct,
  //VENDAS
  getNomeProducts,
  resultLucro,
  createVenda,
  getVendas,
  RedirecionarVenda,
  getVendaById,
  updateVenda,
  deleteVenda,
  deleteInfos,
  //ESTOQUE
  createProductEstoque,
  getEstoque,
  getQuantidadeEstoque,
  updateQuantidade
}