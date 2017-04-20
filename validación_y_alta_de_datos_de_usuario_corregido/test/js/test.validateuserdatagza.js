/*jslint
  devel : true browser: true */
/*global
    chai, describe, it, vigenere */
var expect = chai.expect;
chai.should();
// Contstants
var MORNING_END = 12,
    EVENING_END = 19,
    NIGHT_END = 23,
    PART_OF_DAY = "días|tardes|noches".split("|");
// Helpers
function partOfDay() {
    var currentHour = (new Date()).getHours();
    var index = (currentHour <= MORNING_END)
            ? 0
            : (currentHour > EVENING_END) + 1;
    return PART_OF_DAY[index];
}

describe("Testeando la función \"validateuserdata\" con estilo BDD", function () {
    it("Debería devolver un mensaje del sistema si la entrada está vacía", function () {
        validateUserData("").should.be.equal("Está utilizando el navegador " + identificarNavegador(window.navigator.userAgent) + " en un sistema operativo " + identificarSO(window.navigator.userAgent));
    });
    it("Debería devolver un mensaje del sistema si la entrada solo tiene la interrogación", function () {
        validateUserData("?").should.be.equal("Está utilizando el navegador " + identificarNavegador(window.navigator.userAgent) + " en un sistema operativo " + identificarSO(window.navigator.userAgent));
    });
    it("Debería devolver error del argumento si algún argumento es erroneo", function () {
        validateUserData("?nif=zzz").should.be.equal("Error: Argumento nif inválido");
    });
    it("Debería devolver mensaje indicando que no hemos podido devolver sus datos", function () {
        validateUserData("?nif=22222222J&password=KDSLWQ&name=Enrique%20Gonz%C3%A1lez&gender=M&date=03apr90").should.be.equal("No hemos podido localizar sus datos Sr. González. Su edad es 27 años");
    });
    it("Debería devolver mensaje saludando", function () {
        validateUserData("?nif=12345678Z&password=CAQARIO").should.be.equal("Buenos " + partOfDay() + " Sr. Pérez. Su edad es 26 años");
    });
    it("Debería de indicar argumento invalido para 2 nif: uno bueno y uno malo", function () {
        validateUserData("?nif=22222222J&password=KDSLWQ&name=Enrique%20Gonz%C3%A1lez&gender=M&date=03apr90&nif=zzz").should.be.equal("Error: Argumento nif inválido");
    });
    it("Debería indicar error para argumentos válidos pero no hay password", function () {
        validateUserData("?nif=22222222J&name=Enrique%20González&gender=M&date=03apr90").should.be.equal("No hemos podido localizar sus datos Sr. González. Su edad es 27 años");
    });
    it("Debería de indicar argumento name inválido para name con nombre y 2 apellidos", function () {
        validateUserData("?nif=22222222J&password=KDSLWQ&name=Enrique%20González%20Sanchez&gender=M&date=03apr90").should.be.equal("Error: Argumento name inválido");
    });
    it("Debería indicar mensaje de argumento inválido para nif con letra de control en minúscula", function () {
        validateUserData("?nif=12345678z").should.be.equal("Error: Argumento nif inválido");
    });
    it("Debería indicar mensaje de argumento inválido para género con letra distinta de M o F", function () {
        validateUserData("?gender=H").should.be.equal("Error: Argumento gender inválido");
    });
});
