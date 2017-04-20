function localizarDatosUsuario(nif, password, usuarios) {
    var posicion = 0;
    var coincidencia = false;
    while (usuarios[posicion] && !coincidencia) {
        if (usuarios[posicion].indexOf("nif:".concat(nif)) > -1 && vigenere("*" + password + "*", "javascript").replace(/#/g, "") === usuarios[posicion].substr(usuarios[posicion].indexOf("password:") + 9, vigenere("*" + password + "*", "javascript").replace(/#/g, "").length)) {
            coincidencia = true;
        } else {
            posicion++;
        }
    }
    return coincidencia;
}
function identificarNavegador(useragent) {
    var navegadorDelUsuario;
    var listaNavegadores;
    var posicion = 0;
    var encontrado = false;
    var navegadores = new String("Chrome,Firefox,Edge");
    listaNavegadores = navegadores.split(",");
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
        posicion++;
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
    var digitos;
    var validacion;
    var codigoControl = "T,R,W,A,G,M,Y,F,P,D,X,B,N,J,Z,S,Q,V,H,L,C,K,E".split(",");
    var tipoNie = "X,Y,Z".split(",");
    var tipoNif = "K,L,M".split(",");
    var letrasNie = new RegExp(/X|Y|Z/);
    var letrasNif = new RegExp(/K|L|M/);
    var posicion = 0;
    var letraDeControl = nif.charAt(nif.length - 1);
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
                posicion++;
            }
            if (letraDeControl === codigoControl[posicion + digitos % 23]) {
                validacion = true;
            } else {
                validacion = false;
            }
        } else {
            if (nif.charAt(0).search(letrasNif) > -1) {
                digitos = nif.slice(1, -1);
                while (nif.charAt(0).search(tipoNif[posicion]) === -1) {
                    posicion++;
                }
                if (letraDeControl === codigoControl[posicion + digitos % 23]) {
                    validacion = true;
                } else {
                    validacion = false;
                }
            }
        }
    }
    return validacion;
}
function validarComponentesFecha(dia, mes, anyo) {
    var fechaNacimiento;
    var validacion;
    if (MESES.split(",").indexOf(mes) === -1) {
        validacion = false;
    } else {
        if (anyo > 30) {
            anyo = "19" + anyo;
        } else {
            anyo = "20" + anyo;
        }
        fechaNacimiento = new Date(anyo, MESES.split(",").indexOf(mes), dia);
        if (+dia === fechaNacimiento.getDate() && +MESES.split(",").indexOf(mes) === fechaNacimiento.getMonth() && +anyo === fechaNacimiento.getFullYear()) {
            validacion = true;
        } else {
            validacion = false;
        }
    }
    return validacion;
}
function validarPassword(password) {
    var validacionPassword = new RegExp(/^[A-Z]{6,10}$/);
    return validacionPassword.test(password);
}
function validarName(name) {
    var validacion;
    var nombreYApellido = name.split(" ");
    if (nombreYApellido.length > 2 || nombreYApellido[0].length + nombreYApellido[1].length > 25) {
        validacion = false;
    } else {
        validacion = true;
    }
    return validacion;
}
function validarGender(gender) {
    var validacionGender = new RegExp(/^M|F$/);
    return validacionGender.test(gender);
}
function validarNif(nif) {
    var validacion;
    var validacionNif = new RegExp(/^\d{1,8}[A-Z]|([K-M]|[X-Z])\d{1,7}[A-Z]$/);
    if (!validacionNif.test(nif)) {
        validacion = false;
    } else {
        validacion = validarLetraDeControl(nif);
    }
    return validacion;
}
function validarDate(date) {
    var validacionDate = new RegExp(/^\d{2}[a-z]{3}\d{2}$/);
    var validacion;
    var diaNacimiento;
    var mesNacimiento;
    var anyoNacimiento;
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
    var saludo;
    var horasActuales = fecha.getHours();
    if (horasActuales >= 0 && horasActuales <= 12) {
        saludo = "días";
    } else if (horasActuales >= 13 && horasActuales <= 19) {
        saludo = "tardes";
    } else {
        saludo = "noches";
    }
    return saludo;
}
function determinarTratamiento(nif, usuarios) {
    var tratamiento;
    var genero;
    var posicion = 0;
    var coincidencia = false;
    while (usuarios[posicion] && !coincidencia) {
        if (usuarios[posicion].indexOf("nif:".concat(nif)) > -1) {
            genero = usuarios[posicion].substr(usuarios[posicion].indexOf("gender:") + 7);
            coincidencia = true;
        } else {
            posicion++;
        }
    }
    if (genero === "F") {
        tratamiento = "Sra.";
    } else {
        tratamiento = "Sr.";
    }
    return tratamiento;
}
function determinarApellido(nif, usuarios) {
    var posicion = 0;
    var apellido;
    var coincidencia = false;
    while (usuarios[posicion] && !coincidencia) {
        if (usuarios[posicion].indexOf("nif:".concat(nif)) > -1) {
            apellido = usuarios[posicion].substring(usuarios[posicion].indexOf("name:"), usuarios[posicion].indexOf(","));
            coincidencia = true;
        } else {
            posicion++;
        }
    }
    if (!apellido) {
        apellido = false;
    } else {
        apellido = apellido.split(" ")[1];
    }
    return apellido;
}
function determinarEdad(nif, fecha, usuarios) {
    var posicion = 0;
    var diaNacimiento;
    var mesNacimiento;
    var anyoNacimiento;
    var fechaNacimiento;
    var coincidencia = false;
    var edad;
    while (usuarios[posicion] && !coincidencia) {
        if (usuarios[posicion].indexOf("nif:".concat(nif)) > -1) {
            fechaNacimiento = usuarios[posicion].substr(usuarios[posicion].indexOf("date:") + 5).split(",")[0];
            coincidencia = true;
        } else {
            posicion++;
        }
    }
    if (!fechaNacimiento) {
        edad = false;
    } else {
        diaNacimiento = fechaNacimiento.substring(0, 2);
        mesNacimiento = fechaNacimiento.substring(2, 4);
        anyoNacimiento = fechaNacimiento.substring(4, 6);
        if (anyoNacimiento > 30) {
            anyoNacimiento = "19" + anyoNacimiento;
        } else {
            anyoNacimiento = "20" + anyoNacimiento;
        }
        fechaNacimiento = new Date(anyoNacimiento, mesNacimiento, diaNacimiento);
        edad = Math.round((fecha - fechaNacimiento) / MILISEGUNDOSPORANYO);
    }
    return edad;
}
function calcularEdadUsuario(date, fecha) {
    var diaNacimiento = date.substring(0, 2);
    var mesNacimiento = date.substring(2, 5);
    var anyoNacimiento = date.substring(5, 7);
    var edad;
    if (anyoNacimiento > 30) {
        anyoNacimiento = "19" + anyoNacimiento;
    } else {
        anyoNacimiento = "20" + anyoNacimiento;
    }
    fechaNacimiento = new Date(anyoNacimiento, MESES.split(",").indexOf(mesNacimiento), diaNacimiento);
    edad = Math.floor((fecha - fechaNacimiento) / MILISEGUNDOSPORANYO);
    return edad;
}
function validateUserData(cadenaConsulta) {
    var nif;
    var password;
    var name;
    var gender;
    var date;
    var datosSistema = "Está utilizando el navegador " + identificarNavegador(window.navigator.userAgent) + " en un sistema operativo " + identificarSO(window.navigator.userAgent);
    var salida;
    var posicionParametro = 0;
    var error = false;
    var listaArgumentos;
    var argumentos = new String("nif,password,name,gender,date");
    var cadenaDecodificada;
    var parametrosIntroducidos;
    var posicionArgumento = 0;
    var argumentoErroneo;
    var fecha = new Date();
    var noParametros = false;
    var usuarios = "name:Pepe Pérez,nif:12345678Z,password:lalajkf,date:030690,gender:M;nombre:Luisa Sánchez,nif:X1234567L,password:yemiiwzbdl,date:160848,gender:F;name:Alberto López,nif:K9999999J,password:kadlwu,date:230707,gender:M".split(";");
    listaArgumentos = argumentos.split(",");
    cadenaDecodificada = decodeURIComponent(cadenaConsulta);
    parametrosIntroducidos = cadenaDecodificada.replace(/\?/g, "").split("&").sort();
    while (parametrosIntroducidos[posicionParametro] && !error) {
        if (parametrosIntroducidos[posicionParametro].indexOf(listaArgumentos[posicionArgumento]) > -1 && !error) {
            switch (listaArgumentos[posicionArgumento]) {
            case "nif":
                nif = obtenerValorDeParametro(parametrosIntroducidos[posicionParametro]);
                break;
            case "password":
                password = obtenerValorDeParametro(parametrosIntroducidos[posicionParametro]);
                break;
            case "name":
                name = obtenerValorDeParametro(parametrosIntroducidos[posicionParametro]);
                break;
            case "gender":
                gender = obtenerValorDeParametro(parametrosIntroducidos[posicionParametro]);
                break;
            case "date":
                date = obtenerValorDeParametro(parametrosIntroducidos[posicionParametro]);
                break;
            }
            while (!reconocerParametro(listaArgumentos[posicionArgumento])(obtenerValorDeParametro(parametrosIntroducidos[posicionParametro])) && !error) {
                error = true;
                argumentoErroneo = listaArgumentos[posicionArgumento];
            }
            posicionParametro++;
            posicionArgumento = 0;
        } else {
            posicionArgumento++;
        }
    }
    if (argumentoErroneo) {
            salida = "Error: Argumento ".concat(argumentoErroneo).concat(" inválido");
    } else {
        if (!nif && !password && !name && !gender && !date) {
            salida = datosSistema;
        } else {
            if (localizarDatosUsuario(nif, password, usuarios) && !name && !gender && !date) {
                salida = "Buenos " + determinarSaludo(fecha) + " " + determinarTratamiento(nif, usuarios) + " " + determinarApellido(nif, usuarios) + "." + " Su edad es " + determinarEdad(nif, fecha, usuarios) + " años";
            } else {
                if (!localizarDatosUsuario(nif, password, usuarios) && name && gender && date) {
                    salida = "No hemos podido localizar sus datos " + determinarTratamiento(nif, usuarios) + " " + name.split(" ")[1] + "." + " Su edad es " + calcularEdadUsuario(date, fecha) +  " años";
                } else {
                    salida = ERRORCREDENCIALES;
                }
            }
        }
    }
    return salida;
}
