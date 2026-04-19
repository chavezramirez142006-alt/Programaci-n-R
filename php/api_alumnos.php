<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

$host = "localhost";
$db = "MATRICULA";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException) {
    http_response_code(500);
    echo json_encode(["error" => "Error BD"]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        if(isset($_GET['id'])){
            $stmt = $pdo->prepare("SELECT * FROM ALUMNO WHERE ID_ALUMNO = :id");
            $stmt->execute(['id'=>$_GET['id']]);
            echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
        } else {
            $stmt = $pdo->query("SELECT * FROM ALUMNO");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    break;

    case 'POST':
        $d = json_decode(file_get_contents("php://input"));

        $sql = "INSERT INTO ALUMNO 
        (DNI_ALUMNO,NOMBRES,APELLIDOS,FECHA_NACIMIENTO,EDAD,GENERO,DIRECCION,CELULAR,CORREO,NOMBRE_APODERADO,CELULAR_APODERADO,USERNAME,PASSWORD_HASH,ESTADO)
        VALUES (:dni,:nom,:ape,:fec,:edad,:gen,:dir,:cel,:cor,:apo,:celapo,:user,:pass,:est)";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            'dni'=>$d->dni,
            'nom'=>$d->nombres,
            'ape'=>$d->apellidos,
            'fec'=>$d->fecha,
            'edad'=>$d->edad,
            'gen'=>$d->genero,
            'dir'=>$d->direccion,
            'cel'=>$d->celular,
            'cor'=>$d->correo,
            'apo'=>$d->apoderado,
            'celapo'=>$d->cel_apoderado,
            'user'=>$d->username,
            'pass'=>$d->password,
            'est'=>$d->estado
        ]);

        echo json_encode(["ok"=>"Alumno creado"]);
    break;

    case 'PUT':
        $d = json_decode(file_get_contents("php://input"));

        $sql = "UPDATE ALUMNO SET 
        NOMBRES=:nom,APELLIDOS=:ape,ESTADO=:est
        WHERE ID_ALUMNO=:id";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            'nom'=>$d->nombres,
            'ape'=>$d->apellidos,
            'est'=>$d->estado,
            'id'=>$d->id
        ]);

        echo json_encode(["ok"=>"Alumno actualizado"]);
    break;

    case 'DELETE':
        $d = json_decode(file_get_contents("php://input"));

        $stmt = $pdo->prepare("DELETE FROM ALUMNO WHERE ID_ALUMNO=:id");
        $stmt->execute(['id'=>$d->id]);

        echo json_encode(["ok"=>"Alumno eliminado"]);
    break;
}