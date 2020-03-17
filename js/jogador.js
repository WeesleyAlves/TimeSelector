var nome = document.getElementById('nome');
var local = document.getElementById('local');
var posicao = document.getElementById('posicao');
var time = document.getElementById('time');
var horaInicial = document.getElementById('horaInicial');
var horaFinal = document.getElementById('horaFinal');
var submit = document.getElementById('btn-submit');
var bntCancel = document.getElementById('btn-cancel');

var windowSucess = document.getElementById('sucesso');
var form = document.getElementById('form');

//=================================== REQUESTS ========================================================

// ---------------------- adicionar novo jogador a fila -----------------------------------

submit.addEventListener('click',function () {
    var erro = false;

    if(nome.value == '')
        erro = 'Preencha o nome';
    else if(local.value == '')
        erro = 'Preencha o local';
    else if(posicao.value == '')
        erro = 'Preencha a Posição';
    else if(time.value == '')
        erro = 'Preencha o nome do time';
    else if(horaInicial.value == '' || !Number.isInteger(parseInt(horaInicial.value)))
        erro = 'Preencha a hora de entrada corretamente, apenas numeros'
    else if(horaFinal.value == '' || !Number.isInteger(parseInt(horaFinal.value)))
        erro = 'Preencha a hora de saida corretamente, apenas numeros'
    else{
        var data = {
            'nomeDoTime': time.value,
            'horaDeEntrada': horaInicial.value,
            'horaDeSaida': horaFinal.value,
            'local': local.value            
        }
    }
    
    if(erro !== false)
        alert(erro);
    else{
        
        var xhr = new XMLHttpRequest();
        var url = "http://api-futsal-time.herokuapp.com/time/";

        xhr.open('POST', url, true);

        xhr.setRequestHeader('Content-type','application/json');
        xhr.setRequestHeader('Data-Type','json');

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4){
                if(xhr.status == 200){

                    var time = JSON.parse(xhr.response);

                    var jogador = {
                        'nome': nome.value,
                        'posicao': posicao.value
                    };

                    url = "http://api-futsal-time.herokuapp.com/time/montar/"+time.id;


                    xhr.open('POST', url, true);

                    xhr.setRequestHeader('Content-type','application/json');
                    xhr.setRequestHeader('Data-Type','json');

                    xhr.onreadystatechange = function() {
                        if(xhr.readyState == 4){
                            if(xhr.status == 200){
                                alert('Adicionado a fila!');
                                //console.log(xhr.response);
                                var jogador = JSON.parse(xhr.response);
                                jogador = jogador.timeMontado.jogadores;
                                jogador = jogador[jogador.length - 1];
                                //console.log(jogador)
                                localStorage.setItem('jogador',JSON.stringify(jogador));
                                openLoader("Sucesso! Aguarde a montagem do time!", jogador.id);
                                getTimes();
                            }
                        }
                    }

                    xhr.send(JSON.stringify(jogador));
                    
                }
            }
        }

        xhr.send(JSON.stringify(data));
    }
});


// ---------------------------------- verifica se um jogador recem cadastrado ainda esta presente no BD --------------------

function verificarStatus() {
    var xhr = new XMLHttpRequest();
    var url = "http://api-futsal-time.herokuapp.com/jogador/";

    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            if(xhr.status == 200 ){
                var nuvem = JSON.parse(xhr.response);
                var local = JSON.parse(localStorage.getItem('jogador'));
                
                nuvem.forEach(jogador => {
                    if(jogador.id == local.id){
                        openLoader("Já na fila! Aguarde a montagem do time!", local.id);
                        //console.log(local);
                    }
                });

            }
        }
    }

    xhr.send();
}


// ----------------------------------------- função para cancelar a fila ------------------


function cancelarFila(id) {
    
    var url = 'http://api-futsal-time.herokuapp.com/jogador/'+id;
    var xhr = new XMLHttpRequest();

    xhr.open('DELETE', url, true);

    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                //console.log(xhr.response);
                alert("Fila Cancelada");
                location.reload(true);
            }
        }
    }

    xhr.send();

}

// ====================================== FIM REQUESTS ===================================================================





// ------------------- função para abrir o loader no lugar do form de adiçao de jogador e blquear o acesso a montagem --------------------------------

function openLoader(msg, id) {
    var p = document.getElementById('msg-sucesso');
    var inputs = document.getElementsByClassName('input-time');
    var selects = document.getElementsByClassName('select-posicao-time');
    var buttons = document.getElementsByClassName('btn-entrar-time');
   
    for(i=0; i<inputs.length; i++){
        inputs[i].setAttribute("disabled","true");
        selects[i].setAttribute('disabled','true');
        buttons[i].setAttribute('onclick','');
        buttons[i].style.cursor = 'not-allowed';
    }
    
    p.innerHTML = msg;
    form.style.display = 'none';
    windowSucess.style.display = 'flex';
    bntCancel.setAttribute('onclick','cancelarFila('+id+')');

}


// ---------------------------------------- FUNÇÃO PARA GERAR O SELECT COM OS HORARIOS DE JOGOS DISPONIVEIS -----

function gerarSelectHora() {
    for(var i=12; i<24;i++){
        // hora entrada
        for(var j = 0; j<2; j++){
            var option = document.createElement('option');
            if(j%2 == 0){
                option.setAttribute('value',i+':00');
                option.innerHTML = i+':00';
            }else{
                option.setAttribute('value',i+":30");
                option.innerHTML = i+":30";
            }
            horaInicial.appendChild(option);
        }

        //hroa saida
        for(var k = 0; k<2; k++){
            var option = document.createElement('option');
            if(k%2 == 0){
                option.setAttribute('value',i+':00');
                option.innerHTML = i+':00';
            }else{
                option.setAttribute('value',i+":30");
                option.innerHTML = i+":30";
            }
            horaFinal.appendChild(option);
        }        
    }
}


//  ------------------- funções de iniciação do projeto -------------------

gerarSelectHora();


