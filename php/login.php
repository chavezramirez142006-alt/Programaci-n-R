<?php
session_start(); // SOLO UNA VEZ, SIEMPRE ARRIBA

header('Content-Type: application/json');

// Credenciales de la Base de Datos
$host = 'localhost';
$db   = 'matricula';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $usuarioIngresado = $_POST['user'] ?? '';
    $passwordIngresada = $_POST['pass'] ?? '';

    $sql = "SELECT id, password_hash FROM usuario WHERE username = :usuario LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':usuario', $usuarioIngresado);
    $stmt->execute();

    $usuarioFila = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuarioFila && password_verify($passwordIngresada, $usuarioFila['password_hash'])) {
        
        $_SESSION['usuario_id'] = $usuarioFila['id']; // correcto

        echo json_encode([
            "exito" => true,
            "mensaje" => "Login correcto"
        ], JSON_UNESCAPED_UNICODE);

    } else {
        echo json_encode([
            "exito" => false,
            "mensaje" => "Usuario o contraseña incorrectos."
        ], JSON_UNESCAPED_UNICODE);
    }

} catch (PDOException $e) {
    echo json_encode([
        "exito" => false,
        "mensaje" => "Error de conexión a la BD."
    ], JSON_UNESCAPED_UNICODE);
} 






//para pruebas, ignora usuario y contraseña y siempre deja entrar

/*session_start();

header('Content-Type: application/json');

//  LOGIN FORZADO TEMPORAL
// Ignora usuario y contraseña y siempre deja entrar

 $_SESSION['usuario_id'] = 1;

echo json_encode([
    "exito" => true,
    "mensaje" => "Login forzado (temporal)"
]); 

exit(); */
?>