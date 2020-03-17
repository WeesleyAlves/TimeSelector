var btnSwitch = document.getElementById('btn-switch');
var mList = document.getElementById('container-list');
var mItens = document.getElementsByClassName('item-list');

btnSwitch.addEventListener('click', function() {
    if(mList.style.marginTop != 'calc(-100vh + 30px)' ){
        mList.style.marginTop = 'calc(-100vh + 30px)' ;
        btnSwitch.innerHTML = '-';
    }else{
        mList.style.marginTop = '0vh' ;
        btnSwitch.innerHTML = '+';
    }
});


