var resultado,
    numero1,
    numero2,
    peticion1 = "Escribe un numero: ",
    peticion2 = "Escribe otro numero: ";
numero1 = window.prompt(peticion1);
numero2 = window.prompt(peticion2);
resultado = (+numero1) + (+numero2);
window.alert("La suma de los dos numeros es: " + resultado);
