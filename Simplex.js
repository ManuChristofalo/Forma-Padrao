
// 1. MUDANÇA NO NÚMERO DE VARIÁVEIS =======================================================================================

document.getElementById('numVariaveis').addEventListener('change', atualizaCampos);
atualizaCampos();

function atualizaCampos(){
    document.getElementById('funcaoObjetivo').innerHTML = ''; //Limpeza dos campos a cada alteração
    document.getElementById('restricoes').innerHTML = '';

    adicionaObjetivo();
    adicionaRestricao();
}



// 2. FUNÇÕES DE DINAMICIDADE =========================================================================================

function adicionaObjetivo(){
    const numVariaveis = parseInt(document.getElementById('numVariaveis').value) || 2;

    // I. Minimizar ou Maximizar 
        const minMax = document.createElement('select');
        minMax.className = 'minMax';
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
            input.type = 'text';
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
                input.type = 'text';
                input.className = 'resultado';
                input.placeholder = `Resultado`;
                document.getElementById('funcaoObjetivo').appendChild(input);
            }
        }
}

function adicionaRestricao(){
    const numVariaveis = parseInt(document.getElementById('numVariaveis').value) || 2;
    const DivRestricao = document.createElement("div");

    // I. Coeficientes e Variáveis
        for(let i = 1; i <= numVariaveis; i++){
            const input = document.createElement('input');
            input.type = 'text';
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
        const options = ['=', '<', '≤', '>', '≥'];

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
        inputResultado.type = 'text';
        inputResultado.className = 'resultado';
        inputResultado.placeholder = 'Resultado';
        DivRestricao.appendChild(inputResultado);


    document.getElementById("restricoes").appendChild(DivRestricao);
}

