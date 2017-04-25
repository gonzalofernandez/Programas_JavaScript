"use strict";
var miApp = (function () {
    //DATOS DEL SISTEMA
        var NOMBRE_SISTEMA_PRINCIPAL = "Gallus",
            LISTA_SERVIDORES = ["Amnexis,192.168.0.10,Linux",
                               "Asterix,192.168.0.20,WindowsServer2012",
                               "Asuracenturix,192.168.0.30,Linux",
                               "Obelix,192.168.0.40,WindowsServer2012",
                               "Panoramix,192.168.0.50,Linux",
                               "Abraracurcix,1.2.3.4,NetBSD"],
            SERVIDORES,
            CUENTAS_INICIALES = 0,
            SALDO_INICIAL = 0,
            SISTEMA_PRINCIPAL,
            VALIDACION_FECHA = new RegExp(/^\d{2}\/\d{2}\/\d{2}$/),
            VALIDACION_NOMBRE = new RegExp(/[a-z]*\.*-*_*/),
            TODAS_LAS_CUENTAS = "todas";

        //VALIDACION DE DATOS
        //Validar componentes de la fecha
        function validarComponentesFecha(dia, mes, anyo) {
            var fechaIntroducida, validacion, datosCorrectos, numeroMes;
            anyo = ((anyo > 30) ? "19" : "20") + anyo;
            datosCorrectos = ((mes <= 12 && mes >= 1) && (dia <= 31 && dia >= 1)) ? true : false;
            if (datosCorrectos) {
                numeroMes = mes - 1;
                fechaIntroducida = new Date(anyo, numeroMes, dia);
                validacion = (+dia === fechaIntroducida.getDate() &&
                            +numeroMes === fechaIntroducida.getMonth() &&
                            +anyo === fechaIntroducida.getFullYear()) ? true : false;
            } else {
                validacion = false;
            }
            return validacion;
        }
        //Validar fecha
        function validarFecha(fecha) {
            var validacion, diaIntroducido, mesIntroducido, anyoIntroducido;
            if (!VALIDACION_FECHA.test(fecha)) {
                validacion = false;
            } else {
                diaIntroducido = fecha.substr(0, 2);
                mesIntroducido = fecha.substr(3, 2);
                anyoIntroducido = fecha.substr(6, 2);
                validacion = validarComponentesFecha(diaIntroducido, mesIntroducido, anyoIntroducido);
            }
            return validacion;
        }
        //Validar nombre cuenta
        function validarNombreCuenta(nomCuenta) {
            var nombreYApellido = nomCuenta.split(" ");
            return (nombreYApellido.length === 1 && VALIDACION_NOMBRE.test(nomCuenta)) ?
                    true : false;
        }
        //Validar nombre usuario
        function validarNombreUsuario(nomUsu) {
            var nombreYApellido = nomUsu.split(" ");
            return nombreYApellido.length === 2;
        }


        //LOGICA DEL SISTEMA
        //Constructor del objeto Servidor
        function Servidor(nombre, direccionIp, sistemaOperativo) {
            this.nombre = nombre;
            this.direccionIp = direccionIp;
            this.sistemaOperativo = sistemaOperativo;
            this.cuentas = [];
        }
        //Creacion de los objetos Servidor
        SERVIDORES = (function () {
            return LISTA_SERVIDORES.map(function (valor) {
                var servidor = valor.split(",");
                return new Servidor(servidor[0], servidor[1], servidor[2]);
            });
        }());
        //Constructor del objeto Cuenta
        function Cuenta(nombreCuenta, nombreUsuario, fechaIngreso, saldo, puntos, tipoCuenta) {
            this.nombreCuenta = nombreCuenta;
            this.nombreUsuario = nombreUsuario;
            this.fechaIngreso = fechaIngreso;
            this.saldo = saldo;
            this.puntos = puntos;
            this.tipoCuenta = tipoCuenta;
        }

        //Constructor del objeto Sistema
        function Sistema(nombreSistema, servidoresTotales, saldoInicial) {
            this.nombreSistema = nombreSistema;
            this.servidores = servidoresTotales;
            this.saldoMedio = saldoInicial;
            //METODOS PRIVADOS
            //Metodo para comprobar si nombreCuenta esta repetido
            function comprobarNombreCuentaRepetido(nombreCuenta) {
                return this.servidores.some(function (servidor) {
                    return servidor.cuentas.some(function (cuenta) {
                        return nombreCuenta === cuenta.nombreCuenta;
                    });
                });
            }
            //Metodo para contar las cuentas del sistema
            function contarNumeroCuentasSistema() {
                return this.servidores.reduce(function (valorAnterior, servidor) {
                    return valorAnterior + servidor.cuentas.length;
                }, CUENTAS_INICIALES);
            }
            //Metodo para calcular el saldo total de todas las cuentas del sistema
            function calcularSaldoTotalSistema() {
                return this.servidores.reduce(function (valorAnterior, servidor) {
                    return servidor.cuentas.reduce(function (valorAnterior, cuenta) {
                        return valorAnterior + (+cuenta.saldo);
                    }, valorAnterior);
                }, SALDO_INICIAL);
            }
            //Metodo para obtener el saldo medio de las cuentas
            this.obtenerSaldoMedio = function () {
                return calcularSaldoTotalSistema.apply(this) /
                    contarNumeroCuentasSistema.apply(this);
            };
            //Asignar puntos en el caso de que no se hayan introducido en el formulario
            function comprobarPuntos(cuenta) {
                if (cuenta.puntos === "") {
                    switch (cuenta.tipo_de_cuenta) {
                    case "newbie":
                        cuenta.puntos = "10";
                        break;
                    case "user":
                        cuenta.puntos = "50";
                        break;
                    default:
                        cuenta.puntos = "100";
                    }
                }
                return cuenta.puntos;
            }
            //Metodo para añadir cuentas
            this.ingresarCuentas = function (nuevaCuenta, servidorElegido) {
                var cuenta, cuentaAgregada;
                if (!validarNombreCuenta(nuevaCuenta.nombre_de_cuenta) ||
                        comprobarNombreCuentaRepetido.apply(this, [nuevaCuenta.nombre_de_cuenta]) ||
                        !validarNombreUsuario(nuevaCuenta.nombre_de_usuario) ||
                        isNaN(nuevaCuenta.saldo_cuenta) ||
                        isNaN(nuevaCuenta.puntos) ||
                        !validarFecha(nuevaCuenta.fecha_ingreso)) {
                    cuentaAgregada = false;
                } else {
                    nuevaCuenta.puntos = comprobarPuntos(nuevaCuenta);
                    cuenta = new Cuenta(nuevaCuenta.nombre_de_cuenta,
                                    nuevaCuenta.nombre_de_usuario,
                                    nuevaCuenta.fecha_ingreso,
                                    nuevaCuenta.saldo_cuenta,
                                    nuevaCuenta.puntos,
                                    nuevaCuenta.tipo_de_cuenta);
                    servidorElegido.cuentas.push(cuenta);
                    cuentaAgregada = true;
                }
                return cuentaAgregada;
            };
        }
        //Creacion del objeto Sistema
        SISTEMA_PRINCIPAL = new Sistema(NOMBRE_SISTEMA_PRINCIPAL, SERVIDORES, SALDO_INICIAL);


        //FUNCIONES ENVOLVENTES(WRAPPER)
        function elegirServidor(seleccion) {
            return SISTEMA_PRINCIPAL.elegirServidor(seleccion);
        }
        function ingresarCuentas(nuevaCuenta, servidorElegido) {
            return SISTEMA_PRINCIPAL.ingresarCuentas(nuevaCuenta, servidorElegido);
        }
        function eliminarCuentas(servidorElegido, nombreCuenta) {
            return SISTEMA_PRINCIPAL.eliminarCuentas(servidorElegido, nombreCuenta);
        }
        function recuperarCuentas(servidorElegido) {
            return SISTEMA_PRINCIPAL.recuperarCuentas(servidorElegido);
        }
        function seleccionarCuentas(servidorElegido, filtro) {
            return SISTEMA_PRINCIPAL.seleccionarCuentas(servidorElegido, filtro);
        }
        function obtenerSaldoMedio() {
            return SISTEMA_PRINCIPAL.obtenerSaldoMedio();
        }


        //DEFINICION DE METODOS PUBLICOS SISTEMA
        //Metodo para mostrar cuentas
        Sistema.prototype.recuperarCuentas = function (servidorElegido) {
            return servidorElegido.cuentas;
        };
        //Metodos para seleccionar el servidor activo
        Sistema.prototype.elegirServidor = function (seleccion) {
            // AÑADIR POSIBILIDAD DE NO ENCONTRAR SERV O MAS DE UNO
            return this.servidores.filter(function (value) {
                return seleccion === value.nombre;
            })[0];
        };
        //Metodo para eliminar cuentas
        Sistema.prototype.eliminarCuentas = function (servidorElegido, cuentasChecked) {
            var cuentasDelServidor = recuperarCuentas(servidorElegido);
            cuentasChecked.forEach(function (nomCuenta) {
                this.find(function (cuenta, indice) {
                    if (nomCuenta === cuenta.nombreCuenta) {
                        this.splice(indice, 1);
                    }
                }, cuentasDelServidor);
            }, cuentasDelServidor);
        };
        //Metodo para filtar cuentas
        Sistema.prototype.seleccionarCuentas = function (servidorElegido, filtro) {
            var cuentas = [];
            servidorElegido.cuentas.forEach(function (cuenta) {
                if (this === cuenta.tipoCuenta || this === TODAS_LAS_CUENTAS) {
                    return cuentas.push(cuenta);
                }
            }, filtro);
            return cuentas;
        };


        return {
            elegirServidor: elegirServidor,
            ingresarCuentas: ingresarCuentas,
            eliminarCuentas: eliminarCuentas,
            recuperarCuentas: recuperarCuentas,
            seleccionarCuentas: seleccionarCuentas,
            obtenerSaldoMedio: obtenerSaldoMedio
        };
    }());
