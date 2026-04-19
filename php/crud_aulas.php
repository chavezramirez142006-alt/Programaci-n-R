<?php
header('Content-Type: application/json');

$pdo = new PDO("mysql:host=localhost;dbname=MATRICULA;charset=utf8","root","");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$op = $_POST['opcion'] ?? '';

// INSERTAR
if($op == 1){
    $pdo->prepare("INSERT INTO AULA (NIVEL,GRADO,SECCION,VACANTES_TOTALES,VACANTES_DISPONIBLES)
    VALUES (?,?,?,?,?)")
    ->execute([
        $_POST['nivel'],
        $_POST['grado'],
        $_POST['seccion'],
        $_POST['total'],
        $_POST['disponible']
    ]);

    echo json_encode(["exito"=>true]);
}

// ACTUALIZAR
if($op == 2){
    $pdo->prepare("UPDATE AULA SET
    NIVEL=?,GRADO=?,SECCION=?,VACANTES_TOTALES=?,VACANTES_DISPONIBLES=?
    WHERE ID_AULA=?")
    ->execute([
        $_POST['nivel'],
        $_POST['grado'],
        $_POST['seccion'],
        $_POST['total'],
        $_POST['disponible'],
        $_POST['id']
    ]);

    echo json_encode(["exito"=>true]);
}

// ELIMINAR
if($op == 3){
    $pdo->prepare("DELETE FROM AULA WHERE ID_AULA=?")
    ->execute([$_POST['id']]);

    echo json_encode(["exito"=>true]);
}

// LISTAR
if($op == 4){
    $stmt = $pdo->query("SELECT * FROM AULA");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

// OBTENER UNO (EDITAR)
if($op == 5){
    $stmt = $pdo->prepare("SELECT * FROM AULA WHERE ID_AULA=?");
    $stmt->execute([$_POST['id']]);
    echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
}
?>