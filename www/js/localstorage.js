$(".srcMain").once('keyup', function(){
    globalFiltros = this.value;
});
$.mobile.changePage($("#estados"), "slide", true, true);

/*--COMENTADO POR FERNANDO VILLARRUEL
var promozone = {};

promozone.isLogged = function() {
    if(localStorage.getItem('promozone') !== null)
    {
        var registro = JSON.parse(localStorage.getItem('promozone'));
        if(registro.ntok !== undefined && registro.ntok != null)
        {
            globalToken = registro.ntok;
            $(".srcMain").once('keyup', function(){
                globalFiltros = this.value;
            });
            $(".lmFavorito").once('click', function(){
                refrescarListaFavoritos();
            });
            $.mobile.changePage($("#estados"), "slide", true, true);
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
};

promozone.loggin = function(token) {
    try
    {
        $("#loading").hide();
        $("#lngusuario, #lngclave").val("");
        localStorage.setItem('promozone', JSON.stringify({ 'ntok': token }));
        globalToken = token;
        $(".srcMain").once('keyup', function(){
            globalFiltros = this.value;
        });
        $(".lmFavorito").once('click', function(){
            refrescarListaFavoritos();
        });
        $.mobile.changePage($("#estados"), "slide", true, true);
    }
    catch(error)
    {
        return false;
    }
};

promozone.deleteToken = function() {
    try
    {
        localStorage.removeItem('promozone');
        mainView.router.loadPage('index.html');
    }
    catch(error)
    {
        return false;
    }
};*/