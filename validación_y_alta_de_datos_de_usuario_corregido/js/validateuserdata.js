"use strict";
function validateUserData(cadenaConsulta) {
    var nif, password, name, gender, date, salida,
        error = false,
        noParametros = false,
        listaArgumentos = ARGUMENTOS.split(","),
        posicionArgumento = 0,
        posicionParametro = 0,
        argumentoErroneo,
        fecha = new Date(),
        cadenaDecodificada = decodeURIComponent(cadenaConsulta),
        parametrosIntroducidos = cadenaDecodificada.replace(/\?/g, "")
        .split("&").sort(),
        personaEncontrada;
    quitarElementosVacios(parametrosIntroducidos);
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
            posicionParametro += 1;
            posicionArgumento = 0;
        } else {
            if (posicionArgumento === 4) {
                posicionArgumento = 0;
                posicionParametro += 1;
            } else {
                posicionArgumento += 1;
            }
        }
    }
    if (argumentoErroneo) {
        salida = "Error: Argumento ".concat(argumentoErroneo).concat(" inválido");
    } else {
        if (!nif && !password && !name && !gender && !date) {
            salida = "Está utilizando el navegador " +
                identificarNavegador(window.navigator.userAgent) +
                " en un sistema operativo " + identificarSO(window.navigator.userAgent);
        } else {
            personaEncontrada = localizarDatosUsuario(nif, password, USUARIOS);
            if (personaEncontrada.length === 1) {
                personaEncontrada = personaEncontrada[0].split(",");
                salida = determinarSaludo(fecha) + " " +
                    determinarTratamiento(personaEncontrada[4]) + " " +
                    determinarApellido(personaEncontrada[0]) + "." +
                    " Su edad es " + determinarEdad(personaEncontrada[3], fecha) + " años";
            } else {
                if (personaEncontrada.length === 0 && name && gender && date) {
                    salida = "No hemos podido localizar sus datos " +
                        determinarTratamiento(gender) + " " + name.split(" ")[1] +
                        "." + " Su edad es " + calcularEdadUsuario(date, fecha) +  " años";
                } else {
                    salida = ERROR_CREDENCIALES;
                }
            }
        }
    }
    return salida;
}
