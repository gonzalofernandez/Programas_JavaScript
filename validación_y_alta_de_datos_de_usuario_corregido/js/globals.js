var ERRORCREDENCIALES = new Error("Credenciales inválidas"),
    MESES = new String("jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec"),
    MILISEGUNDOSPORANYO = 31536000000,
    MODULO = 26,
    PALABRA_COMPARADA = "secret",
    CLAVE = "javascript",
    USUARIOS = "Pepe Pérez,12345678Z,lalajkf,030690,M;Luisa Sánchez," +
        "X1234567L,yemiiwzbdl,160848,F;Alberto López,K9999999J,kadlwu," +
        "230707,M",
    ARGUMENTOS = new String("nif,password,name,gender,date"),
    NAVEGADORES = new String("Chrome,Firefox,Edge"),
    INFOSISTEMA = "Está utilizando el navegador " +
        identificarNavegador(window.navigator.userAgent) +
        " en un sistema operativo " + identificarSO(window.navigator.userAgent);

function localizarDatosUsuario(nif, password, USUARIOS) {
    var registro,
        listaUsuarios = USUARIOS.split(";");
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

/*
ESTA DEBERIA DE HABER SIDO LA FUNCION PERO NO HE
CONSEGUIDO VALIDAR LOS NIF(K,L,M) COMO SE INDICA
EN LA WIKIPEDIA

function validarLetraDeControl(nif) {
    var digitos,
        validacion,
        codigoControl = "T,R,W,A,G,M,Y,F,P,D,X,B,N,J,Z,S,Q,V,H,L,C,K,E".split(","),
        tipoNie = "X,Y,Z".split(","),
        tipoNif = "K,L,M".split(","),
        letrasNie = new RegExp(/X|Y|Z/),
        letrasNif = new RegExp(/K|L|M/),
        posicion = 0,
        letraDeControl = nif.charAt(nif.length - 1),
        sumaPares = 0,
        sumaImpares = 0,
        sumaTotal = 0,
        indice = 0,
        numero = 0,
        numeroTotal,
        digito = "",
        digitoControl = 0;
    if (nif.charAt(0).search(/\d/) > -1) {
        digitos = nif.slice(0, -1);
        if (letraDeControl === codigoControl[digitos % 23]) {
            validacion = true;
        } else {
            validacion = false;
        }
    } else {
        if (nif.charAt(0).search(letrasNie) > -1) {
            digitos = nif.slice(1, -1);
            while (digitos.length < 7) {
                digitos = "0" + digitos;
            }
            while (nif.charAt(0).search(tipoNie[posicion]) === -1) {
                posicion += 1;
            }
            if (letraDeControl === codigoControl[(posicion + digitos) % 23]) {
                validacion = true;
            } else {
                validacion = false;
            }
        } else {
            ///////////////////////////////////////////////////////////////
            if (nif.charAt(0).search(letrasNif) > -1) {
                digitos = nif.slice(1, -1);
                while (nif.charAt(0).search(tipoNif[posicion]) === -1) {
                    posicion += 1;
                }
                digitos = posicion.toString() + digitos;
                while (digitos[indice]) {
                    digito = +digitos[indice];
                    if ((indice + 1) % 2 === 0) {
                        sumaPares = sumaPares + digito;
                    } else {
                        numero = digito * 2;
                        if (numero > 9) {
                            numeroTotal = (+numero.toString()[0]) + (+numero.toString()[1]);
                        } else {
                            numeroTotal = numero;
                        }
                        sumaImpares = sumaImpares + numeroTotal;
                    }
                    indice++;
                }
                sumaTotal = sumaImpares + sumaPares;
                if ((+sumaTotal.toString()[1]) === 0) {
                    digitoControl = 0;
                } else {
                    digitoControl = 10 - (+sumaTotal.toString()[1]);
                }
            }
            ///////////////////////////////////////////////////////////////
        }
    }
    return validacion;
}*/

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
                +anyo === fechaNacimiento.getFullYear()) ? true : false;
    }
    return validacion;
}

function validarPassword(password) {
    var validacionPassword = new RegExp(/^[A-Z]{6,10}$/);
    return validacionPassword.test(password);
}

function validarName(name) {
    var nombreYApellido = name.split(" ");
    return (nombreYApellido.length > 2 || nombreYApellido[0].length +
            nombreYApellido[1].length > 25) ? false: true;
}

function validarGender(gender) {
    var validacionGender = new RegExp(/^M|F$/);
    return validacionGender.test(gender);
}

function validarNif(nif) {
    var validacion,
        validacionNif = new RegExp(/^\d{1,8}[A-Z]|([K-M]|[X-Z])\d{1,7}[A-Z]$/);
    if (!validacionNif.test(nif)) {
        validacion = false;
    } else {
        validacion = validarLetraDeControl(nif);
    }
    return validacion;
}

function validarDate(date) {
    var validacionDate = new RegExp(/^\d{2}[a-z]{3}\d{2}$/),
        validacion,
        diaNacimiento,
        mesNacimiento,
        anyoNacimiento;
    if (!validacionDate.test(date)) {
        validacion = false;
    } else {
        diaNacimiento = date.substr(0, 2);
        mesNacimiento = date.substr(2, 3);
        anyoNacimiento = date.substr(5, 2);
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
    return (genero === "F") ? "Sra." : "Sr.";
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
        anyoNacimiento = `${(anyoNacimiento > 30) ? "19" : "20"}${anyoNacimiento}`;
        fechaNacimiento = new Date(anyoNacimiento, mesNacimiento, diaNacimiento);
        edad = Math.floor((fechaActual - fechaNacimiento) / MILISEGUNDOSPORANYO);
    }
    return edad;
}

function calcularEdadUsuario(date, fecha) {
    var diaNacimiento = date.substring(0, 2),
        mesNacimiento = date.substring(2, 5),
        anyoNacimiento = date.substring(5, 7),
        fechaNacimiento;
    anyoNacimiento = `${(anyoNacimiento > 30) ? "19" : "20"}${anyoNacimiento}`;
    fechaNacimiento = new Date(anyoNacimiento, MESES.split(",").indexOf(mesNacimiento), diaNacimiento);
    return Math.floor((fecha - fechaNacimiento) / MILISEGUNDOSPORANYO);
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
