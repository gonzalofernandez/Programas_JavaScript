<?php
    $key = $_GET["key"];
    $libros = "";
    $conexion = mysqli_connect(
        "mysql.hostinger.es",
        "u179580594_tiend",
        "Gon\$alo2017",
        "u179580594_books"
    );
    if ($conexion->connect_errno) {
        echo "Falló la conexión con MySQL: (" . $conexion->connect_errno . ") " .
            $conexion->connect_error;
    } else {
        $query = mysqli_query(
            $conexion,
            "SELECT * FROM stock_libros WHERE titulo LIKE '%".$key."%'"
        );
        while ($row = $query->fetch_assoc()) {
            echo "<tr>".
                "<td data-sinopsis=\"{$row['sinopsis']}\" class=\"sinopsis\" width=\"50%\">{$row['titulo']}</td>".
                "<td width=\"50%\"><a href=\"producto{$row['id']}.html\">".
                    "<img src=\"{$row['foto_libro']}\" alt=\"Imagen libro\"".
                    " width=\"20em\"></a></td></tr>";
        }
        mysqli_close($conexion);
    }
?>
