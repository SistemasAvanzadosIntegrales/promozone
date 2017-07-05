$(document).on('pageshow', '#descripcionpromocion', function(){
    $("#loading").show();
    obtenerPosicionParaDetalle();
            /*if(answer.error === undefined)
            {
                if(answer.promocion !== undefined)
                {
                    try
                    {
                        var promocion = answer.promocion[0];
                        $("#descLogo").html('<img src="http://old-site.promo-zone.com.mx/' + promocion.logo + '" wid th="300px" style="vertical-align: middle;max-width: 300px;s"/>');
                        
                        var imagenes = promocion.imagen.split("||");
                        $("#galeria_promocion").html('');
                        for(var i = 0; i < imagenes.length; i++)
                        {
                            $("#galeria_promocion").html($("#galeria_promocion").html() + '<li><img src="http://old-site.promo-zone.com.mx/' + imagenes[i] + '" width="100%" style="vertical-align: middle;"/></li>');
                        }
                        
                        $("#descProm").html(promocion.promocion);
                        $("#descEstab").html(promocion.descripcion);
                        $("#descMap").once('click', function(){
                            abrirMapa(promocion.lat, promocion.lon);
                        });
                        
                        $('#galeriaimg').slideme({
                            arrows: false,
                            pagination: false,
                            nativeTouchScroll: true,
                            loop: true,
                            autoslide : true,
                            interval : 2000,
                            resizable: {
                            }
                        });
                    }
                    catch(err)
                    {
                        navigator.notification.alert("Ha ocurrido un error: " + err.message, function(){}, 'PromoZone', 'Ok');
                    }
                }
                else if(answer.size !== undefined)
                {
                    navigator.notification.alert("No hay promociones disponibles", function(){}, 'PromoZone', 'Ok');
                }
                else
                {
                    navigator.notification.alert(answer.message, function(){}, 'PromoZone', 'Ok');
                }
            }
            else
            {
                navigator.notification.alert(answer.error, function(){}, 'PromoZone', 'Ok');
            }    
        });
    }
    catch(err)
    {
        navigator.notification.alert("Ha ocurrido un error: " + err.message, function(){}, 'PromoZone', 'Ok');
    }*/
});
function obtenerDetalleEstablecimiento(latitud,longitud){
    
    try
    {
        if((latitud!=null && latitud!=undefined) && (longitud!=null && longitud!=undefined)){
            //tiene activo el gps asi que mandamos su posicion en el detalle
           var rutaWebService = 'http://api.promo-zone.com.mx/v1/establecimientos/'+sucursalSelect+'/'+latitud+'/'+longitud;
        }else{
            var rutaWebService = 'http://api.promo-zone.com.mx/v1/establecimientos/'+sucursalSelect;
        }
        
        
        //var rutaWebService = 'http://webservices.promo-zone.com.mx/obtenerestablecimiento.php?callback=?';
        console.log("consumiendo el siguiente servicio: "+rutaWebService);
        $.getJSON( rutaWebService/*, { token: globalToken, promo: promoSelect, sucursal: sucursalSelect }*/)
        .done(function(answer) {
            console.log(answer);
            //$("#loading").hide();
            console.log(answer);
                if(answer!=undefined)//undefined)
                {
                    try
                    {
                        var promocion = answer.promocion;
                        $("#descLogo").html('<img src="'+answer.img_logotipo+'" wid th="300px" style="vertical-align: middle;max-width: 300px;s"/>');
                         
                        /*var imagenes = promocion.imagen.split("||");
                        $("#galeria_promocion").html('');
                        for(var i = 0; i < imagenes.length; i++)
                        {
                            $("#galeria_promocion").html($("#galeria_promocion").html() + '<li><img src="http://old-site.promo-zone.com.mx/' + imagenes[i] + '" width="100%" style="vertical-align: middle;"/></li>');
                        }*/
                        $("#galeria_promocion").html('<img src="'+answer.imagen_principal+'" width="100%" style="vertical-align: middle;" />');
                        $("#descProm").html(promocion.promocion+"<br/><br/>"+promocion.restricciones);
                        //$("#descEstab").html(promocion.descripcion);
                        $("#descEstab").html(answer.contenido).css("text-align","justify");
                        if(answer.sucursal!=undefined){
                            console.log("se encontro el nodo de sucursal");
                            if(answer.sucursal.latitud!=0 && answer.sucursal.longitud!=0){
                                console.log("coordenadas listas para google maps");
                                $("#descMap").show();
                                $("#descMap").once('click', function(){
                                    abrirMapa(answer.sucursal.latitud, answer.sucursal.longitud);
                                });
                            }else{
                                $("#descMap").hide();
                                console.log("coordenadas incorrectas");
                            }
                        }else{
                                $("#descMap").hide();
                            console.log("sin nodo de sucursal");
                        }
                        $("#loading").hide();
                    }
                    catch(err)
                    { 
                        
                    }
                }
                else if(answer.length<=0|| answer == undefined || answer=='')//!== undefined)
                {
                    navigator.notification.alert("No hay promociones disponibles", function(){}, 'PromoZone', 'Ok');
                    $("#loading").hide();
                }
                 
        });
    }
    catch(err)
    {
        navigator.notification.alert("Ha ocurrido un error: " + err.message, function(){}, 'PromoZone', 'Ok');
        $("#loading").hide();
    }
    
}
function obtenerPosicionParaDetalle()
{
    navigator.geolocation.getCurrentPosition(posicionCorrecta, posicionIncorrecta, {maximumAge:600000, timeout:5000, enableHighAccuracy: true});
}

var posicionCorrecta = function(position) {
    globalUbicacion.lat = position.coords.latitude;
    globalUbicacion.lon = position.coords.longitude;
    obtenerDetalleEstablecimiento(globalUbicacion.lat,globalUbicacion.lon);
};

// Error en la geolocalizacion
function posicionIncorrecta(error) {
    globalUbicacion.lat = null;
    globalUbicacion.lon = null;
    obtenerDetalleEstablecimiento(globalUbicacion.lat,globalUbicacion.lon);
};




/*--COMENTADO POR FERNANDO VILLARRUEL
function anadirFavorito()
{
    var rutaWebService = 'http://webservices.promo-zone.com.mx/anadirfavorito.php?callback=?';
    $.getJSON( rutaWebService, { token: globalToken, promo: promoSelect, sucursal: sucursalSelect })
    .done(function(answer) {
        $("#loading").hide();
        if(answer.error === undefined)
        {
            if(answer.anadido !== undefined)
            {
                $("#dpahead").removeClass("fa-star-o").addClass("fa-check-circle");
                $("#dpahead").attr("onClick", "quitarFavorito()");
                $("#lblahead").html("Quitar de favoritos");
                navigator.notification.alert(answer.anadido, function(){}, 'PromoZone', 'Ok');
            }
            else
            {
                navigator.notification.alert(answer.message, function(){}, 'PromoZone', 'Ok');
            }
        }
        else
        {
            navigator.notification.alert(answer.error, function(){}, 'PromoZone', 'Ok');
        }    
    });
}

function quitarFavorito()
{
    var rutaWebService = 'http://webservices.promo-zone.com.mx/quitarfavorito.php?callback=?';
    $.getJSON( rutaWebService, { token: globalToken, promo: promoSelect, sucursal: sucursalSelect })
    .done(function(answer) {
        $("#loading").hide();
        if(answer.error === undefined)
        {
            if(answer.eliminado !== undefined)
            {
                $("#dpahead").removeClass("fa-check-circle").addClass("fa-star-o");
                $("#dpahead").attr("onClick", "anadirFavorito()");
                $("#lblahead").html("Añadir a favoritos");
                navigator.notification.alert(answer.eliminado, function(){}, 'PromoZone', 'Ok');
            }
            else
            {
                navigator.notification.alert(answer.message, function(){}, 'PromoZone', 'Ok');
            }
        }
        else
        {
            navigator.notification.alert(answer.error, function(){}, 'PromoZone', 'Ok');
        }    
    });
}*/