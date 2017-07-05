
var dispositivo = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

document.addEventListener("deviceready", function() {
    if(dispositivo != "Android") $(".exitapp").hide();
}, false);

var categoriaSeleccionada = 1;

var promoSeleccionada = null;

var sucursalSeleccionada = null;

var estadoSeleccionado = null;

var estadoSeoPermalink = null;

var globalFiltros = 'notfilterset';

var globalToken = '';

var globalUbicacion = { lat: null, lon: null };

var categorias_arr = ['fa-shopping-cart', 'fa-cutlery', 'fa-users', 'fa-hospital-o', 'fa-smile-o'];

$.fn.once = function(a, b) {
    return this.each(function() {
        $(this).off(a).on(a,b);
    });
};

function reinicia()
{
    categoriaSeleccionada = 1;
    promoSeleccionada = null;
    sucursalSeleccionada = null;
    estadoSeleccionado = null;
    estadoSeoPermalink = null;
    globalFiltros = '';
    globalUbicacion.lat = null;
    globalUbicacion.lon = null;
}
/*--COMENTADO POR FERNANDO VILLARRUEL
function recuperar(){
      try{
          var rutaWebService = 'http://webservices.promo-zone.com.mx/recuperar.php';
            $.ajax({
                method: 'POST',
                url:rutaWebService,
                data: {
                    cliente: 1,
                    email: $('#correo').val().trim()
                },
                processData: true,
                dataType: "json",
                    success: function(answer) {

                        //alert(JSON.stringify(answer));
                        if(answer.error == "Si"){
                            $('#correo').val(" ");
                            navigator.notification.alert("Usuario desconocido.", function(){}, 'PromoZone', 'Ok');  
                        }else{
                             $('#correo').val(" ");
                              window.location.hash='#ingreso';
                              navigator.notification.alert("Los datos de acceso se han enviado al correo electronico.", function(){}, 'PromoZone', 'Ok');
                        }
                    },
                    error: function(erro) {
                          navigator.notification.alert("Ha ocurrido un error al recuperar la contrasena: " + JSON.stringify(erro), function(){}, 'PromoZone', 'Ok');
                        $("#loading").hide();
                        }

            });
         
        }catch(err){
            alert(err);
        }
}*/