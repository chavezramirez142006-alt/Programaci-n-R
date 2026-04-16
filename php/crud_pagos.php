<?php
header('Content-Type: application/json');

$pdo = new PDO("mysql:host=localhost;dbname=MATRICULA;charset=utf8","root","");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$op = $_POST['opcion'] ?? '';


// ================= INSERTAR =================
if($op == 1){

    $pdo->prepare("INSERT INTO PAGOS (ID_ALUMNO, MONTO, METODO, ESTADO)
    VALUES (?,?,?,?)")
    ->execute([
        $_POST['id_alumno'],
        $_POST['monto'],
        $_POST['metodo'],
        $_POST['estado']
    ]);

    echo json_encode(["exito"=>true]);
}


// ================= ACTUALIZAR =================
if($op == 2){

    $pdo->prepare("UPDATE PAGOS SET
    ID_ALUMNO=?, MONTO=?, METODO=?, ESTADO=?
    WHERE ID_PAGO=?")
    ->execute([
        $_POST['id_alumno'],
        $_POST['monto'],
        $_POST['metodo'],
        $_POST['estado'],
        $_POST['id']
    ]);

    echo json_encode(["exito"=>true]);
}


// ================= ELIMINAR =================
if($op == 3){

    $pdo->prepare("DELETE FROM PAGOS WHERE ID_PAGO=?")
    ->execute([$_POST['id']]);

    echo json_encode(["exito"=>true]);
}


// ================= LISTAR =================
if($op == 4){

    echo json_encode(
        $pdo->query("
            SELECT P.*, A.NOMBRES, A.APELLIDOS
            FROM PAGOS P
            INNER JOIN ALUMNO A ON A.ID_ALUMNO = P.ID_ALUMNO
            ORDER BY P.ID_PAGO DESC
        ")->fetchAll(PDO::FETCH_ASSOC)
    );
}


// ================= OBTENER 1 =================
if($op == 5){

    $stmt = $pdo->prepare("SELECT * FROM PAGOS WHERE ID_PAGO=?");
    $stmt->execute([$_POST['id']]);

    echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
}
?>