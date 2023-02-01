let iconMoon = document.querySelector('.bxs-sun')

iconMoon.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        iconMoon.classList.toggle('bxs-moon')
    }else{
        iconMoon.classList.toggle('bxs-moon')
    }
}