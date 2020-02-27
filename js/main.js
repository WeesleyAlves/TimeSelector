var nome = document.getElementById('nome');
var local = document.getElementById('local');
var posicao = document.getElementById('posicao');
var time = document.getElementById('time');
var horaInicial = document.getElementById('horaInicial');
var horaFinal = document.getElementById('horaFinal');
var submit = document.getElementById('btn-submit');

var windowSucess = document.getElementById('sucesso');
var form = document.getElementById('form');

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
            'nome' : nome.value,
            'posicao': posicao.value,
            'horaDeEntrada': horaInicial.value,
            'horaDeSaida': horaFinal.value,
            'local': local.value,
            'nomeDoTime': time.value
        }
    }
    
    if(erro !== false)
        alert(erro);
    else{
        
        var xhr = new XMLHttpRequest();
        var url = "http://177.44.129.167:8080/api-time-futsal/jogador/";

        xhr.open('POST', url, true);

        xhr.setRequestHeader('Content-type','application/json');
        xhr.setRequestHeader('Data-Type','json');

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    alert('Adicionado a fila!');
                    console.log(xhr.response);
                    localStorage.setItem('jogador',xhr.response);
                    form.style.display = 'none';
                    windowSucess.style.display = 'flex';
                }
            }
        }

        xhr.send(JSON.stringify(data));
    }
});

function verificarStatus() {
    var xhr = new XMLHttpRequest();
    var url = "http://177.44.129.167:8080/api-time-futsal/jogador/";

    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            if(xhr.status == 200 ){
                var nuvem = JSON.parse(xhr.response);
                console.log(nuvem);

                var local = JSON.parse(localStorage.getItem('jogador'));
                console.log(local);

                console.log(nuvem.indexOf(local));

            }
        }
    }

    xhr.send();

    
}

