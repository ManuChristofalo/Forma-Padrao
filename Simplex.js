
// 1. MUDANÇA NO NÚMERO DE VARIÁVEIS =======================================================================================
var numRestr=1;
var numVariaveis=2;

document.getElementById('numVariaveis').addEventListener('change', atualizaCampos);
atualizaCampos();

function atualizaCampos(){
    document.getElementById('funcaoObjetivo').innerHTML = ''; //Limpeza dos campos a cada alteração
    document.getElementById('restricoes').innerHTML = '';

    numRestr=0;

    adicionaObjetivo();
    adicionaRestricao();
}


// 2. FUNÇÕES DE DINAMICIDADE =========================================================================================

function adicionaObjetivo(){
    numVariaveis = parseInt(document.getElementById('numVariaveis').value) || 2;

    // I. Minimizar ou Maximizar 
        const minMax = document.createElement('select');
        minMax.className = 'minMax';
        minMax.id = 'minMax';
        const opcs = ['Min.', 'Max.'];

        for(let k = 0; k < 2; k++){
            const opc = document.createElement('option');
            opc.value = opcs[k];
            opc.textContent = opcs[k];
            minMax.appendChild(opc);
            minMax.append('   ');
        }
        document.getElementById('funcaoObjetivo').appendChild(minMax);


    // II. Coeficientes, Variáveis e Resultado
        for(let i = 1; i <= numVariaveis; i++){
            const input = document.createElement('input');
            input.id = 'funcObj' + i;
            input.type = 'number';
            input.className = 'coeficiente';
            input.placeholder = `coef X${i}`;
            document.getElementById('funcaoObjetivo').appendChild(input);

            if(i < numVariaveis){
                const span = document.createElement('span');
                span.textContent = 'x' + i + '  +  ';
                document.getElementById('funcaoObjetivo').appendChild(span);
            }
        }
}

function removeRestricao(){
    if(numRestr>1){
        const lastAddedDiv = document.getElementById('restricoes').lastElementChild;
        if(lastAddedDiv){
            lastAddedDiv.remove();
            numRestr--;
        }
    }
}

function adicionaRestricao(){
    if(numRestr<5){
        const numVariaveis = parseInt(document.getElementById('numVariaveis').value) || 2;
        const DivRestricao = document.createElement("div");
        
    
        // I. Coeficientes e Variáveis
            for(let i = 1; i <= numVariaveis; i++){
                const input = document.createElement('input');
                input.id = 'restrVar' + i + (numRestr+1); //i=coluna (xi), countRestr=linha
                input.type = 'number';
                input.className = 'coeficiente';
                input.placeholder = `coef X${i}`;
                DivRestricao.appendChild(input);
    
                if (i < numVariaveis){
                    const span = document.createElement('span');
                    span.textContent = 'x' + i + ' + ';
                    DivRestricao.appendChild(span);
                }
    
                else if(i==numVariaveis){
                    const span = document.createElement('span');
                    span.textContent = 'x' + i + ' ';
                    DivRestricao.appendChild(span);
                }
            }
    
    
        // II. Seleção do tipo de equação
            const select = document.createElement('select');
            select.className = 'sinalEq';
            select.id = 'sinal' + (numRestr+1);
            const options = ['=', '≤', '≥'];
    
            for(let k = 0; k < options.length; k++){
                const option = document.createElement('option');
                option.value = options[k];
                option.textContent = options[k];
                select.appendChild(option);
                select.append(' ');
            }
            DivRestricao.appendChild(select);
    
    
        // III. Resultado
            const inputResultado = document.createElement('input');
            inputResultado.id = 'restrResult' + (numRestr+1);
            inputResultado.type = 'number';
            inputResultado.className = 'resultado';
            inputResultado.placeholder = 'Resultado';
            DivRestricao.appendChild(inputResultado);
    
    
        document.getElementById("restricoes").appendChild(DivRestricao);
        numRestr++;
    }
}



// 3. FUNÇÕES PARA SALVAR VALORES =========================================================================================

const vetorObjetivo = []; //Bool Min/Max - Coef. Variaveis - Resultado
let matrizRestricao =[]; //Coef. Variaveis - Resultado - Sinal (*numRestrições)


function salvaValor(){
    //3.1 - FUNÇÃO OBJETIVO ---------------------------------------------------------------
    const numVariaveis = parseInt(document.getElementById('numVariaveis').value);
    
    //I. Maximizar ou Minimizar
    if(document.getElementById('minMax').value === "Min.")
        vetorObjetivo.push(0); //0 para minimizar
    else
        vetorObjetivo.push(1); //1 para maximizar
    

    //II. Coeficientes Objetivo
    for(let i = 1; i <= numVariaveis; i++){
        let valor = parseInt(document.getElementById('funcObj'+i).value);
        vetorObjetivo.push(valor);
    }



    //3.2 - RESTRIÇÕES --------------------------------------------------------------------
    for(let i=0; i<numRestr; i++){ //Matriz Restrição
        matrizRestricao[i]=new Array(numVariaveis+2);
    }

    for(let i = 1; i <=numRestr; i++){ //Colunas Coeficientes
        for(let j=1; j<=numVariaveis; j++){
            let valor = parseInt(document.getElementById('restrVar'+j+i).value);
            matrizRestricao[i-1][j-1]=valor;
        }
    }

    for(let i=1; i<=numRestr; i++){ //Colunas Resultados
        let valor = parseInt(document.getElementById('restrResult'+i).value);
        matrizRestricao[i-1][numVariaveis]=valor;

        var sinal; //Coluna Sinal
        if(document.getElementById('sinal'+i).value === "=")
            sinal=0;
        else if(document.getElementById('sinal'+i).value === "≥")
            sinal=1;
        else
            sinal=-1;
    
        matrizRestricao[i-1][numVariaveis+1]=sinal;
    }

    criaMatrizFormaPadrao();
    //Call Funções Simplex
}



//4. SIMPLEX ========================================================================================================================

function criaMatrizFormaPadrao(){
    //I. Criação da matriz já na forma padrão (tablo) - ver anexo matrizPadrao.png
    let matrizPadrao = [];
    for(let linha=0; linha<numRestr+2; linha++){ //num linhas -> num restrição + func. obj + CRs
        matrizPadrao[linha]=new Array(numVariaveis+(2*numRestr)+2); //num colunas -> bases + num variaveis + variaveis auxiliares + resultado
    }

    for(let linha=0; linha<numRestr+2; linha++){
        for(let coluna=0; coluna<numVariaveis+(numRestr*2)+2; coluna++){
            matrizPadrao[linha][coluna]=0;
        }
    }

    //II. Preenchimento da matriz padrão
    //Linha 0 - Função Objetivo
    for(let coluna=1; coluna<=numVariaveis; coluna++){ //Variáveis normais
        if(vetorObjetivo[0]===1)
            matrizPadrao[0][coluna]=vetorObjetivo[coluna]*-1;
        else
            matrizPadrao[0][coluna]=vetorObjetivo[coluna];
    }

    let restricao=0;
    for(let coluna=numVariaveis+1; coluna<numVariaveis+(numRestr*2)+1; coluna++){ //Variáveis de ajuste
        console.log(matrizRestricao[restricao][numVariaveis+1]);
        if(matrizRestricao[restricao][numVariaveis+1]===-1){ //Se a restrição for <=
            matrizPadrao[0][coluna]=0;
            coluna++;
            matrizPadrao[0][coluna]=0;
        }
        else if(matrizRestricao[restricao][numVariaveis+1]===0 || matrizRestricao[restricao][numVariaveis+1]===1){ //Se a restrição for === ou >=
            matrizPadrao[0][coluna]=0;
            coluna++;
            matrizPadrao[0][coluna]=10000;
        }
        restricao++;
    }
    

    //Linha 2 até i-1 - Restrições
    for(let linha=1; linha<numRestr+1; linha++){
        for(let coluna=0; coluna<numVariaveis+(numRestr*2)+1; coluna++){
            if(coluna==0){ //Coluna 0 - Valores das bases na f.obj. | Isso ta certo
                if(matrizRestricao[linha-1][numVariaveis+1]==-1){ //Se a restrição for <=
                    matrizPadrao[linha][0]=matrizPadrao[0][numVariaveis+2*linha-1];
                }
                else matrizPadrao[linha][0]=matrizPadrao[0][numVariaveis+2*linha];
            }

            else if(coluna==numVariaveis+2*linha-1 || coluna==numVariaveis+2*linha){ //Colunas var. aux. 
                if(matrizRestricao[linha-1][numVariaveis+1]==-1){
                    matrizPadrao[linha][numVariaveis+2*linha-1]=+1;
                    matrizPadrao[linha][numVariaveis+2*linha]=0;
                }
                else if(matrizRestricao[linha-1][numVariaveis+1]==0){
                    matrizPadrao[linha][numVariaveis+2*linha-1]=0;
                    matrizPadrao[linha][numVariaveis+2*linha]=+1;
                }
                else{
                    matrizPadrao[linha][numVariaveis+2*linha-1]=-1;
                    matrizPadrao[linha][numVariaveis+2*linha]=+1;
                }
            }

            else if(coluna>0 && coluna<=numVariaveis){ //Colunas var. normais | Isso ta certo
                matrizPadrao[linha][coluna]=matrizRestricao[linha-1][coluna-1];
            }
        }
    }

    for(let linha=0; linha<numRestr+1; linha++){
        var array=[];
        for(let coluna=0; coluna<numVariaveis+(numRestr*2)+1; coluna++){
            array[coluna]=matrizPadrao[linha][coluna];
        }
        var str=array.join(' ');
        console.log(str);
    }

    console.log("\n");
    for(coluna=0; coluna<numVariaveis+(numRestr*2)+1; coluna++){
        console.log(matrizPadrao[1][coluna]);
    }
}