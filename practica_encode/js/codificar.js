function codificar(cadena) {
    var cadenaCodificada;
    var cadenaDecodificada;
    var cadenaAProcesar = "";
    /*var i = 1;
    codificar queryString
    cadenaCodificada = encodeURIComponent(cadena);*/

    /*decodificar queryString
    while (cadena[i]) {
        cadenaAProcesar = cadenaAProcesar + cadena[i];
        i++;
    }*/
    cadenaAProcesar = cadena.replace("?", "");
    cadenaAProcesar = cadenaAProcesar.replace("%20", " ");
    //cadenaDecodificada = decodeURIComponent(cadenaAProcesar);
    return cadenaAProcesar;
}
