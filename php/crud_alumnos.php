<?php
header('Content-Type: application/json');

$host = "localhost";
$db = "MATRICULA";
$user = "root";
$pass = "";

$pdo = new 
PDO("mysql:host=$host; dbname=$db; charset=utf8", $user, $pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$op = $_POST['opcion'] ?? '';

/* ================= GUARDAR ================= */
if($op == 1){

$stmt = $pdo->prepare("INSERT INTO ALUMNO
(DNI_ALUMNO,NOMBRES,APELLIDOS,FECHA_NACIMIENTO,EDAD,GENERO,DIRECCION,CELULAR,CORREO,
NOMBRE_APODERADO,CELULAR_APODERADO,USERNAME,PASSWORD_HASH,ESTADO)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

$stmt->execute([
$_POST['dni'],$_POST['nombres'],$_POST['apellidos'],$_POST['fecha_nac'],
$_POST['edad'],$_POST['genero'],$_POST['direccion'],$_POST['celular'],
$_POST['correo'],$_POST['apoderado'],$_POST['cel_apoderado'],
$_POST['username'],
password_hash($_POST['password'],PASSWORD_DEFAULT),
$_POST['estado']
]);

echo json_encode(["exito"=>true]);
}

/* ================= EDITAR ================= */
if($op == 2){

$stmt = $pdo->prepare("UPDATE ALUMNO SET
DNI_ALUMNO=?,NOMBRES=?,APELLIDOS=?,FECHA_NACIMIENTO=?,EDAD=?,GENERO=?,
DIRECCION=?,CELULAR=?,CORREO=?,NOMBRE_APODERADO=?,CELULAR_APODERADO=?,
USERNAME=?,ESTADO=?
WHERE ID_ALUMNO=?");

$stmt->execute([
$_POST['dni'],$_POST['nombres'],$_POST['apellidos'],$_POST['fecha_nac'],
$_POST['edad'],$_POST['genero'],$_POST['direccion'],$_POST['celular'],
$_POST['correo'],$_POST['apoderado'],$_POST['cel_apoderado'],
$_POST['username'],$_POST['estado'],
$_POST['id']
]);

echo json_encode(["exito"=>true]);
}

/* ================= ELIMINAR ================= */
if($op == 3){

$pdo->prepare("DELETE FROM ALUMNO WHERE ID_ALUMNO=?")
->execute([$_POST['id_alumno']]);

echo json_encode(["exito"=>true]);
}

/* ================= LISTAR ================= */
if($op == 4){

echo json_encode(
$pdo->query("SELECT * FROM ALUMNO ORDER BY ID_ALUMNO DESC")
->fetchAll(PDO::FETCH_ASSOC)
);
}

/* ================= BUSCAR EDIT ================= */
if($op == 5){

$stmt = $pdo->prepare("SELECT * FROM ALUMNO WHERE ID_ALUMNO=?");
$stmt->execute([$_POST['id']]);

echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
}
?>