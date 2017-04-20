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
    PART_OF_DAY = "días|tardes|noches".split("|"),
    ARGUMENTS = "nif|password|name|gender|";
// Helpers
function partOfDay() {
    var currentHour = (new Date()).getHours();
    var index = (currentHour <= MORNING_END)
            ? 0
            : (currentHour <= EVENING_END) + 1;
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
    return `Buenos ${partOfDay()} ${pre} ${surname}. Su edad es ${age} años`;
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
        xit('should show browser and OS when no arguments are provided', function() {
        });
        xit('should show browser and OS when an invalid formed QS like "?thisisan==invalid&query& string" is provided', function() {
        });
    });
    context('Invalid query string or invalid argument format', function() {
        it('should evaluate to an error message for an invalid nif', function() {
            validateUserData(composeQueryString({
                name: "Iñaki Gómez",
                date: "12nov96",
                nif: "M754321AH",
                gender: "M",
                password: "SAWPOSKEJN",
            })).should.be.equal(composeInvalidArgMsg("nif"));
        });
        it('should evaluate to an error message for an invalid password and extra arguments are provided', function() {
            validateUserData(composeQueryString({
                name: "Lucas Grijander",
                nif: "L8769872H",
                password: "TD3ISER",
                gender: "M",
                date: "08jul03"
            }, "nonsense=true&sense=false&", "&somemore=á")).should.be.equal(composeInvalidArgMsg("password"));
        });
        it('should evaluate to an error message for an invalid name', function() {
            validateUserData(composeQueryString({
                password: "DHJSASMDS",
                gender: "M",
                nif: "27389231A",
                name: "José Pérez Martínez",
                date: "23apr92"
            })).should.be.equal(composeInvalidArgMsg("name"));
        });
        it('should evaluate to an error message for an invalid date', function() {
            validateUserData(composeQueryString({
                nif: "Y3344556W",
                name: "Leandro Gado",
                date: "31feb02",
                gender: "F",
                password: "SKSSSUSD",
            })).should.be.equal(composeInvalidArgMsg("date"));
        });
    });
    context('The user is not in the database', function() {
        it('should evaluate to a proper message for user data not in the db', function() {
            validateUserData(composeQueryString({
                nif: "22222222J",
                password: "SOMEKEY",
                name: "Enrique González",
                gender: "M",
                date: "03apr90",
            })).should.be.equal(composeUserNotLocatedMsg("Sr.", "González", 26));
        });
        it('should evaluate to a proper message for user data not in the db and extra arguments are provided', function() {
            validateUserData(composeQueryString({
                nif: "Z7652123M",
                password: "MYACSKEY",
                name: "Chema Pamundi",
                gender: "M",
                date: "03apr90",
            }, "secret=ending=&", "&morestuff==56")).should.be.equal(composeUserNotLocatedMsg("Sr.", "Pamundi", 26));
        });
    });
    context('The user is in the database', function() {
        it('should evaluate to a proper message for user data present in the db', function() {
            validateUserData(composeQueryString({
                nif: "X1234567L",
                password: "PERIQUITOS",
            })).should.be.equal(composeUserLocatedMsg("Sra.", "Sánchez", "68"));
        });
        it('should evaluate to a proper message for user data present in the db and extra arguments are provided', function() {
            validateUserData(composeQueryString({
                password: "BAILES",
                nif: "K9999999J",
                date: "11aug45"
            }, "HOLA=foo&", "&ADIÓS=bar")).should.be.equal(composeUserLocatedMsg("Sr.", "López", 9));
        });
    });
});
