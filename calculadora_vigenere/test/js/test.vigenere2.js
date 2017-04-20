/*jslint
  devel : true browser: true */
/*global
    chai, describe, it, trim */
chai.should();
var NOVALIDO = "Codificación inválida";
describe("Test cifrado Vigenere", function () {
    it("Deberia devolver la cadena #hola# al cifrar la cadena *hola* con la clave a", function () {
        vigenere("*hola*","a").should.be.equal("#hola#");
    });
    it("Deberia devolver la cadena #wsae# al cifrar la cadena *hola* con la clave pepe", function () {
        vigenere("*hola*","pepe").should.be.equal("#wsae#");
    });
    it("Deberia devolver la cadena #ho$$la# al cifrar la cadena *ho$$la* con la clave a", function () {
        vigenere("*ho$$la*","a").should.be.equal("#ho$$la#");
    });
    it("Deberia devolver la cadena #hola #que# tal# al cifrar la cadena *Hola #que# tal* con la clave a", function () {
        vigenere("*Hola #que# tal*","a").should.be.equal("#hola #que# tal#");
    });
    it("Deberia devolver la cadena "+NOVALIDO+" al cifrar la cadena *hola con la clave a", function () {
        vigenere("*hola","a").should.be.equal(NOVALIDO);
    });
    it("Deberia devolver la cadena "+NOVALIDO+" al cifrar la cadena *hola* con la clave a*12#", function () {
        vigenere("*hola*","a*12#").should.be.equal(NOVALIDO);
    });

});
describe("Test descifrado Vigenere", function () {
    it("Deberia devolver la cadena *hola* al descifrar la cadena #hola# con la clave a", function () {
        vigenere("#hola#","a").should.be.equal("*hola*");
    });
    it("Deberia devolver la cadena *hola* al descifrar la cadena #wsae# con la clave pepe", function () {
        vigenere("#wsae#","pepe").should.be.equal("*hola*");
    });
    it("Deberia devolver la cadena *ho$$la* al descifrar la cadena #ho$$la# con la clave a", function () {
        vigenere("#ho$$la#","a").should.be.equal("*ho$$la*");
    });
    it("Deberia devolver la cadena *hola * al descifrar la cadena #hola #que# tal# con la clave a", function () {
        vigenere("#hola #que# tal#","a").should.be.equal("*hola *");
    });
    it("Deberia devolver la cadena "+NOVALIDO+" al descifrar la cadena #hola con la clave a", function () {
        vigenere("#hola","a").should.be.equal(NOVALIDO);
    });
    it("Deberia devolver la cadena "+NOVALIDO+" al descifrar la cadena #hola# con la clave a*12#", function () {
        vigenere("#hola#","a*12#").should.be.equal(NOVALIDO);
    });

});
