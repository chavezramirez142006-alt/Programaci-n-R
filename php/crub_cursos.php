<?php
header('Content-Type: application/json');

$pdo = new PDO("mysql:host=localhost;dbname=MATRICULA;charset=utf8","root","");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$op = $_POST['opcion'] ?? '';

if($op == 1){

$pdo->prepare("INSERT INTO CURSOS (CODIGO_CURSO,NOM_CURSO,CREDITO,ESTADO,ID_AULA)
VALUES (?,?,?,?,?)")
->execute([
$_POST['codigo'],$_POST['nombre'],$_POST['credito'],
$_POST['estado'],$_POST['id_aula']
]);

echo json_encode(["exito"=>true]);
}

if($op == 2){

$pdo->prepare("UPDATE CURSOS SET
CODIGO_CURSO=?,NOM_CURSO=?,CREDITO=?,ESTADO=?,ID_AULA=?
WHERE ID_CURSO=?")
->execute([
$_POST['codigo'],$_POST['nombre'],$_POST['credito'],
$_POST['estado'],$_POST['id_aula'],$_POST['id']
]);

echo json_encode(["exito"=>true]);
}

if($op == 3){

$pdo->prepare("DELETE FROM CURSOS WHERE ID_CURSO=?")
->execute([$_POST['id']]);

echo json_encode(["exito"=>true]);
}

if($op == 4){

echo json_encode(
$pdo->query("SELECT * FROM CURSOS ORDER BY ID_CURSO DESC")
->fetchAll(PDO::FETCH_ASSOC)
);
}

if($op == 5){

$stmt = $pdo->prepare("SELECT * FROM CURSOS WHERE ID_CURSO=?");
$stmt->execute([$_POST['id']]);

echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
}
?>