var list = document.getElementById('list-times');

// ========================================= requests =============================================


// -------------------- função para puxar os times --------------------
function getTimes() {
    var xhr = new XMLHttpRequest();
    var url = 'http://api-futsal-time.herokuapp.com/time/';
    var data = false;

    xhr.open('GET',url,true);

    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                data = JSON.parse(xhr.response);

                gerarLista(data); 
                verificarStatus(); // função do arquivo jogador para bloquear o acesso caso cadastrado.
            }else{
                alert("Erro ao Buscar Times do Servidor!");
            }
        }
    }

    xhr.send();

}

// -------------------- função para montar o time com a post do jgoador em um time ja existente ---------------------------

function montarTime(id) {
    var nome = document.getElementById('nome'+id);
    var posicao = document.getElementById('select'+id);

    data = {
        'nome': nome.value,
        'posicao': posicao.value
    }

    var url = "http://api-futsal-time.herokuapp.com/time/montar/"+id;

    xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);

    xhr.setRequestHeader('Content-Type','application/json');
    xhr.setRequestHeader('Data-Type','json');

    xhr.onreadystatechange = function () {
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
            }
        }
    }

    xhr.send(JSON.stringify(data));

}

// ============================================ fim requests =======================================================

// ------------------------- função para gerar a lista dos times -----------------------------

function gerarLista(data) {

    data.forEach(time => {

        if(time.completo == false){

            var nome = document.createElement('span');
            nome.setAttribute('class','nome-time');

            var local = document.createElement('span');
            local.setAttribute('class','local-time');

            var hora = document.createElement('span');
            hora.setAttribute('class','hora-time');

            var vagas = document.createElement('span');
            vagas.setAttribute('class','vagas-time');

            nome.innerHTML = time.nomeDoTime ;
            local.innerHTML = time.local;
            hora.innerHTML = time.horaDeEntrada+' - '+time.horaDeSaida;
            vagas.innerHTML = 'Vagas Restantes: ' + time.vagas;

            var li = document.createElement('li');
            li.setAttribute('class','item-list');

            var box1 = document.createElement('div');
            box1.setAttribute('class','box1-li');
            box1.appendChild(nome);
            box1.appendChild(local);
            box1.appendChild(hora);
            box1.appendChild(vagas);

            var box2 = document.createElement('div');
            box2.setAttribute('class','box2-li');

            var labelNome = document.createElement('label');
            labelNome.setAttribute('class','label-time');
            labelNome.innerHTML = 'Nome';

            var labelPosicao = document.createElement('label');
            labelPosicao.setAttribute('class','label-time');
            labelPosicao.innerHTML = 'Posição';

            var input = document.createElement('input');
            input.setAttribute('id', 'nome'+time.id );
            input.setAttribute('class','input-time');

            var select = document.createElement('select');
            select.setAttribute('id','select'+time.id);
            select.setAttribute('class','select-posicao-time');

            var option1 = document.createElement('option');
            option1.setAttribute('value','Linha');
            option1.innerHTML = 'Linha';

            var option2 = document.createElement('option');
            option2.setAttribute('value','Goleiro');
            option2.innerHTML = 'Goleiro';
            
            select.appendChild(option1);
            if(time.temGoleiro == false){
                select.appendChild(option2);
            }
            
            var btn = document.createElement('div');
            btn.setAttribute('class','btn-entrar-time');
            btn.setAttribute('onclick','montarTime('+time.id+')');
            btn.innerHTML = 'Entrar';

            box2.appendChild(labelNome);
            box2.appendChild(input);
            box2.appendChild(labelPosicao);
            box2.appendChild(select);

            box2.appendChild(btn);
            
            li.appendChild(box1);
            li.appendChild(box2);
            list.appendChild(li);

        }
    });
}


// =========================================== funções para iniciar o projeot ============================================

getTimes();