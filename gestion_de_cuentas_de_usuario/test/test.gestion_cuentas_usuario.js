
var frontEndModule = require("../js/front-end.js"),
    chai = require("chai");

//PONER MIS FUNCIONES
// Functions to test
var codeValidation = codeValidationModule.codeValidation;

// BDD
chai.should();
// TDD
var expect = chai.expect;

//PONER MIS FUNCIONES
// The tests!
describe('Test codeValidation function', function() {
    context('Invalid arguments', function() {
        it('Should evaluate to false for an invalid type', function() {
            codeValidation(new Date()).should.be.nok;
        });
    });

    context('Invalid codes', function() {
        it('Should evaluate to false for an invalid code', function() {
            codeValidation("C1234").should.be.nok;
        });
    });

    context('Valid codes', function() {
        it('Should evaluate to true for a valid code', function() {
            codeValidation("R2016XAZ").should.be.ok;
        });
    });
});
