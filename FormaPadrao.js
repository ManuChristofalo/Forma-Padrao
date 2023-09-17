//F O R M A T A Ç Ã O  =====================================================================
function handleBlur(input){
    switch (input){
      case document.getElementById('NumVar'):
        if(document.getElementById("Campo1").classList.contains('ativo')) document.getElementById("Campo1").classList.remove('ativo');
        document.getElementById("Campo1").classList.add('inativo');
        break;
    
      case document.getElementById('FuncObj'):
        if(document.getElementById("Campo2").classList.contains('ativo')) document.getElementById("Campo2").classList.remove('ativo');
        document.getElementById("Campo2").classList.add('inativo');
        break;

        case document.getElementById('Campo 3'):
        if(document.getElementById("Campo3").classList.contains('ativo')) document.getElementById("Campo3").classList.remove('ativo');
        document.getElementById("Campo3").classList.add('inativo');
        break;
    }
}

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

      case document.getElementById('Campo 3'):
        if(document.getElementById("Campo3").classList.contains('inativo')) document.getElementById("Campo3").classList.remove('inativo');
        document.getElementById("Campo3").classList.add('ativo');
      break;
    }
}



//V A R I Á V E I S =============================================================================
function adicionaRestricao(){
    const DivRestricao = document.createElement("div");
    DivRestricao.className = "Restrc";
    DivRestricao.innerHTML = `
      <label for="Restrc">
          <div class="linha">
            <input type="text" class="coeff">x1 +&nbsp;
            <input type="text" class="coeff">x2&nbsp;
            <!-- Adicione mais campos para mais variáveis -->
            &nbsp;
            <select class="eq">
                <option value="=">=</option>
                <option value="<"><</option>
                <option value="<=">≤</option>
                <option value=">">></option>
                <option value=">=">≥</option>
            </select>
            &nbsp;
            <input type="text" class="result" placeholder="Resultado">
          </div>
        `;
    document.getElementById("CampoRestr").appendChild(DivRestricao);
}



//E V E N T O S =================================================================================
document.getElementById('botao').onclick = FormularioEnviado;