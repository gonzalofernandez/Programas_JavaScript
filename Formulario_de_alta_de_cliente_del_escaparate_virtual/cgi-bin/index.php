<?php
//TO_DO
//cookie no valida sin notificacion y sin id para cada sesion, revisar sus valores tambien
//completamente operativa en remoto
//crear una respuesta para el usuario
//DEFINICIÓN DE CONSTANTES
define(NO_APARECE, "No se indica");
define(SOLICITADA, "Solicitada");
define(NO_SOLICITADA, "No solicitada");
define(VACIO, "ninguno");


//DEFINICIÓN DE VARIABLES
//Establece la cookie en el navegador del usuario para futuras sesiones
$cookie = setcookie("registro_tienda_de_libros", "Texto de la cookie", time()+3600);
//Recoge los datos del formulario almacenados en la variable global $_POST
$datos = $_POST['datos'];
//Se guardan los campos del formulario en variables para su posterior uso
//Campos obligatorios
$nombreYApellido = htmlspecialchars($datos['nombre_apellido']);
$correoElectronico = htmlspecialchars($datos['correo_electronico']);
$clave = htmlspecialchars($datos['clave']);
$claveConfirmada = htmlspecialchars($datos['clave_confirmada']);
//Campos opcionales, se establece un valor predefinido si están vacios
$genero = isset($datos['genero']) && $datos['genero'] !== VACIO
    ? htmlspecialchars($datos['genero'])
    : NO_APARECE;
$fechaNacimiento = isset($datos['fecha_nacimiento'])
    ? htmlspecialchars($datos['fecha_nacimiento'])
    : NO_APARECE;
$direccion = isset($datos['direccion'])
    ? htmlspecialchars($datos['direccion'])
    : NO_APARECE;
$pais = isset($datos['pais']) && $datos['genero'] !== VACIO
    ? htmlspecialchars($datos['pais'])
    : NO_APARECE;
$novedades = isset($datos['novedades'])
    ? SOLICITADA
    : NO_SOLICITADA;
$revista = isset($datos['revista'])
    ? SOLICITADA
    : NO_SOLICITADA;
//Se obtiene la marca de tiempo Unix del objeto global Fecha
$fecha = new DateTime();
$id = $fecha->getTimestamp();
//Se crea el nombre del archivo de texto
$nombreArchivo = $id."_".$nombreYApellido.".txt";
//Se crea el contenido del archivo de texto
$contenido = "".
    "Nombre: ".$nombreYApellido."".
    "Correo electrónico: ".$correoElectronico."".
    "Clave: ".$clave."".
    "Confirmación clave: ".$claveConfirmada."".
    "Genero: ".$genero."".
    "Fecha nacimiento: ".$fechaNacimiento."".
    "Dirección: ".$direccion."".
    "País: ".$pais."".
    "Novedades: ".$novedades."".
    "Revista: ".$revista."";
//Se crea el archivo de texto dónde se escriben los datos del formulario
$archivo = fopen("$nombreArchivo", "w");
//Se asigna el contenido del archivo de texto
fwrite($archivo, $contenido);
//Se guarda el estado del archivo de texto y se cierra
fclose($archivo);
//header ('Location: html/html/index.html');
