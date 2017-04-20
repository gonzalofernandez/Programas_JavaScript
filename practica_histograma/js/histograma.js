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
    return tr(caracter, "áéíóúü", "aeiouu");
}
function histograma(cadena) {
    var cadenaDecodificada;
    var cadenaFormateada = "";
    var i = 0;
    var j = 0;
    var totalCaracteres;
    var histogr = "";
    var vez = "*";
    cadenaDecodificada = decodeURIComponent(cadena).replace("?", "").toLowerCase().split(" ").join("");
    for (i; i <= cadenaDecodificada.length - 1; i++) {
        cadenaFormateada = cadenaFormateada.concat(quitarTildes(cadenaDecodificada.charAt(i)));
    }
    totalCaracteres = cadenaFormateada.split("").sort().join("");
    for (j; j <= totalCaracteres.length - 1; j++) {
        if (totalCaracteres.charAt(j) !== totalCaracteres.charAt(j - 1)) {
            histogr = histogr.concat("<br /><br />".concat(totalCaracteres.charAt(j).concat(vez)));
        } else {
            histogr = histogr.concat(vez);
        }
    }
    return histogr;
}
