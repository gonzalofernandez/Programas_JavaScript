"use strict";
function validateUserData(cadenaConsulta) {
    var nif, password, name, gender, date, salida, validacion, argumentoErroneo,
        personaEncontrada,
        error = false,
        listaArgumentos = ARGUMENTOS.split(","),
        posicionArgumento = 0,
        posicionParametro = 0,
        fecha = new Date(),
        cadenaDecodificada = decodeURIComponent(cadenaConsulta),
        parametrosIntroducidos = cadenaDecodificada.replace(/\?/g, "")
        .split("&").sort();
    quitarElementosVacios(parametrosIntroducidos);
    while (parametrosIntroducidos[posicionParametro] && !error) {
        if (parametrosIntroducidos[posicionParametro].indexOf(listaArgumentos[posicionArgumento]) > -1 && !error) {
            switch (listaArgumentos[posicionArgumento]) {
            case "nif":
                nif = obtenerValorDeParametro(parametrosIntroducidos[posicionParametro]);
                validacion = validarNif(nif);
                break;
            case "password":
                password = obtenerValorDeParametro(parametrosIntroducidos[posicionParametro]);
                validacion = validarPassword(password);
                break;
            case "name":
                name = obtenerValorDeParametro(parametrosIntroducidos[posicionParametro]);
                validacion = validarName(name);
                break;
            case "gender":
                gender = obtenerValorDeParametro(parametrosIntroducidos[posicionParametro]);
                validacion = validarGender(gender);
                break;
            case "date":
                date = obtenerValorDeParametro(parametrosIntroducidos[posicionParametro]);
                validacion = validarDate(date);
                break;
            }
            if (validacion) {
                posicionParametro += 1;
                posicionArgumento = 0;
            } else {
                error = true;
                argumentoErroneo = listaArgumentos[posicionArgumento];
            }
        } else if (posicionArgumento === 4) {
            posicionArgumento = 0;
            posicionParametro += 1;
        } else {
            posicionArgumento += 1;
        }
    }
    if (!cadenaConsulta) {
        salida = `Está utilizando el navegador ${identificarNavegador(window.navigator.userAgent)} en un sistema operativo ${identificarSO(window.navigator.userAgent)}`;
    } else if (argumentoErroneo) {
        //TO_DO
        //no funcionan los tests que utilizan la salida error
        //throw new Error(`Argumento ${argumentoErroneo} inválido`);
        salida = `Error: Argumento ${argumentoErroneo} inválido`;
    } else {
        personaEncontrada = localizarDatosUsuario(nif, password, USUARIOS);
        if (personaEncontrada.length === 1) {
            personaEncontrada = personaEncontrada[0].split(",");
            salida = `Buenos ${determinarSaludo(fecha)} ${determinarTratamiento(personaEncontrada[4])} ${determinarApellido(personaEncontrada[0])}. Su edad es ${determinarEdad(personaEncontrada[3], fecha)} años`;
        } else if (personaEncontrada.length === 0 && name && gender && date) {
            salida = `No hemos podido localizar sus datos ${determinarTratamiento(gender)} ${name.split(" ")[1]}. Su edad es ${determinarEdad(date, fecha)} años`;
        } else {
            //TO_DO
            //no funcionan los tests que utilizan la salida error
            //throw ERROR_CREDENCIALES;
            salida = ERROR_CREDENCIALES;
        }
    }
    return salida;
}
