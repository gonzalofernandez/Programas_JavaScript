"use strict";
//Constructor del objeto Servidor
function Servidor(nombre, direccionIp, sistemaOperativo) {
    this.nombre = nombre;
    this.direccionIp = direccionIp;
    this.sistemaOperativo = sistemaOperativo;
    this.cuentas = [];
}
//Constructor del objeto Cuenta
function Cuenta(nombreCuenta, nombreUsuario, fechaIngreso, saldo, tipoCuenta) {
    this.nombreCuenta = nombreCuenta;
    this.nombreUsuario = nombreUsuario;
    this.fechaIngreso = fechaIngreso;
    this.saldo = saldo;
    this.tipoCuenta = tipoCuenta;
}
//Creacion de los cuatro objetos Servidor y del array que los contiene
var servidorAmnexis = new Servidor("Amnexis", "192.168.0.10", "Linux"),
    servidorAsterix = new Servidor("Asterix", "192.168.0.20", "WindowsServer2012"),
    servidorAsuracenturix = new Servidor("Asuracenturix", "192.168.0.30", "Linux"),
    servidorObelix = new Servidor("Obelix", "192.168.0.40", "WindowsServer2012"),
    servidorPanoramix = new Servidor("Panoramix", "192.168.0.50", "Linux"),
    servidores = [servidorAmnexis, servidorAsterix, servidorAsuracenturix,
                  servidorObelix, servidorPanoramix];
//Metodos para seleccionar el servidor activo
function filtrarServidor(value) {
    return this === value.nombre;
}
function elegirServidor(seleccion) {
    var servidor = servidores.filter(filtrarServidor, seleccion);
    return servidor;
}
//Metodo para comprobar si nombreUsuario esta repetido
function comprobarDatos(nombreUsuario) {
    return servidores.some(function (servidor) {
        return servidor.cuentas.some(function (cuenta) {
            return this === cuenta.nombreUsuario;
        }, nombreUsuario);
    });
}
//Metodo para añadir cuentas por parte de un servidor
function ingresarCuentas(nuevaCuenta, idServidor) {
    var cuenta;
    if (!comprobarNombreCuenta(nuevaCuenta[0]) || !comprobarNombreUsuario(nuevaCuenta[1]) ||
            isNaN(nuevaCuenta[3]) || comprobarDatos(nuevaCuenta[1])) {
        escribirMensajeError(nuevaCuenta[1]);
    } else {
        cuenta = new Cuenta(nuevaCuenta[0], nuevaCuenta[1], nuevaCuenta[2],
                            nuevaCuenta[3], nuevaCuenta[4]);
        elegirServidor(idServidor)[0].cuentas.push(cuenta);
        insertarFila(cuenta);
    }
}
//Metodo que muestra las cuentas de un servidor
function recuperarCuentas(servidor) {
    return servidor[0].cuentas;
}

function encontrarCuenta(element, index, cuentas) {
    if (this === element.nombreCuenta) {
        cuentas.splice(index, 1);
    }
}
//Metodo para eliminar las cuentas de un servidor
function eliminarCuenta(idServidor, nombreCuenta) {
    var cuentas = recuperarCuentas(elegirServidor(idServidor));
    cuentas.find(encontrarCuenta, nombreCuenta);
}
//Metodo para calcular el saldo medio de todas las cuentas del sistema
function calcularSaldoTotalSistema() {
    return servidores.reduce(function (valorAnterior, servidor) {
        return servidor.cuentas.reduce(function (valorAnterior, cuenta) {
            return valorAnterior + +cuenta.saldo;
        }, valorAnterior);
    }, 0);
}

function contarNumeroCuentasSistema() {
    var numeroCuentas = 0;
    servidores.forEach(function (servidor) {
        numeroCuentas = numeroCuentas + servidor.cuentas.length;
        return numeroCuentas;
    });
    return numeroCuentas;
}
//Metodos del objeto Servidor
Servidor.prototype.ingresarCuentas = ingresarCuentas;
Servidor.prototype.recuperarCuentas = recuperarCuentas;
Servidor.prototype.eliminarCuentas = eliminarCuenta;
//Validar nombre
function comprobarNombreCuenta(nomCuenta) {
    var validacionNombre = new RegExp(/[a-z]*\.*-*_*/);
    var validacion;
    var nombreYApellido = nomCuenta.split(" ");
    if (nombreYApellido.length > 2 || validacionNombre.test(nomCuenta)) {
        validacion = false;
    } else {
        validacion = true;
    }
    return validacion;
}
//Validar nombre usuario
function comprobarNombreUsuario(nomUsu) {
    var validacion;
    var nombreYApellido = nomUsu.split(" ");
    if (nombreYApellido.length > 2 || nombreYApellido[0].length + nombreYApellido[1].length > 25) {
        validacion = false;
    } else {
        validacion = true;
    }
    return validacion;
}
//Validar fecha
function validarDate(fecha) {
    var validacionDate = new RegExp(/^\d{2}\/\d{2}\/\d{2}$/);
    var validacion;
    var diaNacimiento;
    var mesNacimiento;
    var anyoNacimiento;
    if (!validacionDate.test(fecha)) {
        validacion = false;
    } else {
        diaNacimiento = fecha.substr(0, 2);
        mesNacimiento = fecha.substr(3, 2);
        anyoNacimiento = fecha.substr(6, 2);
        validacion = validarComponentesFecha(diaNacimiento, mesNacimiento, anyoNacimiento);
    }
    return validacion;
}
