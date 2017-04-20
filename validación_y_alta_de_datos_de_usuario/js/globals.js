module.exports.ERRORCREDENCIALES = new Error("Credenciales inválidas");
module.exports.MESES = new String("jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec");
module.exports.MILISEGUNDOSPORANYO = 31536000000;
module.exports.function contarCaracteres(caracteres) {
    var i = 0;
    var numeroCaracteres = 0;
    while (caracteres[i]) {
        numeroCaracteres++;
        i++;
    }
    return numeroCaracteres;
}
module.exports.function comprobarLetra(letra) {
    var numLetra;
    switch (letra) {
    case "a":
    case "A":
    case "á":
    case "Á":
        numLetra = 0;
        break;
    case "b":
    case "B":
        numLetra = 1;
        break;
    case "c":
    case "C":
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
module.exports.function convertirNumeroEnLetra(numero) {
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
module.exports.function cifrar(numCam, numCla, mod) {
    var salida;
    if ((numCam + numCla) >= mod) {
        salida = (numCam + numCla) % mod;
    } else {
        salida = numCam + numCla;
    }
    return salida;
}
module.exports.function descifrar(numCam, numCla, mod) {
    var salida;
    if ((numCam - numCla) >= 0) {
        salida = (numCam - numCla) % mod;
    } else {
        salida = (numCam - numCla + mod) % mod;
    }
    return salida;
}
module.exports.function vigenere(cadena, clave) {
    var msgError = "Codificación inválida";
    var i = 0;
    var j = 0;
    var salida;
    var numeroLetrasDeCadena = contarCaracteres(cadena);
    var numeroLetrasDeClave = contarCaracteres(clave);
    var cadenaCifrada = "";
    var numeroCadena;
    var numeroClave;
    var numeroDeLetraCifrada;
    var letraCifrada;
    var simboloCifrar = "*";
    var simboloDescifrar = "#";
    var modulo = 26;
    var codigo = "";
    if (cadena === "") {
        salida = msgError;
    } else {
        if (numeroLetrasDeCadena === 2) {
            salida = msgError;
        } else {
            i++;
            for (i; i <= numeroLetrasDeCadena - 2; i++) {
                numeroCadena = comprobarLetra(cadena[i]);
                numeroClave = comprobarLetra(clave[j]);
                if (numeroClave === -1) {
                    salida = msgError;
                } else {
                    if (numeroCadena === -1) {
                        cadenaCifrada = cadenaCifrada + cadena[i];
                    } else {
                        if (cadena[0] === simboloCifrar && cadena[numeroLetrasDeCadena - 1] === simboloCifrar) {
                            numeroDeLetraCifrada = cifrar(numeroCadena, numeroClave, modulo);
                            codigo = "cifra";
                        } else {
                            if (cadena[0] === simboloDescifrar && cadena[numeroLetrasDeCadena - 1] === simboloDescifrar) {
                                numeroDeLetraCifrada = descifrar(numeroCadena, numeroClave, modulo);
                            } else {
                                salida = msgError;
                            }
                        }
                        letraCifrada = convertirNumeroEnLetra(numeroDeLetraCifrada);
                        cadenaCifrada = cadenaCifrada + letraCifrada;
                    }
                }
                if (salida === msgError) {
                    i = numeroLetrasDeCadena;
                } else {
                    if (codigo === "cifra") {
                        salida = simboloDescifrar + cadenaCifrada + simboloDescifrar;
                    } else {
                        salida = simboloCifrar + cadenaCifrada + simboloCifrar;
                    }
                    if (j === numeroLetrasDeClave - 1) {
                        j = 0;
                    } else {
                        j++;
                    }
                }
            }
        }
    }
    return salida;
}
