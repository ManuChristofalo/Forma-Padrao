
// 1. MUDANÇA NO NÚMERO DE VARIÁVEIS =======================================================================================
var countRestr=1;

document.getElementById('numVariaveis').addEventListener('change', atualizaCampos);
atualizaCampos();

function atualizaCampos(){
    document.getElementById('funcaoObjetivo').innerHTML = ''; //Limpeza dos campos a cada alteração
    document.getElementById('restricoes').innerHTML = '';

    countRestr=0;

    adicionaObjetivo();
    adicionaRestricao();
}


// 2. FUNÇÕES DE DINAMICIDADE =========================================================================================

function adicionaObjetivo(){
    const numVariaveis = parseInt(document.getElementById('numVariaveis').value) || 2;

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

            else if(i==numVariaveis){
                const span = document.createElement('span');
                span.textContent = 'x' + i + ' = ';
                document.getElementById('funcaoObjetivo').appendChild(span);

                const input = document.createElement('input');
                input.id = "funcObjResult"
                input.type = 'number';
                input.className = 'resultado';
                input.placeholder = `Resultado`;
                document.getElementById('funcaoObjetivo').appendChild(input);
            }
        }
}

function adicionaRestricao(){
    if(countRestr<5){
        const numVariaveis = parseInt(document.getElementById('numVariaveis').value) || 2;
        const DivRestricao = document.createElement("div");
        
    
        // I. Coeficientes e Variáveis
            for(let i = 1; i <= numVariaveis; i++){
                const input = document.createElement('input');
                input.id = 'restrVar' + i + (countRestr+1); //i=coluna (xi), countRestr=linha
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
            select.id = 'sinal' + (countRestr+1);
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
            inputResultado.id = 'restrResult' + (countRestr+1);
            inputResultado.type = 'number';
            inputResultado.className = 'resultado';
            inputResultado.placeholder = 'Resultado';
            DivRestricao.appendChild(inputResultado);
    
    
        document.getElementById("restricoes").appendChild(DivRestricao);
        countRestr++;
    }
}



// 3. FUNÇÕES PARA SALVAR VALORES =========================================================================================

const vetorObjetivo = []; //Bool Min/Max - Coef. Variaveis - Resultado
let vetorRestricao =[]; //Coef. Variaveis - Resultado - Sinal (*numRestrições)


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


    //III. Resultados Objetivo
    let valor = parseInt(document.getElementById('funcObjResult').value);
    vetorObjetivo.push(valor);



    //3.2 - RESTRIÇÕES --------------------------------------------------------------------
    for(let i=0; i<countRestr; i++){
        vetorRestricao[i]=new Array(numVariaveis+2);
    }

    for(let i = 1; i <=countRestr; i++){
        for(let j=1; j<=numVariaveis; j++){
            let valor = parseInt(document.getElementById('restrVar'+j+i).value);
            vetorRestricao[i-1][j-1]=valor;
        }
    }

    for(let i=1; i<=countRestr; i++){
        let valor = parseInt(document.getElementById('restrResult'+i).value);
        vetorRestricao[i-1][numVariaveis]=valor;

        var sinal;
        if(document.getElementById('sinal'+i).value === "=")
            sinal=0;
        else if(document.getElementById('sinal'+i).value === "≥")
            sinal=1;
        else
            sinal=-1;
    
        vetorRestricao[i-1][numVariaveis+1]=sinal;
    }

    for(let i=0; i<countRestr; i++){
        for(let j=0; j<numVariaveis+2; j++) console.log(vetorRestricao[i][j]);
        console.log("\n");
    }


}