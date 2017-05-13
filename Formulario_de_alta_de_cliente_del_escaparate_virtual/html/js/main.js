//TO_DO
//El correo electronico acepta espacios en el lado local
//La clave no obliga a poner uno de cada tipo
var miApp = (function () {
    "use strict";
    var VALIDACION_NOMBRE = new RegExp(/^([a-zA-Zá-úÁ-Ú]+\s[a-zA-Zá-úÁ-Ú]+|[a-zA-Zá-úÁ-Ú]+)$/),
        VALIDACION_CORREO_ELECTRONICO = new RegExp(/^[\w.!#$%&'*+\/=?\^@`{|}~\-]+@[\w\-\.]+\.[a-z]{2,6}$/),
        VALIDACION_CLAVE = new RegExp(/(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
        VALIDACION_FECHA = new RegExp(/^\d{2}\/\d{2}\/\d{2}$/),
        VALIDACION_NUMERO_TARJETA = new RegExp(/^\d{4}-\d{4}-\d{4}-\d{4}$/),
        CLASE = "class",
        ESPACIO = " ",
        VACIO = "",
        SI_DEFINIDO = "si_definido",
        NO_DEFINIDO = "no_definido",
        DATOS_OK = "datos_ok",
        DATOS_KO = "datos_ko",
        ELEMENTO_APAGADO = "elemento_apagado",
        FORMULARIO_ABIERTO = "formulario_abierto",
        formulario,
        registro,
        botonCerrarFormulario,
        botonEnviarFormulario,
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
        $ = function () {
            return document.getElementById(this);
        },
        asociarEvento = function (tipo, evento) {
            this.addEventListener(tipo, evento);
        },
        definirAtributo = function (atributo, valor) {
            this.setAttribute(atributo, valor);
        },
        inicializar = (function () {
            registro = $.call("opcion_registro");
            formulario = $.call("formulario");
            botonCerrarFormulario = $.call("formulario_cerrar");
            botonEnviarFormulario = $.call("boton_enviar_formulario");
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
            && cadena.split(ESPACIO).length === 1;
    }

    function validarConfirmacionClave(cadena) {
        return cadena === clave.value;
    }

    function validarComponentesFecha(dia, mes, anyo) {
        var fechaIntroducida, validacion, datosCorrectos, numeroMes;
        anyo = `${anyo > 30
            ? "19"
            : "20"}${anyo}`;
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
            anyoIntroducido = cadena.substr(6, 2);
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
        case "numero_tarjeta":
            validacion = validarNumeroTarjeta(valor);
            break;
        }
        return validacion;
    }


    //MANEJADORES DE EVENTOS
    function abrirFormulario() {
        definirAtributo.call(formulario, CLASE, FORMULARIO_ABIERTO);
    }

    function cerrarFormulario() {
        definirAtributo.call(formulario, CLASE, ELEMENTO_APAGADO);
    }

    function comprobarCampo(e) {
        var campo = e.currentTarget,
            valor = campo.value;
        if (valor) {
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

    function comprobarClases(e) {
        var elemento = e.currentTarget;
        definirAtributo.call(elemento, CLASE, !elemento.value
                                                ? NO_DEFINIDO
                                                : SI_DEFINIDO
        );
        definirAtributo.call(
            filaTarjeta,
            CLASE,
            direccion.getAttribute(CLASE) === SI_DEFINIDO
                && pais.getAttribute(CLASE) === SI_DEFINIDO
                ? VACIO
                : ELEMENTO_APAGADO
        );
    }

    function comprobarObligatorios() {
        definirAtributo.call(controlEnviar,
                             CLASE,
                             nombreYApellido.getAttribute(CLASE) === DATOS_OK
                                 && correoElectronico.getAttribute(CLASE) === DATOS_OK
                                 && clave.getAttribute(CLASE) === DATOS_OK
                                 && confirmacionClave.getAttribute(CLASE) === DATOS_OK
                                    ? VACIO
                                    : ELEMENTO_APAGADO
                            );
    }


    //ASIGNACION DE EVENTOS
    asociarEvento.call(registro, "mousedown", abrirFormulario);
    asociarEvento.call(
        botonCerrarFormulario,
        "mousedown",
        cerrarFormulario
    );
    asociarEvento.call(nombreYApellido, "keyup", comprobarCampo);
    asociarEvento.call(nombreYApellido, "change", comprobarObligatorios);
    asociarEvento.call(correoElectronico, "keyup", comprobarCampo);
    asociarEvento.call(correoElectronico, "change", comprobarObligatorios);
    asociarEvento.call(clave, "keyup", comprobarCampo);
    asociarEvento.call(clave, "change", comprobarObligatorios);
    asociarEvento.call(confirmacionClave, "keyup", comprobarCampo);
    asociarEvento.call(confirmacionClave, "change", comprobarObligatorios);
    asociarEvento.call(fechaNacimiento, "keyup", comprobarCampo);
    asociarEvento.call(direccion, "keyup", comprobarClases);
    asociarEvento.call(pais, "change", comprobarClases);
    asociarEvento.call(numeroTarjeta, "keyup", comprobarCampo);
}());
