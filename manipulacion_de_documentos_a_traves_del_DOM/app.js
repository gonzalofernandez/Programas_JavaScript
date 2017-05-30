/*jslint
    es6, multivar, browser, this
*/
var miApp = (function () {
        "use strict";
        var CDN_UNDERSCOREJS = "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js",
            TITULO_DE_PAGINA = "Ejercicio DOM",
            NOMBRE_FORMULARIO_ENTRADA = "formulario_entrada",
            NOMBRE_FORMULARIO_DE_SALIDA = "resultado",
            NOMBRE_APLICACION = "Manipulación del documento a través del DOM",
            TITULO_ATRIBUTOS_OBLIGATORIOS = "Propiedades obligatorias",
            TITULO_ATRIBUTOS_ELEMENTO = "Propiedades opcionales",
            TITULO_ELEMENTOS_OPTION = "Cree opciones <option> para el <select>:",
            TITULO_DE_FORMULARIO_SALIDA = "Aquí aparecerán los elementos creados",
            TEXTO_SELECCIONAR_ELEMENTO = "Elija un nuevo elemento HTML para insertar: ",
            TEXTO_ELEGIR_ID = "ID: ",
            PLACEHOLDER_ID = "Introduzca un identificador",
            TEXTO_ELEGIR_NOMBRE = "NAME: ",
            PLACEHOLDER_NOMBRE = "nombre",
            TEXTO_ELEGIR_CONTENIDO = "Contenido: ",
            TEXTO_BOTON_CREAR = "Crear elemento",
            TEXTO_BOTON_OPTION = "Crear opción",
            TEXTO_BOTON_BORRAR = "Borrar elemento",
            TEXTO_TIPO = "TYPE: ",
            TEXTO_VALOR_OPCION = "VALUE: ",
            TEXTO_COLUMNAS = "COLS: ",
            TEXTO_FILAS = "ROWS: ",
            TEXTO_MAX_CARACTERES = "MAXLENGTH: ",
            TEXTO_ID_REPETIDO = "El ID ya existe",
            TEXTO_NOMBRE_REPETIDO = "El NAME ya existe",
            TEXTO_BORRAR_ELEMENTO = "Escriba el ID del elemento a borrar: ",
            sistema,
            nuevasOpciones = [],
            //OPCIONES DE LOS ELEMENTOS select
            opcionesElemento = [
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
                    valor: "textarea"
                    }
                ],
            opcionesTipoEntrada = [
                {
                    texto: "Checkbox",
                    valor: "checkbox"
                    },
                {
                    texto: "Radio",
                    valor: "radio"
                    },
                {
                    texto: "Range",
                    valor: "range"
                    },
                {
                    texto: "Password",
                    valor: "password"
                    },
                {
                    texto: "Date",
                    valor: "date"
                    }
                ],
            opcionesBoton = [
                {
                    texto: "Button",
                    valor: "button"
                },
                {
                    texto: "Submit",
                    valor: "submit"
                },
                {
                    texto: "Reset",
                    valor: "reset"
                }
            ],
            //ELEMENTOS INICIALES
            elementoHtml = document.documentElement,
            elementoHead = document.head,
            scriptInicial = document.getElementsByTagName("script")[0],
            //DEFINICIÓN DEL TIPO DE DOCUMENTO
            doctype = document.implementation.createDocumentType("html", "", ""),
            //FUNCIONES DE AYUDA
            asignarPropiedadAElemento = function (propiedad, valor) {
                if (Array.isArray(this)) {
                    this.map(function (elemento) {
                        elemento.setAttribute(propiedad, valor);
                    });
                } else {
                    this.setAttribute(propiedad, valor);
                }
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
            agregarEvento = function (evento, callback) {
                this.addEventListener(evento, callback);
            },
            agregarEventosAElementos = function (evento, callbacks) {
                this.map(function (elemento) {
                    switch (elemento.id) {
                        case "boton_crear_elemento":
                            agregarEvento.call(
                                elemento,
                                evento.mousedown,
                                callbacks.incluirElemento
                            );
                            break;
                        case "tipo_elemento":
                            agregarEvento.call(
                                elemento,
                                evento.change,
                                callbacks.comprobarCampos
                            );
                            break;
                        case "boton_nueva_opcion":
                            agregarEvento.call(
                                elemento,
                                evento.mousedown,
                                callbacks.crearOpcionNuevoSelector
                            );
                            break;
                        case "id_elemento":
                        case "nombre_elemento":
                            agregarEvento.call(
                                elemento,
                                evento.keyup,
                                callbacks.comprobarIdentificadoresRepetidos
                            );
                            break;
                        case "boton_eliminar_elemento":
                            agregarEvento.call(
                                elemento,
                                evento.mousedown,
                                callbacks.eliminarElemento
                            );
                            break;
                        case "id_borrar":
                            agregarEvento.call(
                                elemento,
                                evento.keyup,
                                callbacks.encenderBotonBorrar
                            );
                            break;
                    }
                });
            },
            vaciarElementos = function () {
                this.map(function (elemento) {
                    elemento.value = "";
                });
            },
            comprobarNumeroElementos  = function () {
                asignarPropiedadAElemento.call(
                    [labelIdParaBorrar, idParaBorrar],
                    "style",
                    `display: ${sistema.elementos.length > 0 ? "inherit" : "none"}`
                );
            },
            //CREAMOS ELEMENTOS INICIALES
            scriptUnderscoreJS = crearElemento("script"),
            elementoMeta = crearElemento("meta"),
            elementoTitle = crearElemento("title"),
            elementoBody = crearElemento("body"),
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
            labelContenidoElemento = crearElemento("label"),
            contenidoElemento = crearElemento("input"),
            botonCrearElemento = crearElemento("button"),
            tituloAtributosObligatorios = crearElemento("h2"),
            tituloAtributosOpcionales = crearElemento("h2"),
            nombreSeccion = crearElemento("h2"),
            tituloElementosOption = crearElemento("h3"),
            elementoTabla = crearElemento("table"),
            elementoThead = crearElemento("thead"),
            elementoTbody = crearElemento("tbody"),
            labelTipoEntrada = crearElemento("label"),
            tipoEntrada = crearElemento("select"),
            labelValor = crearElemento("label"),
            valorOpcion = crearElemento("input"),
            botonNuevaOpcion = crearElemento("button"),
            labelColumnas = crearElemento("label"),
            columnas = crearElemento("input"),
            labelFilas = crearElemento("label"),
            filas = crearElemento("input"),
            labelMaxCaracteres = crearElemento("label"),
            maxCaracteres = crearElemento("input"),
            labelTipoBoton = crearElemento("label"),
            tipoBoton = crearElemento("select"),
            avisoId = crearElemento("p"),
            avisoNombre = crearElemento("p"),
            botonBorrarElemento = crearElemento("button"),
            idParaBorrar = crearElemento("input"),
            labelIdParaBorrar = crearElemento("label"),
            //CREAMOS NODOS DE TEXTO
            textoTitle = crearNodoDeTexto(TITULO_DE_PAGINA),
            cabecera = crearNodoDeTexto(NOMBRE_APLICACION),
            textoAtributosObligatorios = crearNodoDeTexto(TITULO_ATRIBUTOS_OBLIGATORIOS),
            textoAtributosOpcionales = crearNodoDeTexto(TITULO_ATRIBUTOS_ELEMENTO),
            textoSeleccionElemento = crearNodoDeTexto(TEXTO_SELECCIONAR_ELEMENTO),
            textoElegirId = crearNodoDeTexto(TEXTO_ELEGIR_ID),
            textoElegirNombre = crearNodoDeTexto(TEXTO_ELEGIR_NOMBRE),
            textoElegirContenido = crearNodoDeTexto(TEXTO_ELEGIR_CONTENIDO),
            textoBotonCrear = crearNodoDeTexto(TEXTO_BOTON_CREAR),
            textoFormularioSalida = crearNodoDeTexto(TITULO_DE_FORMULARIO_SALIDA),
            textoTipoEntrada = crearNodoDeTexto(TEXTO_TIPO),
            textoValor = crearNodoDeTexto(TEXTO_VALOR_OPCION),
            textoNuevasOpciones = crearNodoDeTexto(TITULO_ELEMENTOS_OPTION),
            textoCrearOpcion = crearNodoDeTexto(TEXTO_BOTON_OPTION),
            textoColumnas = crearNodoDeTexto(TEXTO_COLUMNAS),
            textoFilas = crearNodoDeTexto(TEXTO_FILAS),
            textoLongMax = crearNodoDeTexto(TEXTO_MAX_CARACTERES),
            textoTipoBoton = crearNodoDeTexto(TEXTO_TIPO),
            textoAvisoId = crearNodoDeTexto(TEXTO_ID_REPETIDO),
            textoAvisoNombre = crearNodoDeTexto(TEXTO_NOMBRE_REPETIDO),
            textoBorrarId = crearNodoDeTexto(TEXTO_BORRAR_ELEMENTO),
            textoBotonBorrarElemento = crearNodoDeTexto(TEXTO_BOTON_BORRAR),
            elementosConEventos = [
                seleccionTipoElemento,
                idElemento,
                nombreElemento,
                botonCrearElemento,
                tipoEntrada,
                labelValor,
                valorOpcion,
                botonNuevaOpcion,
                labelColumnas,
                columnas,
                labelFilas,
                filas,
                labelMaxCaracteres,
                maxCaracteres,
                labelTipoBoton,
                tipoBoton,
                botonNuevaOpcion,
                avisoId,
                avisoNombre,
                botonBorrarElemento,
                idParaBorrar
            ],
            elementosConOpciones = [seleccionTipoElemento, tipoEntrada, tipoBoton],
            elementosApagadosAlInicio = [
                botonCrearElemento,
                labelContenidoElemento,
                contenidoElemento,
                labelTipoEntrada,
                tipoEntrada,
                labelValor,
                valorOpcion,
                botonNuevaOpcion,
                tituloElementosOption,
                labelColumnas,
                labelFilas,
                labelMaxCaracteres,
                columnas,
                filas,
                maxCaracteres,
                labelTipoBoton,
                tipoBoton,
                avisoId,
                avisoNombre,
                labelIdElemento,
                idElemento,
                labelNombreElemento,
                nombreElemento,
                botonBorrarElemento,
                labelIdParaBorrar,
                idParaBorrar
            ],
            elementosAVaciar = [
                    idElemento,
                    nombreElemento,
                    contenidoElemento,
                    valorOpcion,
                    columnas,
                    filas,
                    maxCaracteres,
                    botonCrearElemento
                ],
            //HABILITAR EL OBJETO MutationObserver PARA TODOS LOS NAVEGADORES
            MutationObserver = window.MutationObserver ||
            window.WebKitMutationObserver,
            //CREACIÓN DEL OBSERVADOR DE CAMBIOS EN EL DOM Y PUESTA EN MARCHA
            mutationObserver = (function () {
                var observer = new MutationObserver(function (mutations) {
                        mutations.forEach(function (mutation) {
                            var entry = {
                                mutation: mutation,
                                type: mutation.type,
                                el: mutation.target,
                                value: mutation.target.style.display,
                                oldValue: mutation.oldValue
                            };
                            console.log("Recording mutation:", entry);
                            (function () {
                                asignarPropiedadAElemento.call(
                                    botonCrearElemento,
                                    "style",
                                    `display: ${(
                                            entry.value === "inline"
                                            || !nombreElemento.value
                                            || !idElemento.value
                                        )
                                        ? "none"
                                        : "inherit"}`
                                );
                                asignarPropiedadAElemento.call(
                                    botonNuevaOpcion,
                                    "style",
                                    `display: ${(
                                        seleccionTipoElemento.value === "select"
                                        && botonCrearElemento.style.display === "inherit"
                                    )
                                        ? "inherit"
                                        : "none"}`
                                );
                            }());
                        });
                    }),
                    config = {
                        attributes: true,
                        childList: true,
                        characterData: true
                    };
                observer.observe(avisoId, config);
                observer.observe(avisoNombre, config);
            }());



        //ASIGNAMOS NODOS DE TEXTO A ELEMENTOS
        insertarNodoHijo.call(elementoTitle, textoTitle);
        insertarNodoHijo.call(nombreAplicacion, cabecera);
        insertarNodoHijo.call(tituloAtributosObligatorios, textoAtributosObligatorios);
        insertarNodoHijo.call(tituloAtributosOpcionales, textoAtributosOpcionales);
        insertarNodoHijo.call(labelSeleccionTipoElemento, textoSeleccionElemento);
        insertarNodoHijo.call(labelIdElemento, textoElegirId);
        insertarNodoHijo.call(labelNombreElemento, textoElegirNombre);
        insertarNodoHijo.call(labelContenidoElemento, textoElegirContenido);
        insertarNodoHijo.call(botonCrearElemento, textoBotonCrear);
        insertarNodoHijo.call(nombreSeccion, textoFormularioSalida);
        insertarNodoHijo.call(labelTipoEntrada, textoTipoEntrada);
        insertarNodoHijo.call(labelValor, textoValor);
        insertarNodoHijo.call(tituloElementosOption, textoNuevasOpciones);
        insertarNodoHijo.call(botonNuevaOpcion, textoCrearOpcion);
        insertarNodoHijo.call(labelColumnas, textoColumnas);
        insertarNodoHijo.call(labelFilas, textoFilas);
        insertarNodoHijo.call(labelMaxCaracteres, textoLongMax);
        insertarNodoHijo.call(labelTipoBoton, textoTipoBoton);
        insertarNodoHijo.call(avisoId, textoAvisoId);
        insertarNodoHijo.call(avisoNombre, textoAvisoNombre);
        insertarNodoHijo.call(labelIdParaBorrar, textoBorrarId);
        insertarNodoHijo.call(botonBorrarElemento, textoBotonBorrarElemento);


        //ASIGNAMOS PROPIEDADES A LOS ELEMENTOS
        asignarPropiedadAElemento.call(elementoHtml, "lang", "es");
        asignarPropiedadAElemento.call(scriptInicial, "type", "text/javascript");
        asignarPropiedadAElemento.call(scriptUnderscoreJS, "src", CDN_UNDERSCOREJS);
        asignarPropiedadAElemento.call(elementoMeta, "charset", "utf-8");
        asignarPropiedadAElemento.call(
            formularioEntrada,
            "id",
            NOMBRE_FORMULARIO_ENTRADA
        );
        asignarPropiedadAElemento.call(
            formularioSalida,
            "id",
            NOMBRE_FORMULARIO_DE_SALIDA
        );
        asignarPropiedadAElemento.call(
            labelSeleccionTipoElemento,
            "for",
            "tipo_elemento"
        );
        asignarPropiedadAElemento.call(seleccionTipoElemento, "id", "tipo_elemento");
        asignarPropiedadAElemento.call(labelIdElemento, "for", "id_elemento");
        asignarPropiedadAElemento.call(idElemento, "id", "id_elemento");
        asignarPropiedadAElemento.call(idElemento, "placeholder", PLACEHOLDER_ID);
        asignarPropiedadAElemento.call(labelNombreElemento, "for", "nombre_elemento");
        asignarPropiedadAElemento.call(nombreElemento, "id", "nombre_elemento");
        asignarPropiedadAElemento.call(
            nombreElemento,
            "placeholder",
            PLACEHOLDER_NOMBRE
        );
        asignarPropiedadAElemento.call(botonCrearElemento, "id", "boton_crear_elemento");
        //asignarPropiedadAElemento.call(botonCrearElemento, "value", "Crear");
        asignarPropiedadAElemento.call(botonCrearElemento, "type", "button");
        asignarPropiedadAElemento.call(
            labelContenidoElemento,
            "for",
            "contenido_elemento"
        );
        asignarPropiedadAElemento.call(contenidoElemento, "id", "contenido_elemento");
        asignarPropiedadAElemento.call(labelTipoEntrada, "for", "tipo_entrada");
        asignarPropiedadAElemento.call(tipoEntrada, "id", "tipo_entrada");
        asignarPropiedadAElemento.call(labelValor, "for", "valor_opcion");
        asignarPropiedadAElemento.call(valorOpcion, "id", "valor_opcion");
        asignarPropiedadAElemento.call(botonNuevaOpcion, "id", "boton_nueva_opcion");
        asignarPropiedadAElemento.call(botonNuevaOpcion, "type", "button");
        asignarPropiedadAElemento.call(labelColumnas, "for", "numero_columnas");
        asignarPropiedadAElemento.call(columnas, "id", "numero_columnas");
        asignarPropiedadAElemento.call(labelFilas, "for", "numero_filas");
        asignarPropiedadAElemento.call(filas, "id", "numero_filas");
        asignarPropiedadAElemento.call(labelMaxCaracteres, "for", "numero_caracteres");
        asignarPropiedadAElemento.call(maxCaracteres, "id", "numero_caracteres");
        asignarPropiedadAElemento.call(labelTipoBoton, "for", "tipo_boton");
        asignarPropiedadAElemento.call(tipoBoton, "id", "tipo_boton");
        asignarPropiedadAElemento.call(avisoId, "id", "aviso_id");
        asignarPropiedadAElemento.call(avisoNombre, "id", "aviso_nombre");
        asignarPropiedadAElemento.call(
            labelIdParaBorrar,
            "for",
            "id_borrar"
        );
        asignarPropiedadAElemento.call(
            idParaBorrar,
            "id",
            "id_borrar"
        );
        asignarPropiedadAElemento.call(
            botonBorrarElemento,
            "id",
            "boton_eliminar_elemento"
        );
        asignarPropiedadAElemento.call(
            botonBorrarElemento,
            "type",
            "button"
        );
        agregarEvento.call(
            botonBorrarElemento,
            "mousedown",
            eliminarElemento
        );
        //Elementos apagados de inicio
        asignarPropiedadAElemento.call(
            elementosApagadosAlInicio,
            "style",
            "display: none"
        );


        //COLOCAMOS LOS ELEMENTOS
        colocarElementoAntesdeHermano.call(elementoHtml, doctype);
        colocarElementoAntesdeHermano.call(scriptInicial, elementoMeta);
        colocarElementoAntesdeHermano.call(scriptInicial, elementoTitle);
        colocarElementoAntesdeHermano.call(scriptInicial, scriptUnderscoreJS);
        insertarNodoHijo.call(elementoHtml, elementoBody);
        insertarNodoHijo.call(elementoBody, nombreAplicacion);
        insertarNodoHijo.call(elementoBody, formularioEntrada);
        insertarNodoHijo.call(formularioEntrada, labelSeleccionTipoElemento);
        insertarNodoHijo.call(formularioEntrada, seleccionTipoElemento);
        insertarNodoHijo.call(formularioEntrada, saltoLinea);
        insertarNodoHijo.call(formularioEntrada, tituloAtributosObligatorios);
        insertarNodoHijo.call(formularioEntrada, labelIdElemento);
        insertarNodoHijo.call(formularioEntrada, idElemento);
        insertarNodoHijo.call(formularioEntrada, avisoId);
        insertarNodoHijo.call(formularioEntrada, saltoLinea.cloneNode());
        insertarNodoHijo.call(formularioEntrada, labelNombreElemento);
        insertarNodoHijo.call(formularioEntrada, nombreElemento);
        insertarNodoHijo.call(formularioEntrada, avisoNombre);
        insertarNodoHijo.call(formularioEntrada, tituloAtributosOpcionales);
        insertarNodoHijo.call(formularioEntrada, tituloElementosOption);
        insertarNodoHijo.call(formularioEntrada, labelContenidoElemento);
        insertarNodoHijo.call(formularioEntrada, contenidoElemento);
        insertarNodoHijo.call(formularioEntrada, saltoLinea.cloneNode());
        insertarNodoHijo.call(formularioEntrada, labelTipoBoton);
        insertarNodoHijo.call(formularioEntrada, tipoBoton);
        insertarNodoHijo.call(formularioEntrada, labelTipoEntrada);
        insertarNodoHijo.call(formularioEntrada, tipoEntrada);
        insertarNodoHijo.call(formularioEntrada, labelValor);
        insertarNodoHijo.call(formularioEntrada, valorOpcion);
        insertarNodoHijo.call(formularioEntrada, saltoLinea.cloneNode());
        insertarNodoHijo.call(formularioEntrada, botonNuevaOpcion);
        insertarNodoHijo.call(formularioEntrada, labelColumnas);
        insertarNodoHijo.call(formularioEntrada, columnas);
        insertarNodoHijo.call(formularioEntrada, saltoLinea.cloneNode());
        insertarNodoHijo.call(formularioEntrada, labelFilas);
        insertarNodoHijo.call(formularioEntrada, filas);
        insertarNodoHijo.call(formularioEntrada, saltoLinea.cloneNode());
        insertarNodoHijo.call(formularioEntrada, labelMaxCaracteres);
        insertarNodoHijo.call(formularioEntrada, maxCaracteres);
        insertarNodoHijo.call(formularioEntrada, saltoLinea.cloneNode());
        insertarNodoHijo.call(formularioEntrada, saltoLinea.cloneNode());
        insertarNodoHijo.call(formularioEntrada, botonCrearElemento);
        insertarNodoHijo.call(elementoBody, formularioSalida);
        insertarNodoHijo.call(formularioSalida, nombreSeccion);
        insertarNodoHijo.call(formularioSalida, elementoTabla);
        insertarNodoHijo.call(elementoTabla, elementoThead);
        insertarNodoHijo.call(elementoThead, labelIdParaBorrar);
        insertarNodoHijo.call(elementoThead, idParaBorrar);
        insertarNodoHijo.call(elementoThead, botonBorrarElemento);
        insertarNodoHijo.call(botonBorrarElemento, textoBotonBorrarElemento);
        insertarNodoHijo.call(elementoTabla, elementoTbody);


        //ASIGNAR OPCIONES A LOS ELEMENTOS SELECT
        (function asignarOpcionesElemento() {
            elementosConOpciones.map(function (elemento) {
                var opciones;
                switch (elemento.id) {
                    case "tipo_elemento":
                        opciones = opcionesElemento;
                        break;
                    case "tipo_entrada":
                        opciones = opcionesTipoEntrada;
                        break;
                    default:
                        opciones = opcionesBoton;
                }
                opciones.map(function (opcion) {
                    var elementoOpcion = crearElemento("option"),
                        nodoTexto = crearNodoDeTexto(opcion.texto);
                    asignarPropiedadAElemento.call(
                        elementoOpcion,
                        "value",
                        opcion.valor
                    );
                    insertarNodoHijo.call(elementoOpcion, nodoTexto);
                    insertarNodoHijo.call(elemento, elementoOpcion);
                });
            });
        }());


        //LOGICA DEL SISTEMA
        //Definición de la clase Sistema
        function Sistema() {
            //Propiedades
            this.elementos = [];
            //Métodos
            this.generarNuevoElemento = function () {
                var nuevoElemento;
                switch (seleccionTipoElemento.value) {
                    case "input":
                        nuevoElemento = new Entrada(
                            idElemento.value,
                            nombreElemento.value,
                            tipoEntrada.value
                        );
                        break;
                    case "select":
                        nuevoElemento = new Selector(
                            idElemento.value,
                            nombreElemento.value,
                            nuevasOpciones
                        );
                        break;
                    case "textarea":
                        nuevoElemento = new TextArea(
                            idElemento.value,
                            nombreElemento.value,
                            columnas.value,
                            filas.value,
                            maxCaracteres.value
                        );
                        break;
                    default:
                        nuevoElemento = new Boton(
                            idElemento.value,
                            nombreElemento.value,
                            contenidoElemento.value,
                            tipoBoton.value
                        );
                }
                this.elementos.push(nuevoElemento);
            };

            this.insertarElementos = function () {
                var nuevoElemento;
                while (elementoTbody.children.length > 0) {
                    elementoTbody.lastElementChild.remove();
                }
                _.each(this.elementos, function (elemento) {
                    var elementoFila,
                        elementoCelda;
                    switch (elemento.constructor.name) {
                        case "Boton":
                            nuevoElemento = crearElemento("button");
                            asignarPropiedadAElemento.call(
                                nuevoElemento,
                                "id",
                                elemento.id
                            );
                            asignarPropiedadAElemento.call(
                                nuevoElemento,
                                "name",
                                elemento.nombre
                            );
                            asignarPropiedadAElemento.call(
                                nuevoElemento,
                                "type",
                                elemento.tipoBoton
                            );
                            insertarNodoHijo.call(
                                nuevoElemento,
                                crearNodoDeTexto(elemento.contenido)
                            );
                            break;
                        case "Entrada":
                            nuevoElemento = crearElemento("button");
                            asignarPropiedadAElemento.call(
                                nuevoElemento,
                                "id",
                                elemento.id
                            );
                            asignarPropiedadAElemento.call(
                                nuevoElemento,
                                "name",
                                elemento.nombre
                            );
                            asignarPropiedadAElemento.call(
                                nuevoElemento,
                                "type",
                                elemento.tipoEntrada
                            );
                            break;
                        case "TextArea":
                            nuevoElemento = crearElemento("textarea");
                            asignarPropiedadAElemento.call(
                                nuevoElemento,
                                "id",
                                elemento.id
                            );
                            asignarPropiedadAElemento.call(
                                nuevoElemento,
                                "name",
                                elemento.nombre
                            );
                            asignarPropiedadAElemento.call(
                                nuevoElemento,
                                "cols",
                                elemento.columnas
                            );
                            asignarPropiedadAElemento.call(
                                nuevoElemento,
                                "rows",
                                elemento.filas
                            );
                            asignarPropiedadAElemento.call(
                                nuevoElemento,
                                "maxlength",
                                elemento.maxCaracteres
                            );
                            break;
                        default:
                            nuevoElemento = crearElemento("select");
                            asignarPropiedadAElemento.call(
                                nuevoElemento,
                                "id",
                                elemento.id
                            );
                            asignarPropiedadAElemento.call(
                                nuevoElemento,
                                "name",
                                elemento.nombre
                            );
                            _.each(elemento.opciones, function (opcion) {
                                var elementoOpcion = crearElemento("option"),
                                    nodoTexto = crearNodoDeTexto(opcion.contenido);
                                asignarPropiedadAElemento.call(
                                    elementoOpcion,
                                    "value",
                                    opcion.valor
                                );
                                insertarNodoHijo.call(elementoOpcion, nodoTexto);
                                insertarNodoHijo.call(nuevoElemento, elementoOpcion);
                            });
                    }
                    elementoFila = crearElemento("tr");
                    elementoCelda = crearElemento("td");
                    insertarNodoHijo.call(elementoTbody, elementoFila);
                    insertarNodoHijo.call(elementoFila, elementoCelda);
                    insertarNodoHijo.call(elementoCelda, nuevoElemento);
                });
            };

            this.borrarElemento = function (id) {
                var indiceElemento = this.elementos.findIndex(
                    function (elemento) {
                        return elemento.id === id;
                    }
                );
                this.elementos.splice(indiceElemento, 1);
            };

        }
        //Definición de la clase Boton
        function Boton(id, nombre, contenido, tipoBoton) {
            this.id = id;
            this.nombre = nombre;
            this.contenido = contenido;
            this.tipoBoton = tipoBoton;
        }
        //Definición de la clase Entrada
        function Entrada(id, nombre, tipoEntrada) {
            this.id = id;
            this.nombre = nombre;
            this.tipoEntrada = tipoEntrada;
        }
        //Definición de la clase Selector
        function Selector(id, nombre, nuevasOpciones) {
            this.id = id;
            this.nombre = nombre;
            this.opciones = nuevasOpciones;
        }
        //Definición de la clase TextArea
        function TextArea(id, nombre, columnas, filas, maxCaracteres) {
            this.id = id;
            this.nombre = nombre;
            this.columnas = columnas;
            this.filas = filas;
            this.maxCaracteres = maxCaracteres;
        }
        //Creación del objeto sistema
        sistema = new Sistema();



        //MANEJADORES DE EVENTOS
        function incluirElemento() {
            var nuevoElemento;
            sistema.generarNuevoElemento();
            sistema.insertarElementos();
            vaciarElementos.call(elementosAVaciar);
            nuevasOpciones = [];
            comprobarNumeroElementos();
            asignarPropiedadAElemento.call(
                botonCrearElemento,
                "style",
                "display: none"
            );
        }

        function comprobarCampos() {
            var elementosAEncender,
                elementosParaApagar;
            vaciarElementos.call(elementosAVaciar);
            switch (seleccionTipoElemento.value) {
                case "button":
                    elementosAEncender = [
                        labelIdElemento,
                        labelNombreElemento,
                        idElemento,
                        nombreElemento,
                        contenidoElemento,
                        labelContenidoElemento,
                        labelTipoBoton,
                        tipoBoton
                    ];
                    elementosParaApagar = [
                        labelTipoEntrada,
                        tipoEntrada,
                        tituloElementosOption,
                        labelValor,
                        valorOpcion,
                        botonNuevaOpcion,
                        labelColumnas,
                        columnas,
                        labelFilas,
                        filas,
                        labelMaxCaracteres,
                        maxCaracteres,
                        avisoId,
                        avisoNombre
                    ];
                    break;
                case "input":
                    elementosAEncender = [
                        labelIdElemento,
                        labelNombreElemento,
                        idElemento,
                        nombreElemento,
                        labelTipoEntrada,
                        tipoEntrada,
                        contenidoElemento,
                        labelContenidoElemento
                    ];
                    elementosParaApagar = [
                        tituloElementosOption,
                        labelValor,
                        valorOpcion,
                        botonNuevaOpcion,
                        labelColumnas,
                        columnas,
                        labelFilas,
                        filas,
                        labelMaxCaracteres,
                        maxCaracteres,
                        labelTipoBoton,
                        tipoBoton,
                        avisoId,
                        avisoNombre
                    ];
                    break;
                case "select":
                    elementosAEncender = [
                        labelIdElemento,
                        labelNombreElemento,
                        idElemento,
                        nombreElemento,
                        tituloElementosOption,
                        contenidoElemento,
                        labelContenidoElemento,
                        labelValor,
                        valorOpcion
                    ];
                    elementosParaApagar = [
                        labelTipoEntrada,
                        tipoEntrada,
                        labelColumnas,
                        columnas,
                        labelFilas,
                        filas,
                        labelMaxCaracteres,
                        maxCaracteres,
                        labelTipoBoton,
                        tipoBoton,
                        avisoId,
                        avisoNombre
                    ];
                    break;
                case "textarea":
                    elementosAEncender = [
                        labelIdElemento,
                        labelNombreElemento,
                        idElemento,
                        nombreElemento,
                        labelColumnas,
                        columnas,
                        labelFilas,
                        filas,
                        labelMaxCaracteres,
                        maxCaracteres
                    ];
                    elementosParaApagar = [
                        tituloElementosOption,
                        contenidoElemento,
                        labelContenidoElemento,
                        labelValor,
                        valorOpcion,
                        botonNuevaOpcion,
                        labelTipoEntrada,
                        tipoEntrada,
                        contenidoElemento,
                        labelContenidoElemento,
                        labelTipoBoton,
                        tipoBoton,
                        avisoId,
                        avisoNombre
                    ];
                    break;
                default:
                    elementosAEncender = [];
                    elementosParaApagar = elementosApagadosAlInicio;
            }
            elementosAEncender.map(function (elemento) {
                asignarPropiedadAElemento.call(
                    elemento,
                    "style",
                    "display: "
                );
            });
            elementosParaApagar.map(function (elemento) {
                asignarPropiedadAElemento.call(
                    elemento,
                    "style",
                    "display: none"
                );
            });
        }

        function crearOpcionNuevoSelector() {
            var nuevaOpcion = {
                contenido: contenidoElemento.value,
                valor: valorOpcion.value
            };
            nuevasOpciones.push(nuevaOpcion);
            contenidoElemento.value = "";
            valorOpcion.value = "";
        }

        function comprobarIdentificadoresRepetidos() {
            var elementoPorId = document.getElementById(idElemento.value),
                elementosPorName = document.getElementsByName(nombreElemento.value);
            asignarPropiedadAElemento.call(
                avisoId,
                "style",
                `display: ${elementoPorId ? "inline;color: red" : "none"}`
            );
            asignarPropiedadAElemento.call(
                avisoNombre,
                "style",
                `display: ${elementosPorName.length > 0 ? "inline;color: red" : "none"}`
            );
        }

        function eliminarElemento (e) {
            sistema.borrarElemento(
                e.currentTarget.previousSibling.value
            );
            sistema.insertarElementos();
            idParaBorrar.value = "";
            comprobarNumeroElementos();
        }

        function encenderBotonBorrar (e) {
            asignarPropiedadAElemento.call(
                botonBorrarElemento,
                "style",
                `display: ${!e.target.value ? "none" : "inherit"}`
            );
        }


        //ASIGNACIÓN DE EVENTOS
        agregarEventosAElementos.call(
            elementosConEventos, {
                change: "change",
                mousedown: "mousedown",
                keyup: "keyup"
            }, {
                crearOpcionNuevoSelector,
                comprobarCampos,
                incluirElemento,
                comprobarIdentificadoresRepetidos,
                eliminarElemento,
                encenderBotonBorrar
            }
        );
        return miApp;
    }()),
    MIAPLICACION = miApp || {};
window.onload = MIAPLICACION.miApp;
