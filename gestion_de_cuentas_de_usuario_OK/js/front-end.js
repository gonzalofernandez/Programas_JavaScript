//var module = require("./back-end.js");
"use strict";
var miApp = miApp || {},
    MENSAJE_ERROR = "Los datos introducidos son incorrectos, por favor " +
        "revíselos.",
    nomSer,
    nomSis,
    nomDir,
    filasTabla,
    filaDatosCuenta,
    servidor,
    nombreCuenta,
    nombreUsuario,
    fechaIngreso,
    saldo,
    tipoCuenta,
    tipoFiltro,
    saldoMedio,
    inicioTabla = "<tr><td>",
    orejeras = "</td><td>",
    finalTabla = "</td></tr>",
    COLUMNA_CHECK = 5,
    COLUMNA_NOMBRE_CUENTA = 0;
function seleccionarElementoHTML(elemento) {
    return document.getElementById(elemento);
}
function inicializar() {
    filasTabla = seleccionarElementoHTML("tbody_cuentas");
    filaDatosCuenta = seleccionarElementoHTML("tbody_nueva");
    servidor = seleccionarElementoHTML("servidores");
    nombreCuenta = seleccionarElementoHTML("nombre_cuenta");
    nombreUsuario = seleccionarElementoHTML("nombre_usuario");
    fechaIngreso = seleccionarElementoHTML("fecha");
    saldo = seleccionarElementoHTML("saldo");
    tipoCuenta = seleccionarElementoHTML("tipo_cuenta");
    nomSer = seleccionarElementoHTML("nomser");
    nomSis = seleccionarElementoHTML("nomsis");
    nomDir = seleccionarElementoHTML("nomdir");
    tipoFiltro = seleccionarElementoHTML("tipo_filtro");
    saldoMedio = seleccionarElementoHTML("saldo_medio");
}


//FUNCIONES DE APOYO
//Borrar cuentas
function resetearTabla() {
    filasTabla.innerHTML = "";
}
//Dibujar checkbox
function pintarCheckBox(celdaReferencia) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    celdaReferencia.appendChild(checkbox);
}
//Insertar fila
function insertarFila(cuenta) {
    filasTabla.insertAdjacentHTML("beforeend", inicioTabla +
                                  cuenta.nombreCuenta + orejeras +
                                  cuenta.nombreUsuario + orejeras +
                                  cuenta.fechaIngreso + orejeras +
                                  cuenta.saldo + orejeras +
                                  cuenta.tipoCuenta + finalTabla);
    pintarCheckBox(filasTabla.lastElementChild);
}
//Borrar datos del servidor
function borrarDatosServidor() {
    nomDir.innerHTML = "";
    nomSer.innerHTML = "";
    nomSis.innerHTML = "";
}
//Insertar datos del servidor
function insertarDatosServidor(servidor) {
    nomSer.insertAdjacentHTML("afterbegin", servidor.nombre);
    nomSis.insertAdjacentHTML("afterbegin", servidor.sistemaOperativo);
    nomDir.insertAdjacentHTML("afterbegin", servidor.direccionIp);
}
//Borrar datos de una cuenta creada
function borrarDatosCuentaNueva() {
    nombreCuenta.innerHTML = "";
    nombreUsuario.innerHTML = "";
    saldo.innerHTML = "";
    fechaIngreso.innerHTML = "";
}


//BOTONES
function seleccionarServidor() {
    var servidorElegido = miApp.elegirServidor(servidor.value);
    borrarDatosServidor(nomDir, nomSer, nomDir);
    insertarDatosServidor(servidorElegido);
    resetearTabla();
    miApp.recuperarCuentas(servidorElegido).forEach(insertarFila);
}

function crearCuenta() {
    var servidorElegido = miApp.elegirServidor(servidor.value),
        idNombreCuenta = nombreCuenta.value,
        idNombreUsuario = nombreUsuario.value,
        idFechaIngreso = fechaIngreso.value,
        idSaldo = saldo.value,
        idTipoCuenta = tipoCuenta.value,
        cuentaNueva = {nombre_de_cuenta: idNombreCuenta,
                       nombre_de_usuario: idNombreUsuario,
                       fecha_ingreso: idFechaIngreso,
                       saldo_cuenta: idSaldo,
                       tipo_de_cuenta: idTipoCuenta};
    if (filaDatosCuenta.children.length > 1) {
        filaDatosCuenta.lastElementChild.remove();
    }
    if (miApp.ingresarCuentas(cuentaNueva, servidorElegido)) {
        resetearTabla();
        miApp.recuperarCuentas(servidorElegido).forEach(insertarFila);
        borrarDatosCuentaNueva();
    } else {
        filaDatosCuenta.insertAdjacentHTML("beforeend", "<tr><td colspan=6><h2>" + MENSAJE_ERROR +
                                      "</h2></td></tr>");
    }
}

function borrarCuentas() {
    var servidorElegido = miApp.elegirServidor(servidor.value),
        filasCuentas = Array.from(filasTabla.children);
    filasCuentas.forEach(function (fila) {
        var celdasFila = Array.from(fila.children);
        if (celdasFila[COLUMNA_CHECK].checked) {
            miApp.eliminarCuentas(servidorElegido, celdasFila[COLUMNA_NOMBRE_CUENTA].textContent);
            fila.remove();
        }
    });
}

function filtrarCuentas() {
    var servidorElegido = miApp.elegirServidor(servidor.value);
    resetearTabla();
    miApp.seleccionarCuentas(servidorElegido, tipoFiltro.value).forEach(insertarFila);
}

function obtenerSaldoMedio() {
    saldoMedio.innerHTML = miApp.obtenerSaldoMedio();
}
