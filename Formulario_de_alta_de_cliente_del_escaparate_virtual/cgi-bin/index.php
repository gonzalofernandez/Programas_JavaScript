

<?php
//TO_DO
//cookie no valida sin notificacion y sin id para cada sesion
//completamente operativa en remoto
//crear una respuesta para el usuario
    //DEFINICIÓN DE CONSTANTES
    define(NO_APARECE, "No se indica");
    define(SOLICITADA, "Solicitada");
    define(NO_SOLICITADA, "No solicitada");


    //DEFINICIÓN DE VARIABLES
    $cookie = setcookie("registro_tienda_de_libros", "Texto de la cookie", time()+3600 );
    $datos = $_POST['datos'];
    $nombreYApellido = htmlspecialchars($datos['nombre_apellido']);
    $correoElectronico = htmlspecialchars($datos['correo_electronico']);
    $clave = htmlspecialchars($datos['clave']);
    $claveConfirmada = htmlspecialchars($datos['clave_confirmada']);
    $genero = isset($datos['genero']) && $datos['genero'] !== "ninguno"
        ? htmlspecialchars($datos['genero'])
        : NO_APARECE;
    $fechaNacimiento = isset($datos['fecha_nacimiento'])
        ? htmlspecialchars($datos['fecha_nacimiento'])
        : NO_APARECE;
    $direccion = isset($datos['direccion'])
        ? htmlspecialchars($datos['direccion'])
        : NO_APARECE;
    $pais = isset($datos['pais']) && $datos['genero'] !== "ninguno"
        ? htmlspecialchars($datos['pais'])
        : NO_APARECE;
    $novedades = isset($datos['novedades'])
        ? SOLICITADA
        : NO_SOLICITADA;
    $revista = isset($datos['revista'])
        ? SOLICITADA
        : NO_SOLICITADA;
    //Obtenemos la marca de tiempo Unix
    $fecha = new DateTime();
    $id = $fecha->getTimestamp();
    //Creación del archivo que almacena los datos del formulario
    $nombreArchivo = $id."_".$nombreYApellido.".txt";
        $contenido = (
            "Nombre: $nombreYApellido\n
            Correo electrónico: $correoElectronico\n
            Clave: $clave\n
            Confirmación clave: $claveConfirmada\n
            Genero: $genero\n
            Fecha nacimiento: $fechaNacimiento\n
            Dirección: $direccion\n
            País: $pais\n
            Novedades: $novedades\n
            Revista: $revista"
        );
    //Creación del archivo de txt con la información del formulario
    $archivo = fopen("$nombreArchivo", "w");
    fwrite($archivo, $contenido);
    fclose($archivo);
    //header ('Location: html/html/index.html');
?>
