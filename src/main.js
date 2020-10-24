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
  console.log(result);
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


let window;

function Redirecionar(){
  window.loadFile('src/ui/views/editar-produto.html');
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
  getNomeProducts
}