<?php

//Datos de la bd
$host = "localhost";       // o 127.0.0.1
$usuario = "root";         // tu usuario de MySQL
$contrasena = "";          // tu contraseña (por defecto en XAMPP es vacío)
$base_de_datos = "mi_basedatos";  // nombre de tu base de datos

//Almacenar variables para conexión a mysql
$conexion = new mysqli($host,$usuario,$contrasena,$base_de_datos);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$conexion->set_charset("utf8");
?>
