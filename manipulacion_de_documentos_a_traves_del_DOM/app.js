/*global
    window
*/
/*jslint
    es6, multivar, browser, this
*/
var miApp = function () {
        "use strict";
        (function () {
            var TITULO_DE_PAGINA = "Ejercicio DOM",
                NOMBRE_FORMULARIO_ENTRADA = "formulario_entrada",
                NOMBRE_FORMULARIO_DE_SALIDA = "resultado",
                NOMBRE_APLICACION = "Manipulación del documento a través del DOM",
                TEXTO_SELECCIONAR_ELEMENTO = "Elija un nuevo elemento HTML para insertar: ",
                TEXTO_ELEGIR_ID = "Identificador del elemento: ",
                PLACEHOLDER_ID = "Introduzca un identificador",
                TEXTO_ELEGIR_NOMBRE = "Nombre del elemento: ",
                PLACEHOLDER_NOMBRE = "nombre",
                TEXTO_BOTON_CREAR = "Crear elemento",
                TITULO_DE_FORMULARIO_SALIDA = "Aquí aparecerán los elementos creados",
                opciones = [
                    {
                        texto: "",
                        valor: "vacio"
                    },
                    {
                        texto: "Botón",
                        valor: "button"
                    },
                    {
                        texto: "Entrada",
                        valor: "input"
                    },
                    {
                        texto: "Selección",
                        valor: "select"
                    },
                    {
                        texto: "Texto",
                        valor: "text"
                    }
                ],
                elementoBody = document.body,
                elementoHtml = document.documentElement,
                scriptInicial = document.getElementsByTagName("script")[0],
                doctype = document.implementation.createDocumentType("html", "", ""),
                asignarPropiedadAElemento = function (propiedad, valor) {
                    this.setAttribute(propiedad, valor);
                },
                colocarElementoAntesdeHermano = function (elementoNuevo) {
                    this.parentNode.insertBefore(elementoNuevo, this);
                },
                crearNodoDeTexto = function (cadena) {
                    return document.createTextNode(cadena);
                },
                crearElemento = function (tipo) {
                    return document.createElement(tipo);
                },
                insertarNodoHijo = function (elemento) {
                    this.appendChild(elemento);
                },
                definirAtributo = function (atributo, valor) {
                    this.setAttribute(atributo, valor);
                },
                agregarEventoAElemento = function (evento, callback) {
                    return this.addEventListener(evento, callback);
                },
                elementoMeta = crearElemento("meta"),
                elementoTitle = crearElemento("title"),
                formularioEntrada = crearElemento("form"),
                formularioSalida = crearElemento("form"),
                seleccionTipoElemento = crearElemento("select"),
                nombreAplicacion = crearElemento("h1"),
                labelSeleccionTipoElemento = crearElemento("label"),
                saltoLinea = crearElemento("br"),
                labelIdElemento = crearElemento("label"),
                idElemento = crearElemento("input"),
                labelNombreElemento = crearElemento("label"),
                nombreElemento = crearElemento("input"),
                botonCrearElemento = crearElemento("button"),
                nombreSeccion = crearElemento("h2"),
                elementoTabla = crearElemento("table"),
                elementoFila = crearElemento("tr"),
                elementoCelda = crearElemento("td"),
                textoTitle,
                elementoOpcion,
                cabecera,
                textoSeleccionElemento,
                textoElegirId,
                textoElegirNombre,
                textoBotonCrear,
                textoFormularioSalida,
                mutationObserver = (function () {
                    var target = formularioSalida,
                        observer = new MutationObserver(function (mutations) {
                            mutations.forEach(function (mutation) {
                                var entry = {
                                    mutation: mutation,
                                    type: mutation.type,
                                    el: mutation.target,
                                    value: mutation.target.textContent,
                                    oldValue: mutation.oldValue
                                };
                                console.log('Recording mutation:', entry);
                            });
                        }),
                        config = {
                            subtree: true,
                            attributes: true,
                            childList: true,
                            characterData: true
                        };
                    observer.observe(target, config);
                }());

            //Elementos apagados de inicio
            botonCrearElemento.style.display = "none";


            //Opciones de elementos para crear
            opciones.map(function (opcion) {
                var elementoOpcion = crearElemento("option"),
                    nodoTexto = crearNodoDeTexto(opcion.texto);
                asignarPropiedadAElemento.call(elementoOpcion, "value", opcion.valor);
                insertarNodoHijo.call(elementoOpcion, nodoTexto);
                insertarNodoHijo.call(seleccionTipoElemento, elementoOpcion);
            });


            //CREAMOS NODOS DE TEXTO
            textoTitle = crearNodoDeTexto(TITULO_DE_PAGINA);
            cabecera = crearNodoDeTexto(NOMBRE_APLICACION);
            textoSeleccionElemento = crearNodoDeTexto(TEXTO_SELECCIONAR_ELEMENTO);
            textoElegirId = crearNodoDeTexto(TEXTO_ELEGIR_ID);
            textoElegirNombre = crearNodoDeTexto(TEXTO_ELEGIR_NOMBRE);
            textoBotonCrear = crearNodoDeTexto(TEXTO_BOTON_CREAR);
            textoFormularioSalida = crearNodoDeTexto(TITULO_DE_FORMULARIO_SALIDA);


            //ASIGNAMOS NODOS DE TEXTO A ELEMENTOS
            insertarNodoHijo.call(elementoTitle, textoTitle);
            insertarNodoHijo.call(nombreAplicacion, cabecera);
            insertarNodoHijo.call(labelSeleccionTipoElemento, textoSeleccionElemento);
            insertarNodoHijo.call(labelIdElemento, textoElegirId);
            insertarNodoHijo.call(labelNombreElemento, textoElegirNombre);
            insertarNodoHijo.call(botonCrearElemento, textoBotonCrear);
            insertarNodoHijo.call(nombreSeccion, textoFormularioSalida);


            //ASIGNAMOS PROPIEDADES A LOS ELEMENTOS
            asignarPropiedadAElemento.call(elementoHtml, "lang", "es");
            asignarPropiedadAElemento.call(scriptInicial, "id", "script_original");
            asignarPropiedadAElemento.call(scriptInicial, "type", "text/javascript");
            asignarPropiedadAElemento.call(elementoMeta, "charset", "utf-8");
            asignarPropiedadAElemento.call(formularioEntrada, "id", NOMBRE_FORMULARIO_ENTRADA);
            asignarPropiedadAElemento.call(formularioSalida, "id", NOMBRE_FORMULARIO_DE_SALIDA);
            asignarPropiedadAElemento.call(seleccionTipoElemento, "id", "tipo_elemento");
            asignarPropiedadAElemento.call(labelSeleccionTipoElemento, "for", "tipo_elemento");
            asignarPropiedadAElemento.call(labelIdElemento, "for", "id_elemento");
            asignarPropiedadAElemento.call(idElemento, "id", "id_elemento");
            asignarPropiedadAElemento.call(idElemento, "placeholder", PLACEHOLDER_ID);
            asignarPropiedadAElemento.call(labelNombreElemento, "for", "nombre_elemento");
            asignarPropiedadAElemento.call(nombreElemento, "id", "nombre_elemento");
            asignarPropiedadAElemento.call(nombreElemento, "placeholder", PLACEHOLDER_NOMBRE);
            asignarPropiedadAElemento.call(botonCrearElemento, "id", "boton_crear_elemento");
            asignarPropiedadAElemento.call(botonCrearElemento, "value", "Crear");


            //COLOCAMOS LOS ELEMENTOS
            colocarElementoAntesdeHermano.call(elementoHtml, doctype);
            colocarElementoAntesdeHermano.call(scriptInicial, elementoMeta);
            colocarElementoAntesdeHermano.call(scriptInicial, elementoTitle);
            insertarNodoHijo.call(elementoBody, nombreAplicacion);
            insertarNodoHijo.call(elementoBody, formularioEntrada);
            insertarNodoHijo.call(elementoBody, formularioSalida);
            insertarNodoHijo.call(formularioEntrada, labelSeleccionTipoElemento);
            insertarNodoHijo.call(formularioEntrada, seleccionTipoElemento);
            insertarNodoHijo.call(formularioEntrada, saltoLinea);
            insertarNodoHijo.call(formularioEntrada, labelIdElemento);
            insertarNodoHijo.call(formularioEntrada, idElemento);
            insertarNodoHijo.call(formularioEntrada, saltoLinea.cloneNode());
            insertarNodoHijo.call(formularioEntrada, labelNombreElemento);
            insertarNodoHijo.call(formularioEntrada, nombreElemento);
            insertarNodoHijo.call(formularioEntrada, saltoLinea.cloneNode());
            insertarNodoHijo.call(formularioEntrada, botonCrearElemento);
            insertarNodoHijo.call(formularioSalida, nombreSeccion);
            insertarNodoHijo.call(formularioSalida, elementoTabla);


            //LOGICA DEL SISTEMA
            //Definición de la clase Elemento
            function Elemento(tipo, id, nombre) {
                this.tipo = tipo;
                this.id = id;
                this.nombre = nombre;
            }
            /*//Definición de la clase Sistema
                function Sistema() {
                    this.borrarElemento = function () {
                        return document.removeChild(elemento);
                    };
                }
                //Definición de la clase Boton hija de la clase Elemento
                function Boton() {
                    Elemento.call(this, tipo, id, nombre);
                }
                //Herencia de propiedades y métodos
                Boton.prototype = Object.create(Elemento.prototype);
                Boton.prototype.constructor = Boton;
                //Definición de la clase Entrada hija de la clase Elemento
                function Entrada() {
                    Elemento.call(this, tipo, id, nombre);
                }
                //Herencia de propiedades y métodos
                Entrada.prototype = Object.create(Elemento.prototype);
                Entrada.prototype.constructor = Entrada;
                //Definición de la clase Selección hija de la clase Elemento
                function Seleccion() {
                    Elemento.call(this, tipo, id, nombre);
                }
                //Herencia de propiedades y métodos
                Seleccion.prototype = Object.create(Elemento.prototype);
                Seleccion.prototype.constructor = Seleccion;
                //Definición de la clase Texto hija de la clase Elemento
                function Texto() {
                    Elemento.call(this, tipo, id, nombre);
                }
                //Herencia de propiedades y métodos
                Texto.prototype = Object.create(Elemento.prototype);
                Texto.prototype.constructor = Texto;

                //Creación del objeto sistema
                sistema = new Sistema();
                */


            //MANEJADORES DE EVENTOS
            function encenderBotonCrear() {
                botonCrearElemento.style.display = (
                        document.querySelector("#tipo_elemento").value === "vacio" ||
                        !document.querySelector("#id_elemento").value ||
                        !document.querySelector("#nombre_elemento").value
                    ) ?
                    "none" :
                    "inherit";
            }

            function anyadirElemento() {
                var elemento = new Elemento(
                        seleccionTipoElemento.value,
                        idElemento.value,
                        nombreElemento.value
                    ),
                    nuevoElemento = crearElemento(elemento.tipo);
                asignarPropiedadAElemento.call(nuevoElemento, "id", elemento.id);
                asignarPropiedadAElemento.call(nuevoElemento, "name", elemento.nombre);
                insertarNodoHijo.call(elementoTabla, elementoFila);
                insertarNodoHijo.call(elementoFila, elementoCelda);
                insertarNodoHijo.call(elementoCelda, nuevoElemento);
            }

            //ASIGNACION DE EVENTOS
            agregarEventoAElemento.call(
                seleccionTipoElemento,
                "change",
                encenderBotonCrear
            );
            agregarEventoAElemento.call(
                idElemento,
                "change",
                encenderBotonCrear
            );
            agregarEventoAElemento.call(
                nombreElemento,
                "change",
                encenderBotonCrear
            );
            agregarEventoAElemento.call(
                botonCrearElemento,
                "mousedown",
                anyadirElemento
            );
        }());
    },
    MIAPLICACION = miApp || {};
window.onload = MIAPLICACION;
