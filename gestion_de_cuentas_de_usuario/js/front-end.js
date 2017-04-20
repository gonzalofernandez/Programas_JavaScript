//var module = require("./back-end.js");
"use strict";
var nomSer, nomSis, nomDir, filasTabla, servidor, nombreCuenta, nombreUsuario,
    fechaIngreso, saldo, tipoCuenta, tipoFiltro, saldoMedio;
function inicializar() {
    filasTabla = document.getElementById("tbody");
    servidor = document.getElementById("servidores");
    nombreCuenta = document.getElementById("nombre_cuenta");
    nombreUsuario = document.getElementById("nombre_usuario");
    fechaIngreso = document.getElementById("fecha");
    saldo = document.getElementById("saldo");
    tipoCuenta = document.getElementById("tipo_cuenta");
    nomSer = document.getElementById("nomser");
    nomSis = document.getElementById("nomsis");
    nomDir = document.getElementById("nomdir");
    tipoFiltro = document.getElementById("tipo_filtro");
    saldoMedio = document.getElementById("saldo_medio");
}
function resetearTabla() {
    filasTabla.innerHTML = "";
}
function pintarCheckBox(celdaReferencia) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    celdaReferencia.appendChild(checkbox);
}
function insertarFila(value) {
    filasTabla.insertAdjacentHTML("beforeend", "<tr><td>" +
                                  value.nombreCuenta + "</td><td>" +
                                  value.nombreUsuario + "</td><td>" +
                                  value.fechaIngreso + "</td><td>" +
                                  value.saldo + "</td><td>" +
                                  value.tipoCuenta + "</td></tr>");
    pintarCheckBox(filasTabla.lastElementChild);
}
function borrarDatosServidor() {
    nomDir.innerHTML = "";
    nomSer.innerHTML = "";
    nomSis.innerHTML = "";
}
function insertarDatosServidor(value) {
    nomSer.insertAdjacentHTML("afterbegin", value[0].nombre);
    nomSis.insertAdjacentHTML("afterbegin", value[0].sistemaOperativo);
    nomDir.insertAdjacentHTML("afterbegin", value[0].direccionIp);
}
function seleccionarServidor() {
    var servidorElegido = elegirServidor(servidor.value);
    borrarDatosServidor(nomDir, nomSer, nomDir);
    insertarDatosServidor(servidorElegido);
    resetearTabla();
    recuperarCuentas(servidorElegido).forEach(insertarFila);
}
function escribirMensajeError(nombreUsuarioErroneo) {
    window.alert("nombreUsuario " + nombreUsuarioErroneo + " esta repetida");
}

function borrarDatosCuentaNueva() {
    nombreCuenta.innerHTML = "";
    nombreUsuario.innerHTML = "";
    saldo.innerHTML = "";
    fechaIngreso.innerHTML = "";
}

function crearCuenta() {
    var idServidor = servidor.value,
        idNombreCuenta = nombreCuenta.value,
        idNombreUsuario = nombreUsuario.value,
        idFechaIngreso = fechaIngreso.value,
        idSaldo = saldo.value,
        idTipoCuenta = tipoCuenta.value,
        cuentaNueva = [idNombreCuenta, idNombreUsuario, idFechaIngreso, idSaldo,
                       idTipoCuenta];
    ingresarCuentas(cuentaNueva, idServidor);
    borrarDatosCuentaNueva();
}

function comprobarChecked(fila) {
    var celdasFila = Array.from(fila.children);
    if (celdasFila[5].checked) {
        eliminarCuenta(servidor.value, celdasFila[0].textContent);
        fila.remove();
    } else {
        celdasFila;
    }
}

function borrarCuentas() {
    var filasCuentas = Array.from(filasTabla.children);
    filasCuentas.forEach(comprobarChecked);
}

function comprobarTipo(fila) {
    var celdasFila = Array.from(fila.children);
    if (this.value !== celdasFila[4].textContent && this.value !== "todas") {
        fila.remove();
    } else {
        fila;
    }
}

function filtrarCuentas() {
    var filasCuentas;
    resetearTabla();
    recuperarCuentas(elegirServidor(servidor.value)).forEach(insertarFila);
    filasCuentas = Array.from(filasTabla.children);
    filasCuentas.forEach(comprobarTipo, tipoFiltro);
}

function obtenerSaldoMedio() {
    var media = calcularSaldoTotalSistema() / contarNumeroCuentasSistema();
    saldoMedio.innerHTML = media;
}
