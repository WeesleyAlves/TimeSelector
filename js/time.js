var list = document.getElementById('list-times');


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
            }else{
                alert("Erro ao Buscar Times do Servidor!");
            }
        }
    }

    xhr.send();

}



function gerarLista(data) {

    data.forEach(time => {

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

        var li = document.createElement('li');
        li.setAttribute('class','item-list');

        var box1 = document.createElement('div');
        box1.setAttribute('class','box1-li');
        box1.appendChild(nome);
        box1.appendChild(local);
        box1.appendChild(hora);

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
        option1.setAttribute('value','jogador');
        option1.innerHTML = 'Linha';

        var option2 = document.createElement('option');
        option2.setAttribute('value','goleiro');
        option2.innerHTML = 'Goleiro';
        
        select.appendChild(option1);
        select.appendChild(option2);

        
        var btn = document.createElement('div');
        btn.setAttribute('class','btn-entrar');
        btn.innerHTML = 'Entrar';

        box2.appendChild(labelNome);
        box2.appendChild(input);
        box2.appendChild(labelPosicao);
        box2.appendChild(select);

        box2.appendChild(btn);

        
        li.appendChild(box1);
        li.appendChild(box2);
        list.appendChild(li);
 
    });
}

getTimes();