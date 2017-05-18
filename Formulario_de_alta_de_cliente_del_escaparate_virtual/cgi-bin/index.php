<?php
//TO_DO
//Crear un MVC completo y asegurarnos que la cookie se queda en la sesion
//DEFINICIÓN DE CONSTANTES
define(NO_APARECE, "No se indica");
define(SOLICITADA, "Solicitada");
define(NO_SOLICITADA, "No solicitada");
define(VACIO, "ninguno");


//CONTROLADOR
if (empty($_POST)) {
    /*
     * Si no ha llegado a este script a través del formulario de index.html se
     * le redirige a la página de inicio de la aplicación
     */
    header('Location: ../html/index.html');
} else {
    //Recoge los datos del formulario almacenados en la variable global $_POST
    $datos = $_POST['datos'];
    //CAMPOS OBLIGATORIOS
    //Se guardan los campos del formulario en variables para su posterior uso
    $nombreYApellido = $datos['nombre_apellido'];
    $correoElectronico = $datos['correo_electronico'];
    $clave = $datos['clave'];
    $claveConfirmada = $datos['clave_confirmada'];
    //CAMPOS OPCIONALES
    //se establece un valor predefinido si están vacios
    $genero = $datos['genero'] !== VACIO ? $datos['genero'] : NO_APARECE;
    $fechaNacimiento = $datos['fecha_nacimiento']
            ? $datos['fecha_nacimiento']
            : NO_APARECE;
    $direccion = $datos['direccion'] ? $datos['direccion'] : NO_APARECE;
    $pais = $datos['pais'] !== VACIO ? $datos['pais'] : NO_APARECE;
    $numeroTarjeta = $datos['numero_tarjeta']
            ? $datos['numero_tarjeta']
            : NO_APARECE;
    $novedades = isset($datos['novedades']) ? SOLICITADA : NO_SOLICITADA;
    $revista = isset($datos['revista']) ? SOLICITADA : NO_SOLICITADA;
    //Se obtiene la marca de tiempo Unix del objeto global Fecha
    $fecha = new DateTime();
    $id = $fecha->getTimestamp();
    //Se crea el nombre del archivo de texto
    $nombreArchivo = $id . "_" . $nombreYApellido . ".txt";
    //Se crea el contenido del archivo de texto
    $contenido = "" .
            "Nombre: " . $nombreYApellido . "\n" .
            "Correo electrónico: " . $correoElectronico . "\n" .
            "Clave: " . $clave . "\n" .
            "Confirmación clave: " . $claveConfirmada . "\n" .
            "Genero: " . $genero . "\n" .
            "Fecha nacimiento: " . $fechaNacimiento . "\n" .
            "Dirección: " . $direccion . "\n" .
            "País: " . $pais . "\n" .
            "Novedades: " . $novedades . "\n" .
            "Revista: " . $revista . "";
    //Se crea el archivo de texto dónde se escriben los datos del formulario
    $archivo = fopen("$nombreArchivo", "w");
    //Se asigna el contenido del archivo de texto
    fwrite($archivo, $contenido);
    //Se guarda el estado del archivo de texto y se cierra
    fclose($archivo);
    //Se crea la cookie y se almacena en el navegador cliente
    setcookie("Tienda_de_Libros", $nombreYApellido, time() + 3600);
    //Se redirige la petición a la página de respuesta
    //header('Location: ../html/confirmacion_registro.html');
    include '../html/confirmacion_registro.html';
}
