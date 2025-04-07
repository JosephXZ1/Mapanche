<?php
//Añadir la conexión a la base de datos
include("conexion.php");

$query = "SELECT * FROM panes";
$resultado = $conexion->query($query);

while ($fila = $resultado->fetch_assoc())
{
    echo $fila["nombre"] . " - $" . $fila["precio"] . "<br>";
}

?>