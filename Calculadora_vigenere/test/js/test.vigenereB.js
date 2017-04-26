/*jslint
  devel : true browser: true */
/*global
    chai, describe, it, vigenere */

var TEST_INVALID_COD_889AIQW = "Codificación inválida";
chai.should();

describe('Tests the vigenère function', function() {
    it('Should return error for key with invalid chars', function() {
       vigenere("*Material muy secreto*", "#akey/").should.be.equal(TEST_INVALID_COD_889AIQW);
    });
    it('Should return error for malformed uncrypted message', function() {
       vigenere("Este mensaje es inválido", "goodkey").should.be.equal(TEST_INVALID_COD_889AIQW);
    });
    it('Should return a correct crypted message for a well formed uncrypted message and key longer than message', function() {
       vigenere("*Short*", "LongLongWord").should.be.equal("#dvbxe#");
    });
    it('Should return the correct crypted message for a well formed message', function() {
       vigenere("*casI Secrexo*", "unaclave").should.be.equal("#wnsk szglrxq#");
    });
    it('Should return the correct crypted message for a well formed message including non alphabetic chars', function() {
       vigenere("*100cañones*", "esprÔnceda").should.be.equal("#100toaqrhs#");
    });
    it('Should return the correct crypted message for a well formed message using tildes', function() {
       vigenere("*ÑîñgünÇàráçtÊr*", "ÂèíoÜ").should.be.equal("#nmvuongifucxmf#");
    });
    it('Should return the correct crypted message and format for a well formed message including the special word', function() {
       vigenere("*Tira el secreto al desagüe GarÇon*", "ChIcO").should.be.equal("!vpzc gs useymvc ht rgziiig ocfevv!");
    });
    it('Should return the correct uncrypted message for a well formed crypted message', function() {
       vigenere("#cÒuvbitfüjeybái!hmwt#", "rosêTta").should.be.equal("*lacriptografiar!pida*");
    });
    it('Should return the correct uncrypted message for a well formed crypted message', function() {
       vigenere("#svmgjftl zwìf#", "prÜebacLave").should.be.equal("*descifra esto*");
    });
    it('Should return the original message when applied twice', function() {
       vigenere(vigenere("*Éste çest el ültimÔ mensàje*", "vigenère"), "vigenÈre").should.be.equal("*este es el ultimo mensaje*");
    });
});
