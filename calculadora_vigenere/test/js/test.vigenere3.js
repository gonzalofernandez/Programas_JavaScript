var ERROR_MESSAGE = "Codificación inválida";
chai.should();

describe("Testing Vigenere cipher", function() {
    it("should return error message for an empty string and key", function() {
        vigenere("", "").should.be.equal(ERROR_MESSAGE);
    });
    it("should return error message for a string which start and finish " +
        "with '*' and an empty key",
        function() {
            vigenere("**", "").should.be.equal(ERROR_MESSAGE);
        });
    it("should return error message for a string which start and finish " +
        "with '#' and an empty key",
        function() {
            vigenere("##", "").should.be.equal(ERROR_MESSAGE);
        });
    it("should return error message for an empty string and 'hola' as key", function() {
        vigenere("", "hola").should.be.equal(ERROR_MESSAGE);
    });
    it("should return error message for '*hola#' string and 'c' as key", function() {
        vigenere("*hola#", "c").should.be.equal(ERROR_MESSAGE);
    });
    it("should return error message for '*ho*la#' string and 'c' as key", function() {
        vigenere("*ho*la#", "c").should.be.equal(ERROR_MESSAGE);
    });
    it("should return error message for '#ho#la*' string and 'c' as key", function() {
        vigenere("#ho#la*", "c").should.be.equal(ERROR_MESSAGE);
    });
    it("should return '#pegn#' for '*casa*' string and 'néó' as key", function() {
        vigenere("*casa*", "néó").should.be.equal("#pegn#");
    });
    it("should return '##' for '**' string and 'c' as key", function() {
        vigenere("**", "c").should.be.equal("##");
    });
    it("should return '**' for '##' string and 'c' as key", function() {
        vigenere("##", "c").should.be.equal("**");
    });
    it("should return '#pegn#' for '*cásá*' string and 'neo' as key", function() {
        vigenere("*cásá*", "neo").should.be.equal("#pegn#");
    });
    it("should return '#joda#' for '*hola*' string and 'CASA' as key", function() {
        vigenere("*hola*", "CASA").should.be.equal("#joda#");
    });
    it("should return '#jq*nc#' for '*ho#la*' string and 'c' as key", function() {
        vigenere("*ho*la*", "c").should.be.equal("#jq*nc#");
    });
    it("should return '#jq#nc#' for '*ho#la*' string and 'c' as key", function() {
        vigenere("*ho#la*", "c").should.be.equal("#jq#nc#");
    });
    it("should return '#j1q;3:n.c#' for '*h1o;3:l.a*' string and 'c' as key", function() {
        vigenere("*h1o;3:l.a*", "c").should.be.equal("#j1q;3:n.c#");
    });
    it("should return '*espana*' for '#gshapa#' string and 'casa' as key", function() {
        vigenere("#gshapa#", "casa").should.be.equal("*espana*");
    });
    it("should return error message for " +
        " '*P A R I S  V A U T  B I E N  U N E  M E S S E*' string " +
        "and 'L O U P L  O U P L  O U P L  O U P  L O U P L' as key", function() {
         vigenere("*P A R I S  V A U T  B I E N  U N E  M E S S E*",
                "L O U P L  O U P L  O U P L  O U P  L O U P L").should.be.equal(ERROR_MESSAGE);
    });
});
