/*jslint
    es6, browser, multivar, this
*/
var miApp = function () {
    "use strict";
    var VALIDACION_NOMBRE = new RegExp(/^([a-zA-Zá-úÁ-Ú]+\s[a-zA-Zá-úÁ-Ú]+|[a-zA-Zá-úÁ-Ú]+)$/),
        VALIDACION_CORREO_ELECTRONICO = new RegExp(/^[\w.!#$%&'*+\/=?\^@`{|}~\-]+@[\w\-.]+\.[a-z]{2,6}$/),
        VALIDACION_CLAVE = new RegExp(/(?=^.{9,}$)(?=.*\d{2,})(?=.*\W{2,})(?![.\n])(?=.*[A-Z]{2,})(?=.*[a-z]{2,}).*$/m),
        VALIDACION_ROBUSTEZ_CLAVE = new RegExp(/(?=^.{6,8}$)(?=.*\d)(?=.*\W)(?![.\n])(?=.*[A-Z]{2,})(?=.*[a-z]{2,}).*$/m),
        VALIDACION_FECHA = new RegExp(/^\d{2}\/\d{2}\/\d{4}$/),
        VALIDACION_DIRECCION = new RegExp(/^\w+(\s\w+(,|\.)*)*$/),
        VALIDACION_NUMERO_TARJETA = new RegExp(/^\d{4}-\d{4}-\d{4}-\d{4}$/),
        CLASE = "class",
        ESPACIO = " ",
        VACIO = "",
        NINGUNO = "ninguno",
        DATOS_OK = "datos_ok",
        CLAVE_MEDIA = "clave_media",
        DATOS_KO = "datos_ko",
        ELEMENTO_APAGADO = "elemento_apagado",
        FORMULARIO_ABIERTO = "formulario_abierto",
        FORMULARIO_CERRAR = "formulario_cerrar",
        formulario,
        registro,
        botonCerrarFormulario,
        nombreYApellido,
        correoElectronico,
        clave,
        confirmacionClave,
        fechaNacimiento,
        direccion,
        pais,
        filaTarjeta,
        numeroTarjeta,
        controlEnviar,
        avisoCookies,
        botonCerrarAvisoCookies,
        campoBusqueda,
        resultadoBusqueda,
        $ = function () {
            return document.getElementById(this);
        },
        obtenerValorDeAtributo = function (elemento) {
            return elemento.getAttribute(CLASE);
        },
        agregarEventoAElemento = function (elemento, evento, callback) {
            return elemento.addEventListener(evento, callback);
        },
        asociarEventos = function (elementos, eventos, callbacks) {
            elementos.map(function (elemento) {
                switch (elemento) {
                case registro:
                    agregarEventoAElemento(
                        elemento,
                        eventos.mousedown,
                        callbacks.abrirFormulario
                    );
                    break;
                case botonCerrarFormulario:
                    agregarEventoAElemento(
                        elemento,
                        eventos.mousedown,
                        callbacks.apagarElemento
                    );
                    break;
                case direccion:
                    agregarEventoAElemento(
                        elemento,
                        eventos.keyup,
                        callbacks.comprobarCampo
                    );
                    agregarEventoAElemento(
                        elemento,
                        eventos.change,
                        callbacks.comprobarClases
                    );
                    agregarEventoAElemento(
                        elemento,
                        eventos.blur,
                        callbacks.comprobarValidaciones
                    );
                    break;
                case pais:
                    agregarEventoAElemento(
                        elemento,
                        eventos.change,
                        callbacks.comprobarClases
                    );
                    break;
                case botonCerrarAvisoCookies:
                    agregarEventoAElemento(
                        elemento,
                        eventos.mousedown,
                        callbacks.apagarElemento
                    );
                    break;
                case campoBusqueda:
                    agregarEventoAElemento(elemento, eventos.keyup, callbacks.buscar);
                    break;
                default:
                    agregarEventoAElemento(
                        elemento,
                        eventos.keyup,
                        callbacks.comprobarCampo
                    );
                    agregarEventoAElemento(
                        elemento,
                        eventos.change,
                        callbacks.comprobarValidaciones
                    );
                }
            });
        },
        definirAtributo = function (atributo, valor) {
            this.setAttribute(atributo, valor);
        },
        elementosConEventos = (function () {
            registro = $.call("opcion_registro");
            formulario = $.call("formulario");
            botonCerrarFormulario = $.call("formulario_cerrar");
            nombreYApellido = $.call("nombre_apellido");
            correoElectronico = $.call("correo_electronico");
            clave = $.call("clave");
            confirmacionClave = $.call("clave_confirmada");
            fechaNacimiento = $.call("fecha_nacimiento");
            direccion = $.call("direccion");
            pais = $.call("pais");
            filaTarjeta = $.call("fila_campo_tarjeta");
            numeroTarjeta = $.call("numero_tarjeta");
            controlEnviar = $.call("control_enviar");
            avisoCookies = $.call("info_cookies");
            botonCerrarAvisoCookies = $.call("boton_cerrar_aviso");
            campoBusqueda = $.call("campo_busqueda");
            resultadoBusqueda = $.call("resultado_busqueda");
            return [
                nombreYApellido,
                correoElectronico,
                clave,
                confirmacionClave,
                fechaNacimiento,
                numeroTarjeta,
                registro,
                pais,
                direccion,
                botonCerrarFormulario,
                botonCerrarAvisoCookies,
                avisoCookies,
                campoBusqueda,
                resultadoBusqueda
            ];
        }());



    //FUNCIONES DE VALIDACION
    function validarNombreYApellido(cadena) {
        return VALIDACION_NOMBRE.test(cadena)
                && cadena.split(ESPACIO).length <= 2;
    }

    function validarCorreoElectronico(cadena) {
        return VALIDACION_CORREO_ELECTRONICO.test(cadena);
    }

    function validarClave(cadena) {
        return VALIDACION_CLAVE.test(cadena)
                || VALIDACION_ROBUSTEZ_CLAVE.test(cadena);
    }

    function validarConfirmacionClave(cadena) {
        return cadena === clave.value;
    }

    function validarDireccion(cadena) {
        return VALIDACION_DIRECCION.test(cadena);
    }

    function validarComponentesFecha(dia, mes, anyo) {
        var fechaIntroducida, validacion, datosCorrectos, numeroMes;
        datosCorrectos = !!(
            (mes <= 12 && mes >= 1) &&
            (dia <= 31 && dia >= 1)
        );
        if (datosCorrectos) {
            numeroMes = mes - 1;
            fechaIntroducida = new Date(anyo, numeroMes, dia);
            validacion = !!(
                +dia === fechaIntroducida.getDate() &&
                +numeroMes === fechaIntroducida.getMonth() &&
                +anyo === fechaIntroducida.getFullYear()
            );
        } else {
            validacion = false;
        }
        return validacion;
    }

    function validarFechaNacimiento(cadena) {
        var validacion, diaIntroducido, mesIntroducido, anyoIntroducido;
        if (!VALIDACION_FECHA.test(cadena)) {
            validacion = false;
        } else {
            diaIntroducido = cadena.substr(0, 2);
            mesIntroducido = cadena.substr(3, 2);
            anyoIntroducido = cadena.substr(6, 4);
            validacion = validarComponentesFecha(
                diaIntroducido,
                mesIntroducido,
                anyoIntroducido
            );
        }
        return validacion;
    }

    function validarNumeroTarjeta(cadena) {
        return VALIDACION_NUMERO_TARJETA.test(cadena);
    }

    function validarContenidoCampo(campo, valor) {
        var validacion;
        switch (campo) {
        case "nombre_apellido":
            validacion = validarNombreYApellido(valor);
            break;
        case "correo_electronico":
            validacion = validarCorreoElectronico(valor);
            break;
        case "clave":
            validacion = validarClave(valor);
            break;
        case "clave_confirmada":
            validacion = validarConfirmacionClave(valor);
            break;
        case "fecha_nacimiento":
            validacion = validarFechaNacimiento(valor);
            break;
        case "direccion":
            validacion = validarDireccion(valor);
            break;
        case "numero_tarjeta":
            validacion = validarNumeroTarjeta(valor);
            break;
        default:
            validacion = false;
        }
        return validacion;
    }


    //MANEJADORES DE EVENTOS
    function abrirFormulario() {
        definirAtributo.call(formulario, CLASE, FORMULARIO_ABIERTO);
    }

    function apagarElemento(e) {
        var elemento = e.currentTarget;
        definirAtributo.call(
            elemento.id === FORMULARIO_CERRAR
                ? formulario
                : avisoCookies,
            CLASE,
            ELEMENTO_APAGADO
        );
    }

    function comprobarCampo(e) {
        var campo = e.currentTarget,
            valor = campo.value;
        if (
            valor
            && campo === clave
            && VALIDACION_ROBUSTEZ_CLAVE.test(valor)
        ) {
            definirAtributo.call(
                campo,
                CLASE,
                CLAVE_MEDIA
            );
        } else if (valor) {
            definirAtributo.call(
                campo,
                CLASE,
                validarContenidoCampo(campo.id, valor)
                    ? DATOS_OK
                    : DATOS_KO
            );
        } else {
            definirAtributo.call(campo, CLASE, VACIO);
        }
    }

    function comprobarClases() {
        definirAtributo.call(
            filaTarjeta,
            CLASE,
            (
                obtenerValorDeAtributo(direccion) === DATOS_OK
                    && pais.value !== NINGUNO
            )
                ? VACIO
                : ELEMENTO_APAGADO
        );
    }

    function comprobarValidaciones() {
        definirAtributo.call(
            controlEnviar,
            CLASE,
            (
                obtenerValorDeAtributo(nombreYApellido) === DATOS_OK
                    && obtenerValorDeAtributo(correoElectronico) === DATOS_OK
                    && (
                    obtenerValorDeAtributo(clave) === DATOS_OK
                        || obtenerValorDeAtributo(clave) === CLAVE_MEDIA
                )
                    && obtenerValorDeAtributo(confirmacionClave) === DATOS_OK
                    && obtenerValorDeAtributo(fechaNacimiento) !== DATOS_KO
                    && obtenerValorDeAtributo(direccion) !== DATOS_KO
                    && obtenerValorDeAtributo(numeroTarjeta) !== DATOS_KO
            )
                ? VACIO
                : ELEMENTO_APAGADO
        );
    }

    function buscar() {
        var textoBusqueda = campoBusqueda.value,
            peticion;
        if (textoBusqueda) {
            peticion = new XMLHttpRequest();
            // Preparar la funcion de respuesta
            peticion.onreadystatechange = function () {
                var contenido;
                if (peticion.readyState < 4) {
                    contenido = "<img src=\"./img/imagenes/iconoCargando.gif\">";
                } else if (peticion.readyState === 4 && peticion.status === 200) {
                    contenido = peticion.responseText;
                } else {
                    contenido = "No encontramos resultados, introduzca otra búsqueda";
                }
                resultadoBusqueda.style.display = "inherit";
                resultadoBusqueda.innerHTML = contenido;
            };
            // Realizar peticion HTTP
            peticion.open(
                "GET",
                "//daw.hol.es/tiendaDeLibros/html/php/gestionBusqueda.php?key=" + textoBusqueda,
                true
            );
            peticion.send();
        } else {
            resultadoBusqueda.textContent = "";
        }
        /*$(".sinopsis").hover(
            function () {
                var elementoParrafo = $("<p>"),
                    sinopsis = $(this).parent().parent().data("sinopsis"),
                    texto = "Camina por " + nombrePais + " desde " + precio +
                            " € al día";
                $(this).parent().parent().append(elementoParrafo);
                elementoParrafo.text(texto).addClass("encima_fotos_destinos");
            },
            function () {
                $(".encima_fotos_destinos").remove();
            }
        );*/
    }


    //ASIGNACION DE EVENTOS
    asociarEventos.call(
        null,
        elementosConEventos,
        {keyup: "keyup", change: "change", mousedown: "mousedown", blur: "blur"},
        {
            comprobarCampo,
            comprobarValidaciones,
            abrirFormulario,
            apagarElemento,
            comprobarClases,
            buscar
        }
    );
};
window.onload = miApp;
