"use strict";
//TO_DO
//Introducir el objeto error y en globals y validate... y modificar archivo de tests para sepa que el programa lanza un objeto error
var ERROR_CREDENCIALES = "Error: Credenciales inválidas",
    MESES = String("jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec"),
    TRATAMIENTO_FEMENINO = "Sra.",
    TRATAMIENTO_MASCULINO = "Sr.",
    VALIDACION_PASSWORD = new RegExp(/^[A-Z]{6,10}$/),
    VALIDACION_GENDER = new RegExp(/^M|F$/),
    VALIDACION_NIF = new RegExp(/^\d{1,8}[A-Z]|([K-M]|[X-Z])\d{1,7}[A-Z]$/),
    VALIDACION_DATE = new RegExp(/^\d{2}[a-z]{3}\d{2}$/),
    MILISEGUNDOS_POR_ANYO = 31536000000,
    CLAVE = "javascript",
    USUARIOS = String("Pepe Pérez,12345678Z,lalajkf,030690,M;Luisa Sánchez," +
        "X1234567L,yemiiwzbdl,160848,F;Alberto López,K9999999J,kadlwu," +
        "230707,M"),
    NAVEGADORES = String("Chrome,Firefox,Edge,Opera,Otro"),
    SISTEMAS_OPERATIVOS = String("Windows,Linux,Otro"),
    ARGUMENTOS = String("nif,password,name,gender,date");


//FUNCIONES DE AYUDA PARA LAS FUNCIONES DE VALIDACIÓN
function formatearFecha(fecha) {
    var numeroMes = MESES.split(",").indexOf(fecha.substring(2, 5)).toString();
    numeroMes = numeroMes.length === 1
        ? "0" + numeroMes
        : numeroMes;
    return fecha.substring(0, 2) + numeroMes + fecha.substring(5, 7);
}

function validarComponentesFecha(dia, mes, anyo) {
    var fechaNacimiento,
        validacion;
    if (MESES.split(",").indexOf(mes) === -1) {
        validacion = false;
    } else {
        anyo = `${(anyo > 30) ? "19" : "20"}${anyo}`;
        fechaNacimiento = new Date(anyo, MESES.split(",").indexOf(mes), dia);
        validacion = (+dia === fechaNacimiento.getDate() &&
                +MESES.split(",").indexOf(mes) === fechaNacimiento.getMonth() &&
                +anyo === fechaNacimiento.getFullYear()) ?
            true : false;
    }
    return validacion;
}

function validarLetraDeControl(nif) {
    var letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE",
        documento = nif.replace(/^[X]/, "0")
            .replace(/^[K]/, "0")
            .replace(/^[L]/, "0")
            .replace(/^[M]/, "0")
            .replace(/^[Y]/, "1")
            .replace(/^[Z]/, "2"),
        letra = nif.substr(-1),
        indice = parseInt(documento.substr(0, 8), 10) % 23;
    return (letrasValidas.charAt(indice) === letra) ? true : false;
}


//FUNCIONES DE VALIDACION DE ARGUMENTOS
function validarNif(nif) {
    return (!VALIDACION_NIF.test(nif)) ? false : validarLetraDeControl(nif);
}

function validarDate(date) {
    return (!VALIDACION_DATE.test(date)) ? false :
            validarComponentesFecha(date.substr(0, 2),
                                    date.substr(2, 3),
                                    date.substr(5, 2));
}

function validarPassword(password) {
    return VALIDACION_PASSWORD.test(password);
}

function validarName(name) {
    var nombreYApellido = name.split(" ");
    return (nombreYApellido.length > 2 ||
            nombreYApellido[0].length + nombreYApellido[1].length > 25) ?
            false : true;
}

function validarGender(gender) {
    return VALIDACION_GENDER.test(gender);
}


//FUNCIONES PARA OBTENER INFORMACION DEL SISTEMA
function identificarNavegador(useragent) {
    var navegador,
        listaNavegadores = NAVEGADORES.split(",");
    if (useragent.indexOf("Edge") > -1) {
        navegador = "Edge";
    } else if (useragent.indexOf("OPR") > -1) {
        navegador = "Opera";
    } else {
        navegador = listaNavegadores.find(function (registro) {
            return useragent.indexOf(registro) > -1 || "Otro";
        });
    }
    return navegador;
}

function identificarSO(useragent) {
    var sisOps = SISTEMAS_OPERATIVOS.split(",");
    return sisOps.find(function (so) {
        return useragent.indexOf(so) > -1;
    });
}


//FUNCIONES DE AYUDA PARA validateUserData()
function localizarDatosUsuario(nif, password, USUARIOS) {
    var clave,
        listaUsuarios = USUARIOS.split(";");
    clave = vigenere("*" + password + "*", CLAVE).replace(/#/g, "");
    return listaUsuarios.filter(function (registro) {
        return registro.indexOf(nif) > -1 && registro.indexOf(clave) > -1;
    });
}

function quitarElementosVacios(array) {
    var posicion = 0;
    while (posicion < array.length) {
        if (!array[posicion]) {
            array.shift();
        } else {
            posicion += 1;
        }
    }
    return array;
}

function obtenerValorDeParametro(cadena) {
    return cadena.substring(cadena.indexOf("=") + 1);
}


//FUNCIONES PARA DETERMINAR EL MENSAJE DE SALIDA
function determinarSaludo(fecha) {
    var saludo,
        horasActuales = fecha.getHours();
    if (horasActuales >= 0 && horasActuales <= 12) {
        saludo = "días";
    } else if (horasActuales >= 13 && horasActuales <= 19) {
        saludo = "tardes";
    } else {
        saludo = "noches";
    }
    return saludo;
}

function determinarTratamiento(genero) {
    return (genero === "F") ? TRATAMIENTO_FEMENINO : TRATAMIENTO_MASCULINO;
}

function determinarApellido(persona) {
    return persona.split(" ")[1];
}

function determinarEdad(fechaNacimiento, fechaActual) {
    var fechaFormateada,
        diaNacimiento,
        mesNacimiento,
        anyoNacimiento,
        edad;
    fechaFormateada = fechaNacimiento.length === 7 ?
            formatearFecha(fechaNacimiento) : fechaNacimiento;
    diaNacimiento = fechaFormateada.substring(0, 2);
    mesNacimiento = fechaFormateada.substring(2, 4);
    anyoNacimiento = fechaFormateada.substring(4, 6);
    anyoNacimiento = `${(anyoNacimiento > 30) ? "19" : "20"}${anyoNacimiento}`;
    fechaNacimiento = new Date(anyoNacimiento, mesNacimiento, diaNacimiento);
    edad = Math.floor((fechaActual - fechaNacimiento) / MILISEGUNDOS_POR_ANYO);
    return edad;
}
