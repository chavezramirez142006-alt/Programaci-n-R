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
            $stmt = $pdo->prepare("SELECT * FROM CURSOS WHERE ID_CURSO = :id");
            $stmt->execute(['id'=>$_GET['id']]);
            echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
        } else {
            $stmt = $pdo->query("SELECT * FROM CURSOS");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    break;

    case 'POST':
        $d = json_decode(file_get_contents("php://input"));

        $sql = "INSERT INTO CURSOS 
        (CODIGO_CURSO,NOM_CURSO,CREDITO,ESTADO,ID_AULA)
        VALUES (:cod,:nom,:cred,:est,:aula)";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            'cod'=>$d->codigo,
            'nom'=>$d->nombre,
            'cred'=>$d->credito,
            'est'=>$d->estado,
            'aula'=>$d->id_aula
        ]);

        echo json_encode(["ok"=>"Curso creado"]);
    break;

    case 'PUT':
        $d = json_decode(file_get_contents("php://input"));

        $sql = "UPDATE CURSOS SET 
        NOM_CURSO=:nom,CREDITO=:cred,ESTADO=:est,ID_AULA=:aula
        WHERE ID_CURSO=:id";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            'nom'=>$d->nombre,
            'cred'=>$d->credito,
            'est'=>$d->estado,
            'aula'=>$d->id_aula,
            'id'=>$d->id
        ]);

        echo json_encode(["ok"=>"Curso actualizado"]);
    break;

    case 'DELETE':
        $d = json_decode(file_get_contents("php://input"));

        $stmt = $pdo->prepare("DELETE FROM CURSOS WHERE ID_CURSO=:id");
        $stmt->execute(['id'=>$d->id]);

        echo json_encode(["ok"=>"Curso eliminado"]);
    break;
}