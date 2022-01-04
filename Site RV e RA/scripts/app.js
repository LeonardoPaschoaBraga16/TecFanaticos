// 1 – Identificar quando o usuário utiliza o scroll
// 2 – Calcular a distância entre o topo da página e o scroll
// 3 – Calcular a distância entre o topo da página e o elemento que deseja animar
// 4 – Comparar as duas distâncias anteriores
// 5 – Adicionar uma classe com css animation ou transition ao elemento animado
// Debounce do Lodash

var debounce= function(func, wait, immediate) {
    var timeout;
    return function(){
        var context = this, args = arguments;
        var later = function(){
            timeout = null;
            if(!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callNow) func.apply(context, args);
    };
};

(function() {
var $target = $('.anime'),
    animationClass = 'anime-start',
    offset = $(window).height() * 3/4;

function animeScroll(){
    var documentTop = $(document).scrollTop();
    
    $target.each(function(){
        var itemTop = $(this).offset().top;
        
        if(documentTop > itemTop - offset){
            $(this).addClass(animationClass);
        }
        else{
            $(this).removeClass(animationClass);
        }
    })
}

animeScroll();

$(document).scroll(debounce(function(){
    animeScroll();
}, 30));
}());