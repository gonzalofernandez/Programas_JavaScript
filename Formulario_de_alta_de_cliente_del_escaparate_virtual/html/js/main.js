//TO_DO
//Expresiones regulares de la clave no chequean si hay uno de cada
//Puedo usar Polyfill para type=date?
//window.onload ?
"use strict";
var miApp = (function () {
        var VALIDACION_NOMBRE = new RegExp(/^(\w+ \w+)|(\w+)$/),
            VALIDACION_CORREO_ELECTRONICO = new RegExp(/^[\w-.]+@[\w-.]+\.[a-zA-Z]{2,6}$/),
            VALIDACION_CLAVE = new RegExp(/[\w+\W+\^ ]{8,}/),
            VALIDACION_FECHA = new RegExp(/^\d{2}\/\d{2}\/\d{2}$/),
            CLASE = "class",
            ESPACIO = " ",
            SI_DEFINICION = "si_definido",
            NO_DEFINICION = "no_definido",
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
            }()),
            definirAtributo = function (atributo, valor) {
                this.setAttribute(atributo, valor);
            };


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

        function validarFechaNacimiento(fecha) {
            var validacion, diaIntroducido, mesIntroducido, anyoIntroducido;
            if (!VALIDACION_FECHA.test(fecha)) {
                validacion = false;
            } else {
                diaIntroducido = fecha.substr(0, 2);
                mesIntroducido = fecha.substr(3, 2);
                anyoIntroducido = fecha.substr(6, 2);
                validacion = validarComponentesFecha(
                    diaIntroducido,
                    mesIntroducido,
                    anyoIntroducido
                );
            }
            return validacion;
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
            }
            return validacion;
        }


        //MANEJADORES DE EVENTOS
        function abrirFormulario() {
            definirAtributo.call(formulario, CLASE, "formulario_abierto");
        }

        function cerrarFormulario() {
            definirAtributo.call(formulario, CLASE, "elemento_apagado");
        }

        function comprobarCampo(e) {
            var campo = e.currentTarget;
            if (campo.value) {
                definirAtributo.call(
                    campo,
                    CLASE,
                    validarContenidoCampo(campo.id, campo.value)
                        ? "datos_ok"
                        : "datos_ko"
                );
            } else {
                definirAtributo.call(campo, CLASE, "");
            }
        }

        function comprobarClases(e) {
            var elemento = e.currentTarget;
            definirAtributo.call(elemento, CLASE, !elemento.value
                                                    ? NO_DEFINICION
                                                    : SI_DEFINICION
            );
            definirAtributo.call(
                filaTarjeta,
                CLASE,
                direccion.getAttribute(CLASE) === SI_DEFINICION
                    && pais.getAttribute(CLASE) === SI_DEFINICION
                    ? ""
                    : "elemento_apagado"
            );
        }

        function comprobarObligatorios() {
            definirAtributo.call(controlEnviar,
                                 CLASE,
                                 nombreYApellido.getAttribute(CLASE) === "datos_ok"
                                     && correoElectronico.getAttribute(CLASE) === "datos_ok"
                                     && clave.getAttribute(CLASE) === "datos_ok"
                                     && confirmacionClave.getAttribute(CLASE) === "datos_ok"
                                        ? ""
                                        : "elemento_apagado"
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
    }());
