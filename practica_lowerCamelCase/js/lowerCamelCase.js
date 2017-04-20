function tr(caracter, pat1, pat2) {
    var letra;
    if (pat1.search(caracter) === -1) {
        letra = caracter;
    } else {
        letra = caracter.replace(caracter, pat2[pat1.search(caracter)]);
    }
    return letra;
}
function quitarTildes(caracter) {
    return tr(caracter, "áéíóúüñ", "aeiouun");
}
function cambiarAMayus(cadena) {
    var cadenaNueva = "";
    cadenaNueva = cadena.replace(cadena.charAt(0), cadena.charAt(0).toUpperCase());
    return cadenaNueva;
}
function cambiarAMinus(cadena) {
    var cadenaNueva = "";
    cadenaNueva = cadena.replace(cadena.charAt(0), cadena.charAt(0).toLowerCase());
    return cadenaNueva;
}
function lowerCamelCase(cadena) {
    var i;
    var j = 1;
    var cadenaDecodificada;
    var primeraLetraEnMinuscula;
    var cadenaFormateada = "";
    var vectorCadenaFormateada;
    var lowerCC = "";
    cadenaDecodificada = decodeURIComponent(cadena).replace("?", "");
    for (i = 0; i <= cadenaDecodificada.length - 1; i++) {
        cadenaFormateada = cadenaFormateada.concat(quitarTildes(cadenaDecodificada[i]));
    }
    vectorCadenaFormateada = cadenaFormateada.split(" ");
    for (j; j <= vectorCadenaFormateada.length - 1; j++) {
        vectorCadenaFormateada[j] = cambiarAMayus(vectorCadenaFormateada[j]);
    }
    lowerCC = cambiarAMinus(vectorCadenaFormateada.join(""));
    return lowerCC;
}
