var int_categoria = null;
var int_cercanos = null;

$(document).on('pageshow', '#listapromociones', function(){

});

//function detalle(id_promo, id_sucursal)
function detalle(id_establecimiento)
{
    //promoSelect = id_promo;
    //sucursalSelect = id_sucursal;
    sucursalSelect = id_establecimiento;
    window.location.hash = "#descripcionpromocion";
}

function refrescarListaPromociones(categoria, cercanos)
{
    int_categoria = categoria;
    int_cercanos = cercanos;
    if(cercanos == 1)
    {
        if(estadoSeleccionado != null && estadoSeleccionado > 0)
        {
            if(categoriaSeleccionada != null && categoriaSeleccionada > 0)
            {
                obtenerPosicion();
            }
            else
                navigator.notification.alert("Seleccione una categoria para realizar la busqueda", function(){}, 'PromoZone', 'Ok');
        }
        else
            navigator.notification.alert("Seleccione un estado para realizar la busqueda", function(){}, 'PromoZone', 'Ok');
    }
    else
    {
        listaPromociones();
    }
}

function listaPromociones()
{
    var titulo = "Listado";
    var catFiltro = "";
    switch (parseInt(int_categoria))
    {
        case 1: titulo = "Listado de Tiendas & Departamentales"; catFiltro="tiendas"; break;
        case 2: titulo = "Listado de Bares & Restaurantes"; catFiltro="restaurantes"; break;
        case 3: titulo = "Listado de Servicios varios"; catFiltro="servicios"; break;
        case 4: titulo = "Listado de Hoteles & Posadas"; catFiltro="hoteles"; break;
        case 5: titulo = "Listado de entretenimientos"; catFiltro="entretenimiento"; break;
        default: titulo = "Listado";
    }
    
    cambiarColor(parseInt(int_categoria)-1);
    $("#tituloCategoria").html(titulo);
    
    window.location.hash = "#listapromociones";
    $("#loading").show();
    categoriaSeleccionada = int_categoria;
    var filtro = '';
    try
    {
        console.log("Categoria_seleccionada: "+categoriaSeleccionada)
        //var rutaWebService = 'http://webservices.promo-zone.com.mx/obtenerestablecimientos.php?callback=?';
        var rutaWebService = 'http://api.promo-zone.com.mx/v1/establecimientos?EstablecimientoSearch[estado_id]='+estadoSeoPermalink;
        if(catFiltro!=''){
            filtro+='&EstablecimientoSearch[categoria_id]='+catFiltro;
        }
        if(globalFiltros!='' && globalFiltros!='notfilterset'){
            filtro+='&EstablecimientoSearch[keyword]='+globalFiltros;
        }
        if(int_cercanos=='1'){
            filtro+='&EstablecimientoSearch[latitud]='+globalUbicacion.lat+"&EstablecimientoSearch[longitud]="+globalUbicacion.lon;
        }
        rutaWebService = rutaWebService+filtro;
        //if(globalFiltros == '' || globalFiltros == null) globalFiltros = 'notfilterset';
        //$.getJSON( rutaWebService, { estado: estadoSeleccionado, categoria: categoriaSeleccionada, filtro: globalFiltros, cercano: int_cercanos, lat: globalUbicacion.lat, lon: globalUbicacion.lon })
        console.log(rutaWebService);
        $.getJSON(rutaWebService,function(answer){
            //console.log("Respuesta ListaPromociones: ");
            //console.log(answer);
            console.log("Tamaño de la respuesta: "+answer.length);
        //});
            /*if(answer.error === undefined)
            {*/
                console.log(answer);
                if(answer.length >0)//undefined)
                {
                    try
                    {
                        $('#listadoPromociones').html('');
                        for(var i=0; i < parseInt(answer.length); i++)
                        {
                            //console.log("La promocion actual es: ");
                            //console.log(answer[i].promocion);
                            //console.log(i);
                            var promocion = answer[i].promocion;//[i];
                            if(promocion!=null && promocion!=undefined){
                                if(promocion.id!=undefined && promocion.id!=null && promocion.activo=="S"){
                                    //$('#listadoPromociones').append('<div id="listado" onClick="javascript:detalle(' + promocion.id_promocion + ',' + promocion.id_sucursal + ')"><div class="divimg"><img src="http://old-site.promo-zone.com.mx/' + promocion.logo + '" width="100%" hei ght="100%"/></div><div class="data"><div class="titulo" style="padding: 0.3em; font-size: 0.9em;"><strong>' + promocion.establecimiento + '</strong></div><div class="desc" style="color: #da3839 !important; padding-left: 0.7em; font-size: 0.6em !important;">' + promocion.promocion + '</div></div><div class="arrow"></div></div>');
                                    $('#listadoPromociones').append('<div id="listado" onClick="javascript:detalle(' + answer[i].id +')">'+
                                                                        '<div class="divimg">'+
                                                                            '<img src="' + answer[i].img_logotipo + '" width="100%" hei ght="100%"/>'+
                                                                        '</div>'+
                                                                        '<div class="data">'+
                                                                            '<div class="titulo" style="padding: 0.3em; font-size: 0.9em;">'+
                                                                                '<strong>' + answer[i].establecimiento + '</strong>'+
                                                                            '</div>'+
                                                                            '<div class="desc" style="color: #da3839 !important; padding-left: 0.7em; font-size: 0.6em !important;">' + promocion.promocion.substr(0,75)+"..." + '</div>'+
                                                                        '</div>'+
                                                                        '<div class="arrow"></div>'+
                                                                    '</div>');
                                }
                            }
                            
                            
                        }
                        $("#loading").hide();
                    }
                    catch(err)
                    {
                        $('#listadoPromociones').html('');
                        navigator.notification.alert("Ha ocurrido un error: " + err.message, function(){}, 'PromoZone', 'Ok');
                        //console.log(err)
                        $("#loading").hide();
                        return false;
                    }
                }
                else if(answer.length<=0|| answer == undefined || answer=='')//!== undefined)
                {
                    $('#listadoPromociones').html('');
                    navigator.notification.alert("No hay promociones disponibles", function(){}, 'PromoZone', 'Ok');
                    $("#loading").hide();
                }
                /*else
                {
                    $('#listadoPromociones').html('');
                    navigator.notification.alert(answer.message, function(){}, 'PromoZone', 'Ok');
                    $("#loading").hide();
                }*/
            //}
            /*else
            {
                $('#listadoPromociones').html('');
                navigator.notification.alert(answer.error, function(){}, 'PromoZone', 'Ok');
                $("#loading").hide();
            }  */ 
        });
    }
    catch(err)
    {
        navigator.notification.alert("Ha ocurrido un error: " + err.message, function(){}, 'PromoZone', 'Ok');
        $("#loading").hide();
    }
}

function cambiarColor(posicion)
{
    for(var i = 0; i < categorias_arr.length; i++)
    {
        if(i == parseInt(posicion))
            $(".ct" + (i+1)).addClass("seleccionado");//.removeClass(categorias_arr[i]).addClass("fa-check-square");
        else
            $(".ct" + (i+1)).removeClass("seleccionado");//.removeClass("fa-check-square").addClass(categorias_arr[i]);
    }
}