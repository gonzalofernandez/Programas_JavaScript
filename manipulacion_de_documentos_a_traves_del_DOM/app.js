"use strict";
var miApp = function () {
    var crearEstructuraHTML = (function () {
        var TITULO_PAGINA = "DOM",
            scriptOriginal = document.getElementsByTagName("script")[0],
            elementoTitle = document.createElement("title"),
            elementoMeta = document.createElement("meta");
        scriptOriginal.setAttribute("id", "script_original");
        scriptOriginal.setAttribute("type", "text/javascript");
        scriptOriginal.parentElement.parentElement.setAttribute("lang", "es");
        elementoMeta.setAttribute("charset", "UTF-8");
        scriptOriginal.parentElement.insertBefore(elementoTitle, scriptOriginal);
        //document.implementation.createDocumentType("html", "id", "id");
        //creamos el formulario
        //formu.action = _get["action"];
        //formu.method = _get["method"];
        //control = document.createElement.input;// creamos un control
        //control.setAttribute("type", control["type"];
        //control.setAttribute("name", control["name"];
        //formu.appendChild(control); // lo añadimos al form
        //document.body.appendChild(formu);//añadimos el formulario...
    }());
};
window.onload = miApp;
