<?php
    header("Access-Control-Allow-Origin: *");
    $key = $_GET["key"];
    $libro = "";
    $conexion = mysqli_connect(
        "mysql.hostinger.es",
        "u179580594_tiend",
        "Gon\$alo2017",
        "u179580594_books"
    );
    if ($conexion->connect_errno) {
        echo "Falló la conexión con MySQL: (" . $conexion->connect_errno . ") " . $conexion->connect_error;
    } else {
        $query = mysqli_query(
            $conexion,
            "SELECT * FROM 'stock_libros' WHERE 'titulo' LIKE '%$key%'"
        );
        while ($row = $query->fetch_assoc()) {
          $libro = "<p>{$row['titulo']}</p>";
        }
        echo $libro;
    }
?>
