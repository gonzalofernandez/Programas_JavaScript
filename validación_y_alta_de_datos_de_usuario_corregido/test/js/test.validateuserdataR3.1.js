/*jslint
    node : true
*/
/*globals
    describe, context, it
*/
// Setup environment
var chai;
var validateUserData;
function requireNode() {
    chai = require('chai');
    validate = require('../js/validateuserdata.js');
    validateUserData = validate.validateUserData;
}
typeof module !== 'undefined' && module.exports && requireNode();
// Contstants
var MORNING_END = 12,
    EVENING_END = 19,
    NIGHT_END = 23,
    PART_OF_DAY = "Buenos días|Buenas tardes|Buenas noches".split("|");
// Helpers
function greeting() {
    var currentHour = (new Date()).getHours();
    var index = (currentHour <= MORNING_END)
            ? 0
            : (currentHour > EVENING_END) + 1;
    return PART_OF_DAY[index];
}
// Message composers
function composeInvalidArgMsg(argument) {
    return `Error: Argumento ${argument} inválido`;
}
function composeInvalidCredentials_msg() {
    return `Error: Credenciales inválidas`;
}
function composeUserLocatedMsg(pre, surname, age) {
    return `${greeting()} ${pre} ${surname}. Su edad es ${age} años`;
}
function composeUserNotLocatedMsg(pre, surname, age) {
    return `No hemos podido localizar sus datos ${pre} ${surname}. Su edad es ${age} años`;
}
// Query string
function composeKeyValue(key, value) {
    return value ? `${key}=${encodeURIComponent(value)}` : "";
}
function composeQueryString(data, headingextra, trailingextra) {
    var qs = Object.keys(data).map((arg) => composeKeyValue(arg, data[arg])).join("&");
    return "?".concat((headingextra || "").concat(qs).concat(trailingextra || ""));
}
// BDD
chai.should();
// The tests!
describe('User data validation testing', function() {
    context('Browser and OS (Run these tests in the browser)', function() {
        xit('should show browser and OS when an invalid formed QS like "?=%Mls/242= string" is provided', function() {
        });
        xit('should show the help page when the argument is provided', function() {
        });
        xit('should show the help page when the argument is provided and equal to YeS', function() {
        });
    });
    context('Invalid query string or invalid argument format', function() {
        it('should evaluate to an error message for an invalid date', function() {
            validateUserData(composeQueryString({
                name: "Lucas Grijander",
                nif: "L8769872H",
                password: "TDRISERA",
                gender: "M",
                date: "0000098"
            }, "dato=some&sse=false&", "&etwas=sdf")).should.be.equal(composeInvalidArgMsg("date"));
        });
        it('should evaluate to an error message for invalid nif', function() {
            validateUserData(composeQueryString({
                password: "DHJSASMDS",
                gender: "M",
                name: "Alberto Reyes",
                nif: "65478921E",
                date: "23apr92"
            })).should.be.equal(composeInvalidArgMsg("nif"));
        });
        it('should evaluate to an error message for an invalid password', function() {
            validateUserData(composeQueryString({
                nif: "89897654S",
                name: "Marisa Benítez",
                date: "020202",
                gender: "F",
                password: "1",
            })).should.be.equal(composeInvalidArgMsg("password"));
        });
    });
    context('The user is not in the database', function() {
        it('should evaluate to a proper message for user data not in the db', function() {
            validateUserData(composeQueryString({
                nif: "8867238W",
                password: "KSTKDAN",
                name: "Margarita González",
                gender: "F",
                date: "29feb80",
            })).should.be.equal(composeUserNotLocatedMsg("Sra.", "González", 37));
        });
        it('should evaluate to a proper message for user data not in the db and extra arguments are provided', function() {
            validateUserData(composeQueryString({
                nif: "98237416T",
                password: "MANSKWSSD",
                name: "Luisa Pérez",
                gender: "F",
                date: "04081993",
            }, "secret=ending=&", "&morestuff==56")).should.be.equal(composeUserNotLocatedMsg("Sra.", "Pérez", 23));
        });
        it('should evaluate to a proper message for user data not in the db and extra arguments are provided', function() {
            validateUserData(composeQueryString({
                nif: "25355421Z",
                password: "SENALREI",
                name: "Roberto Ledo",
                gender: "M",
                date: "05dic31",
            }, "anotherpar=9&", "&morestuff==56")).should.be.equal(composeUserNotLocatedMsg("Sr.", "Ledo", 85));
        });
    });
    context('The user is in the database', function() {
        it('should evaluate to a proper message for user data present in the db and extra arguments are provided', function() {
            validateUserData(composeQueryString({
                password: "CAQARIO",
                nif: "12345678Z",
                date: "062996"
            }, "foo=Hola&", "")).should.be.equal(composeUserLocatedMsg("Sr.", "Pérez", 26));
        });
    });
});
