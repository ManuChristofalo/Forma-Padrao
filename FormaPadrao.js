
function FormularioEnviado(){
    var nome = document.getElementById('nome').value;
    var apelido = document.getElementById('apelido').value;
    var dataNasc = document.getElementById('dataNasc').value;
    var ingresso = document.getElementById('ingresso').value;
    var formacao = document.getElementById('formacao').value;
    var fone = document.getElementById('fone').value;
    var email = document.getElementById('email').value;
    var hist = document.getElementById('hist').value;
    var foi=0;

    if(nome=="" || apelido=="" || dataNasc=="" || ingresso==""
        || formacao=="" || fone=="" || email=="" || hist=="") return;

      else{
          var Dados={
            nome: nome,
            apelido: apelido,
            dataNasc: dataNasc,
            ingresso: ingresso,
            formacao: formacao,
            fone: fone,
            email: email,
            hist: hist
          };
      
      
          var DadosJson = JSON.stringify(Dados);
      
      
      }
}

// Function to handle blur event for input elements
function handleBlur(input) {
    switch (input){
      case document.getElementById('NumVar'):
        if(document.getElementById("Campo1").classList.contains('ativo')) document.getElementById("Campo1").classList.remove('ativo');
        document.getElementById("Campo1").classList.add('inativo');
        break;
    
      case document.getElementById('FuncObj'):
        if(document.getElementById("Campo2").classList.contains('ativo')) document.getElementById("Campo2").classList.remove('ativo');
        document.getElementById("Campo2").classList.add('inativo');
        break;

        case document.getElementById('dataNasc'):
        if(document.getElementById("3").classList.contains('ativo')) document.getElementById("3").classList.remove('ativo');
        document.getElementById("3").classList.add('inativo');
        break;

        case document.getElementById('ingresso'):
          if(document.getElementById("4").classList.contains('ativo')) document.getElementById("4").classList.remove('ativo');
          document.getElementById("4").classList.add('inativo');
          break;
      
        case document.getElementById('formacao'):
          if(document.getElementById("5").classList.contains('ativo')) document.getElementById("5").classList.remove('ativo');
          document.getElementById("5").classList.add('inativo');
          break;
  
        case document.getElementById('tel'):
          if(document.getElementById("6").classList.contains('ativo')) document.getElementById("6").classList.remove('ativo');
          document.getElementById("6").classList.add('inativo');
        break;
  
        case document.getElementById('email'):
          if(document.getElementById("7").classList.contains('ativo')) document.getElementById("7").classList.remove('ativo');
          document.getElementById("7").classList.add('inativo');
          break;
  
        case document.getElementById('hist'):
          if(document.getElementById("8").classList.contains('ativo')) document.getElementById("8").classList.remove('ativo');
          document.getElementById("8").classList.add('inativo');
    }
}

// Function to handle focus event for input elements
function handleFocus(input){
    switch (input){
      case document.getElementById('NumVar'):
        if(document.getElementById("Campo1").classList.contains('inativo')) document.getElementById("Campo1").classList.remove('inativo');
        document.getElementById("Campo1").classList.add('ativo');
        break;
    
      case document.getElementById('FuncObj'):
        if(document.getElementById("Campo2").classList.contains('inativo')) document.getElementById("Campo2").classList.remove('inativo');
        document.getElementById("Campo2").classList.add('ativo');
        break;

      case document.getElementById('dataNasc'):
        if(document.getElementById("3").classList.contains('inativo')) document.getElementById("3").classList.remove('inativo');
        document.getElementById("3").classList.add('ativo');
      break;

      case document.getElementById('ingresso'):
        if(document.getElementById("4").classList.contains('inativo')) document.getElementById("4").classList.remove('inativo');
        document.getElementById("4").classList.add('ativo');
        break;
    
      case document.getElementById('formacao'):
        if(document.getElementById("5").classList.contains('inativo')) document.getElementById("5").classList.remove('inativo');
        document.getElementById("5").classList.add('ativo');
        break;

      case document.getElementById('tel'):
        if(document.getElementById("6").classList.contains('inativo')) document.getElementById("6").classList.remove('inativo');
        document.getElementById("6").classList.add('ativo');
      break;

      case document.getElementById('email'):
        if(document.getElementById("7").classList.contains('inativo')) document.getElementById("7").classList.remove('inativo');
        document.getElementById("7").classList.add('ativo');
        break;

      case document.getElementById('hist'):
        if(document.getElementById("8").classList.contains('inativo')) document.getElementById("8").classList.remove('inativo');
        document.getElementById("8").classList.add('ativo');
      break;
    }
}

document.getElementById('botao').onclick = FormularioEnviado;


/*  PLANEJAMENTO
  1. SELECIONAR o NUMERO DE VARIAVEIS

  2. ADICIONAR UM CAMPO DE TEXTO PARA CADA VARIAVEL

  3. CRIAR um BOTAO para ir ADICIONANDO LINHAS DE RESTRICOES
*/

/* FUNCAO APRA ADICIONAR VARIAVEIS*/

// Função que sera executada quando o botao for clicado
function adicionarInput() {
  // Crie um novo elemento de entrada (input)
  var novoInput = document.createElement("input");
  
  // Definindo os atributos do input (<input type="text" id="restrc">)
  novoInput.type = "text";
  novoInput.id = "restrc";
  
  // Adicione o novo input ao elemento de container
  var inputContainer = document.getElementById("campo-variavel");
  inputContainer.appendChild(novoInput);
}

/* FUNCAO PARA ADICIONAR LINHAS DE RESTRICOES*/

// Adicione um ouvinte de evento ao botão para acionar a função quando ele for clicado
var botaoAddVar = document.getElementById("adicionarInput");
botaoAddVar.addEventListener("click", adicionarInput);

// Função para adicionar uma linha
function adicionarLinha() {
  const container = document.getElementById('containerRestricoes');

  // Criar uma nova linha
  const novaLinha = document.createElement('div');
  novaLinha.classList.add('linha'); /* (<div class = "linha">) */

  // Criando os inputs nas novas linhas
  const input1 = document.createElement('input');
  input1.setAttribute('type', 'text');

  // Adicionar os inputs a nova linha
  novaLinha.appendChild(input1);

  // Adicionando a linha dentro da div que contém todas as linhas
  container.appendChild(novaLinha);
}
const botaoAdicionar = document.getElementById('adicionarRestc');
    botaoAdicionar.addEventListener('click', adicionarLinha);
