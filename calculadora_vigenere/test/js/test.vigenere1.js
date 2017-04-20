/*jslint
  devel : true browser: true */
/*global
    chai, describe, it, vigenere */
var expect = chai.expect;
chai.should();

describe("Testeando la función \"vigenere\" con estilo BDD", function () {
    it("Debería devolver un mensaje de error sin las 2 entradas están vacías", function () {
        vigenere("", "").should.be.equal("Codificación inválida");
    });
    it("Debería devolver un mensaje de error si la cadena de entrada está vacía", function () {
        vigenere("", "clave").should.be.equal("Codificación inválida");
    });
    it("Debería devolver un mensaje de error si la clave de entrada está vacía", function () {
        vigenere("*cadena*", "").should.be.equal("Codificación inválida");
    });
    it("Debería devolver un mensaje de error si no introducimos el delimitador inicial de cifrado", function () {
        vigenere("hola*", "clave").should.be.equal("Codificación inválida");
    });
    it("Debería devolver un mensaje de error si no introducimos el delimitador final de cifrado", function () {
        vigenere("*hola", "clave").should.be.equal("Codificación inválida");
    });
    it("Debería devolver un mensaje de error si no introducimos los 2 delimitadores de cifrado", function () {
        vigenere("hola", "clave").should.be.equal("Codificación inválida");
    });
    it("Debería devolver un mensaje de error si no introducimos el delimitador inicial de descifrado", function () {
        vigenere("hola#", "clave").should.be.equal("Codificación inválida");
    });
    it("Debería devolver un mensaje de error si no introducimos el delimitador final de descifrado", function () {
        vigenere("#hola", "clave").should.be.equal("Codificación inválida");
    });
    it("Debería devolver un mensaje de error si no introducimos los 2 delimitadores de descifrado", function () {
        vigenere("hola", "clave").should.be.equal("Codificación inválida");
    });
    it("Debería devolver un mensaje de error si la clave contiene un carácter distinto de letra", function () {
        vigenere("*cadena*", "clave2").should.be.equal("Codificación inválida");
    });
    it("Debería devolver la cadena cifrada: #eldzrc# si introducimos la cadena: *CADENA* y la clave: CLAVE", function () {
        vigenere("*cadena*", "clave").should.be.equal("#eldzrc#");
    });
});
