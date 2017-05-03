"use strict";
var ERROR_CREDENCIALES = new Error("Credenciales inválidas"),
    MESES = String("jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec"),
    VALIDACION_DATE = new RegExp(/^\d{2}[a-z]{3}\d{2}|\d{6,7}$/),
    VALIDACION_PASSWORD = new RegExp(/^[A-Z]{6,10}$/),
    VALIDACION_GENDER = new RegExp(/^M|F$/),
    VALIDACION_NIF = new RegExp(/^\d{1,8}[A-Z]|([K-M]|[X-Z])\d{1,7}[A-Z]$/),
    MILISEGUNDOS_POR_ANYO = 31536000000,
    MODULO = 26,
    TRATAMIENTO_FEMENINO = "Sra.",
    TRATAMIENTO_MASCULINO = "Sr.",
    PALABRA_COMPARADA = new String("secret"),
    CLAVE = new String("javascript"),
    USUARIOS = new String("Pepe Pérez,12345678Z,lalajkf,030690,M;Luisa Sánchez," +
        "X1234567L,yemiiwzbdl,160848,F;Alberto López,K9999999J,kadlwu," +
        "230707,M"),
    ARGUMENTOS = new String("nif,password,name,gender,date"),
    NAVEGADORES = new String("Chrome,Firefox,Edge");

function localizarDatosUsuario(nif, password, USUARIOS) {
    var listaUsuarios = USUARIOS.split(";");
    /*{
         && vigenere("*" + password + "*", CLAVE).replace(/#/g, "") === USUARIOS[posicion].substr(USUARIOS[posicion].indexOf("password:") + 9, vigenere("*" + password + "*", CLAVE).replace(/#/g, "").length)) {
        coincidencia = true;
    } else {
        coincidencia = false;
    }*/
    return listaUsuarios.filter(function (registro) {
        return registro.indexOf(nif) > -1;
    });
}

function identificarNavegador(useragent) {
    var navegadorDelUsuario = "",
        posicion = 0,
        encontrado = false,
        listaNavegadores = NAVEGADORES.split(",");
    while (listaNavegadores[posicion] && encontrado === false) {
        if (useragent.indexOf(listaNavegadores[posicion]) > -1) {
            navegadorDelUsuario = listaNavegadores[posicion];
            if (navegadorDelUsuario === "Chrome" && useragent.indexOf("OPR") > -1) {
                navegadorDelUsuario = "Opera";
                encontrado = true;
            } else {
                encontrado = false;
            }
            encontrado = true;
        } else {
            navegadorDelUsuario = "Otro";
            encontrado = true;
        }
        posicion += 1;
    }
    return navegadorDelUsuario;
}

function identificarSO(useragent) {
    var soDelUsuario;
    if (useragent.indexOf("Windows") > -1) {
        soDelUsuario = "Windows";
    } else {
        if (useragent.indexOf("Linux") > -1) {
            soDelUsuario = "Linux";
        } else {
            soDelUsuario = "Otro";
        }
    }
    return soDelUsuario;
}

function obtenerValorDeParametro(cadena) {
    return cadena.substring(cadena.indexOf("=") + 1);
}

function validarLetraDeControl(nif) {
    var letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE",
        caracteresNie = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/i,
        caracteresNifNie = /^[XYZKLM]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/i,
        documento = nif.replace(/^[X]/, "0")
            .replace(/^[K]/, "0")
            .replace(/^[L]/, "0")
            .replace(/^[M]/, "0")
            .replace(/^[Y]/, "1")
            .replace(/^[Z]/, "2"),
        letra = nif.substr(-1),
        indice = parseInt(documento.substr(0, 8)) % 23;
    return (letrasValidas.charAt(indice) === letra) ? true : false;
}

function crearFechaNacimiento(anyo, mes, dia) {
    return new Date(anyo, mes, dia);
}

function completarAnyo(anyo) {
    return (anyo > 30 ? "19" : "20") + anyo;
}

function validarComponentesFecha(dia, mes, anyo) {
    var fechaNacimiento, validacion, numDia, numMes, datosCorrectos;
    if ((anyo.length !== 4 && mes.length !== 3) || anyo.length === 4) {
        if (anyo.length === 4) {
            numDia = dia;
            numMes = mes;
        } else {
            numDia = mes;
            numMes = dia;
            anyo = completarAnyo(anyo);
        }
        datosCorrectos = ((numMes <= 12 && numMes >= 1) && (numDia <= 31 && numDia >= 1)) ? true : false;
        fechaNacimiento = crearFechaNacimiento(anyo, numMes, numDia);
    } else {
        datosCorrectos = (MESES.split(",").indexOf(mes) === -1) ? false : true;
        anyo = completarAnyo(anyo);
        mes = MESES.split(",").indexOf(mes, 0);
        fechaNacimiento = crearFechaNacimiento(anyo, mes, dia);
            /*anyo = `${(anyo > 30)
                ? "19"
                : "20"}${anyo}`;*/
            /*fechaNacimiento = new Date(anyo, MESES.split(",").indexOf(mes), dia);
            validacion = (+dia === fechaNacimiento.getDate() &&
                    +MESES.split(",").indexOf(mes) === fechaNacimiento.getMonth() &&
                    +anyo === fechaNacimiento.getFullYear()) ? true : false;*/
    }
    if (datosCorrectos) {
        validacion = (+dia === fechaNacimiento.getDate() &&
                    +mes === fechaNacimiento.getMonth() &&
                    +anyo === fechaNacimiento.getFullYear()) ? true : false;
    } else {
        validacion = false;
    }
    return validacion;
}

function validarPassword(password) {
    return VALIDACION_PASSWORD.test(password);
}

function validarName(name) {
    var nombreYApellido = name.split(" ");
    return (nombreYApellido.length > 2 || nombreYApellido[0].length +
            nombreYApellido[1].length > 25) ? false : true;
}

function validarGender(gender) {
    return VALIDACION_GENDER.test(gender);
}

function validarNif(nif) {
    var validacion;
    if (!VALIDACION_NIF.test(nif)) {
        validacion = false;
    } else {
        validacion = validarLetraDeControl(nif);
    }
    return validacion;
}

function validarDate(date) {
    var validacion,
        diaNacimiento,
        mesNacimiento,
        anyoNacimiento;
    if (!VALIDACION_DATE.test(date)) {
        validacion = false;
    } else {
        if (date.length === 7) {
            diaNacimiento = date.substr(0, 2);
            mesNacimiento = date.substr(2, 3);
            anyoNacimiento = date.substr(5, 2);
        } else if (date.length === 8) {
            diaNacimiento = date.substr(0, 2);
            mesNacimiento = date.substr(2, 2);
            anyoNacimiento = date.substr(4, 4);
        } else {
            mesNacimiento = date.substr(0, 2);
            diaNacimiento = date.substr(2, 2);
            anyoNacimiento = date.substr(4, 2);
        }
        validacion = validarComponentesFecha(diaNacimiento, mesNacimiento, anyoNacimiento);
    }
    return validacion;
}

function reconocerParametro(argumento) {
    var funcion;
    switch (argumento) {
    case "nif":
        funcion = validarNif;
        break;
    case "password":
        funcion = validarPassword;
        break;
    case "name":
        funcion = validarName;
        break;
    case "gender":
        funcion = validarGender;
        break;
    case "date":
        funcion = validarDate;
        break;
    }
    return funcion;
}

/*var reconoceParametro = {
    "nif" : validarNif,

};*/

function determinarSaludo(fecha) {
    var saludo,
        horasActuales = fecha.getHours();
    if (horasActuales >= 0 && horasActuales <= 12) {
        saludo = "Buenos días";
    } else if (horasActuales >= 13 && horasActuales <= 19) {
        saludo = "Buenas tardes";
    } else {
        saludo = "Buenas noches";
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
    var diaNacimiento,
        mesNacimiento,
        anyoNacimiento,
        edad;
    if (!fechaNacimiento) {
        edad = false;
    } else {
        diaNacimiento = fechaNacimiento.substring(0, 2);
        mesNacimiento = fechaNacimiento.substring(2, 4);
        anyoNacimiento = fechaNacimiento.substring(4, 6);
        /*anyoNacimiento = `${(anyoNacimiento > 30) ? "19" : "20"}${anyoNacimiento}`;
        anyoNacimiento = `${completaAño(anyoNacimiento)}$`*/
        anyoNacimiento = (anyoNacimiento > 30 ? "19" : "20") + anyoNacimiento;
        fechaNacimiento = new Date(anyoNacimiento, mesNacimiento, diaNacimiento);
        edad = Math.floor((fechaActual - fechaNacimiento) / MILISEGUNDOS_POR_ANYO);
    }
    return edad;
}

function calcularEdadUsuario(date, fecha) {
    var diaNacimiento = date.substring(0, 2),
        mesNacimiento = date.substring(2, 4),
        anyoNacimiento = date.substring(4, 8),
        fechaNacimiento = new Date(anyoNacimiento, mesNacimiento, diaNacimiento);
    //anyoNacimiento = `${(anyoNacimiento > 30) ? "19" : "20"}${anyoNacimiento}`;
    //anyoNacimiento = (anyoNacimiento > 30 ? "19" : "20") + anyoNacimiento;
    //fechaNacimiento = new Date(anyoNacimiento, MESES.split(",").indexOf(mesNacimiento), diaNacimiento);
    return Math.floor((fecha - fechaNacimiento) / MILISEGUNDOS_POR_ANYO);
}

function quitarElementosVacios(array) {
    var posicion = 0;
    while (posicion < array.length) {
        if (array[posicion] === "") {
            array.shift();
        } else {
            posicion += 1;
        }
    }
    return array;
}
