/*jslint
  devel : true browser: true */
/*global
    chai, describe, it, vigenere */

var TEST_INVALID_COD_XKJERDS = "Codificación inválida";
chai.should();

describe('Tests the vigenère function', function() {
    it('Should return error for empty key', function() {
       vigenere("encode this", "").should.be.equal(TEST_INVALID_COD_XKJERDS);
    });
    it('Should return error for key with invalid chars', function() {
       vigenere("", "t*st").should.be.equal(TEST_INVALID_COD_XKJERDS);
    });
    it('Should return error for malformed message', function() {
       vigenere("*Grover killed Bambi", "badguy").should.be.equal(TEST_INVALID_COD_XKJERDS);
    });
    it('Should return a valid encrypted word for a well formed message', function() {
       vigenere("*NoitwasKermitWhokilledBambi*", "mistery").should.be.equal("#zwamarqwmjfmkutwcbpccpjsffz#");
    });
    it('Should return a valid encrypted word for a well formed message including spanish chars', function() {
       vigenere("*Kermit was not there ese Año, Ramón*", "kermit").should.be.equal("#uiiyqm are gyx fpxbi qax eea, bedav#");
    });
    it('Should return error for a malformed encrypted message', function() {
       vigenere("ndsñfsádfSnsf", "somekey").should.be.equal(TEST_INVALID_COD_XKJERDS);
    });
    it('Should return the correct uncrypted message for a well formed crypted message', function() {
       vigenere("#Mhn_smtyg(wnejtrx)?#", "muppet").should.be.equal("*any_other(suspect)?*");
    });
    it('Should return the correct uncrypted message for a well formed crypted message and key longer than message', function() {
       vigenere("#xyvamoanxyccs#", "thisIsaVeryLongkey").should.be.equal("*erniewasthere*");
    });
    it('Should return an uncrypted word for a well formed crypted message including spanish chars', function() {
       vigenere("#fvébf zl e zpsú hyp#", "bert").should.be.equal("*ernie is a good guy*");
    });
    it('Should return the original message when applied twice', function() {
       vigenere(vigenere("*Blame Jim Henson*", "nope"), "nope").should.be.equal("*blame jim henson*");
    });
});
