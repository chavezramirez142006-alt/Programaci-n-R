<?php
require "conexion.php";

$opcion = $_POST['opcion'] ?? '';

switch($opcion){

    // ================= INSERTAR =================
    case 1:

        $codigo = $_POST['codigo'];
        $nombre = $_POST['nombre'];
        $credito = $_POST['credito'];
        $estado = $_POST['estado'];
        $id_aula = $_POST['id_aula'];

        $sql = "INSERT INTO CURSOS 
        (CODIGO_CURSO, NOM_CURSO, CREDITO, ESTADO, ID_AULA)
        VALUES ('$codigo','$nombre','$credito','$estado','$id_aula')";

        $res = mysqli_query($conexion, $sql);

        echo json_encode(["ok"=>$res]);
    break;


    // ================= ELIMINAR =================
    case 3:

        $id = $_POST['id'];

        $sql = "DELETE FROM CURSOS WHERE ID_CURSO='$id'";
        mysqli_query($conexion, $sql);

        echo json_encode(["ok"=>true]);
    break;


    // ================= LISTAR =================
    case 4:

        $sql = "SELECT * FROM CURSOS";
        $res = mysqli_query($conexion, $sql);

        $data = [];

        while($row = mysqli_fetch_assoc($res)){
            $data[] = $row;
        }

        echo json_encode($data);
    break;


    // ================= OBTENER UNO =================
    case 5:

        $id = $_POST['id'];

        $sql = "SELECT * FROM CURSOS WHERE ID_CURSO='$id'";
        $res = mysqli_query($conexion, $sql);

        echo json_encode(mysqli_fetch_assoc($res));
    break;


    // ================= ACTUALIZAR =================
    case 2:

        $id = $_POST['id'];

        $codigo = $_POST['codigo'];
        $nombre = $_POST['nombre'];
        $credito = $_POST['credito'];
        $estado = $_POST['estado'];
        $id_aula = $_POST['id_aula'];

        $sql = "UPDATE CURSOS SET
        CODIGO_CURSO='$codigo',
        NOM_CURSO='$nombre',
        CREDITO='$credito',
        ESTADO='$estado',
        ID_AULA='$id_aula'
        WHERE ID_CURSO='$id'";

        $res = mysqli_query($conexion, $sql);

        echo json_encode(["ok"=>$res]);
    break;

}