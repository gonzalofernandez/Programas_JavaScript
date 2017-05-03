"use strict";
function buscarCoincidencia(cadenaEntrada, PALABRA_COMPARADA, numeroLetras) {
	var posicionCadena = 0,
		posicionPalabra = 0,
		coincidencia = "";
	while (PALABRA_COMPARADA[posicionCadena] && posicionPalabra !== numeroLetras) {
		while (cadenaEntrada[posicionPalabra] && coincidencia !== PALABRA_COMPARADA) {
			if (PALABRA_COMPARADA[posicionCadena] === cadenaEntrada[posicionPalabra]) {
				coincidencia = coincidencia + cadenaEntrada[posicionPalabra];
                posicionCadena += 1;
			} else {
                coincidencia = "";
                posicionCadena = 0;
            }
            posicionPalabra += 1;
		}
	}
	return coincidencia === PALABRA_COMPARADA;
}

function contarCaracteres(caracteres) {
    var numeroCaracteres = 0;
    while (caracteres[numeroCaracteres]) {
        numeroCaracteres += 1;
    }
    return numeroCaracteres;
}

function comprobarLetra(letra) {
    var numLetra;
    switch (letra) {
    case "a":
    case "A":
    case "á":
    case "Á":
    case "ã":
    case "Ã":
    case "à":
    case "À":
    case "ä":
    case "Ä":
    case "â":
    case "Â":
        numLetra = 0;
        break;
    case "b":
    case "B":
        numLetra = 1;
        break;
    case "c":
    case "C":
    case "ç":
    case "Ç":
        numLetra = 2;
        break;
    case "d":
    case "D":
        numLetra = 3;
        break;
    case "e":
    case "E":
    case "é":
    case "É":
    case "~e":
    case "~E":
    case "è":
    case "È":
    case "ë":
    case "Ë":
    case "ê":
    case "Ê":
        numLetra = 4;
        break;
    case "f":
    case "F":
        numLetra = 5;
        break;
    case "g":
    case "G":
        numLetra = 6;
        break;
    case "h":
    case "H":
        numLetra = 7;
        break;
    case "i":
    case "I":
    case "í":
    case "Í":
    case "~i":
    case "~I":
    case "ì":
    case "Ì":
    case "ï":
    case "Ï":
    case "î":
    case "Î":
        numLetra = 8;
        break;
    case "j":
    case "J":
        numLetra = 9;
        break;
    case "k":
    case "K":
        numLetra = 10;
        break;
    case "l":
    case "L":
        numLetra = 11;
        break;
    case "m":
    case "M":
        numLetra = 12;
        break;
    case "n":
    case "N":
    case "ñ":
    case "Ñ":
        numLetra = 13;
        break;
    case "o":
    case "O":
    case "ó":
    case "Ó":
    case "õ":
    case "Õ":
    case "ò":
    case "Ò":
    case "ö":
    case "Ö":
    case "ô":
    case "Ô":
        numLetra = 14;
        break;
    case "p":
    case "P":
        numLetra = 15;
        break;
    case "q":
    case "Q":
        numLetra = 16;
        break;
    case "r":
    case "R":
        numLetra = 17;
        break;
    case "s":
    case "S":
        numLetra = 18;
        break;
    case "t":
    case "T":
        numLetra = 19;
        break;
    case "u":
    case "U":
    case "ú":
    case "Ú":
    case "~u":
    case "~U":
    case "ù":
    case "Ù":
    case "ü":
    case "Ü":
    case "û":
    case "Û":
        numLetra = 20;
        break;
    case "v":
    case "V":
        numLetra = 21;
        break;
    case "w":
    case "W":
        numLetra = 22;
        break;
    case "x":
    case "X":
        numLetra = 23;
        break;
    case "y":
    case "Y":
        numLetra = 24;
        break;
    case "z":
    case "Z":
        numLetra = 25;
        break;
    default:
        numLetra = -1;
    }
    return numLetra;
}

function convertirNumeroEnLetra(numero) {
    var letra;
    switch (numero) {
    case 0:
        letra = "a";
        break;
    case 1:
        letra = "b";
        break;
    case 2:
        letra = "c";
        break;
    case 3:
        letra = "d";
        break;
    case 4:
        letra = "e";
        break;
    case 5:
        letra = "f";
        break;
    case 6:
        letra = "g";
        break;
    case 7:
        letra = "h";
        break;
    case 8:
        letra = "i";
        break;
    case 9:
        letra = "j";
        break;
    case 10:
        letra = "k";
        break;
    case 11:
        letra = "l";
        break;
    case 12:
        letra = "m";
        break;
    case 13:
        letra = "n";
        break;
    case 14:
        letra = "o";
        break;
    case 15:
        letra = "p";
        break;
    case 16:
        letra = "q";
        break;
    case 17:
        letra = "r";
        break;
    case 18:
        letra = "s";
        break;
    case 19:
        letra = "t";
        break;
    case 20:
        letra = "u";
        break;
    case 21:
        letra = "v";
        break;
    case 22:
        letra = "w";
        break;
    case 23:
        letra = "x";
        break;
    case 24:
        letra = "y";
        break;
    case 25:
        letra = "z";
        break;
    default:
        letra = "";
    }
    return letra;
}

function cifrar(numCam, numCla, mod) {
    var cifrado;
    if ((numCam + numCla) >= mod) {
        cifrado = (numCam + numCla) % mod;
    } else {
        cifrado = numCam + numCla;
    }
    return cifrado;
}

function descifrar(numCam, numCla, mod) {
    var descifrado;
    if ((numCam - numCla) >= 0) {
        descifrado = (numCam - numCla) % mod;
    } else {
        descifrado = (numCam - numCla + mod) % mod;
    }
    return descifrado;
}

function cifrarYDescifrar(numCam, numCla, mod, orden) {
    var salida;
    if (orden === "cifrar") {
        salida = cifrar(numCam, numCla, mod);
    } else {
        salida = descifrar(numCam, numCla, mod);
    }
    return salida;
}

function vigenere(cadena, clave) {
    var msgError = "Codificación inválida",
        j = 0,
        i = 0,
        salida,
        numeroLetrasDeCadena,
        numeroLetrasDeClave,
        cadenaCifrada = "",
        numeroCadena,
        numeroClave,
        numeroDeLetraCifrada,
        letraCifrada,
        simboloCifrar = "*",
        simboloDescifrar = "#",
        simboloDescifrarAlternativo = "!",
        orden,
        ordenCifrar = "cifrar",
        ordenDescifrar = "descifrar",
        codigoSalida;
    if (!cadena) {
        salida = msgError;
    } else {
        numeroLetrasDeCadena = contarCaracteres(cadena);
        numeroLetrasDeClave = contarCaracteres(clave);
        if ((cadena[0] === simboloCifrar && cadena[numeroLetrasDeCadena - 1] === simboloCifrar) ||
                (cadena[0] === simboloDescifrar && cadena[numeroLetrasDeCadena - 1] === simboloDescifrar)) {
            if (numeroLetrasDeCadena === 2) {
                salida = msgError;
            } else {
                if (cadena[0] === simboloCifrar) {
                    if (buscarCoincidencia(cadena, PALABRA_COMPARADA, numeroLetrasDeCadena)) {
                        codigoSalida = simboloDescifrarAlternativo;
                    } else {
                        codigoSalida = simboloDescifrar;
                    }
                    orden = ordenCifrar;
                } else {
                    codigoSalida = simboloCifrar;
                    orden = ordenDescifrar;
                }
                for (i = 1; i <= numeroLetrasDeCadena - 2; i += 1) {
                    numeroCadena = comprobarLetra(cadena[i]);
                    numeroClave = comprobarLetra(clave[j]);
                    if (numeroClave === -1) {
                        salida = msgError;
                    } else {
                        if (numeroCadena === -1) {
                            cadenaCifrada = cadenaCifrada + cadena[i];
                        } else {
                            numeroDeLetraCifrada = cifrarYDescifrar(numeroCadena, numeroClave, MODULO, orden);
                            letraCifrada = convertirNumeroEnLetra(numeroDeLetraCifrada);
                            cadenaCifrada = cadenaCifrada + letraCifrada;
                        }
                    }
                    if (salida === msgError) {
                        i = numeroLetrasDeCadena;
                    } else {
                        salida = codigoSalida + cadenaCifrada + codigoSalida;
                        if (j === numeroLetrasDeClave - 1) {
                            j = 0;
                        } else {
                            j += 1;
                        }
                    }
                }
            }
        } else {
            salida = msgError;
        }
    }
    return salida;
}
