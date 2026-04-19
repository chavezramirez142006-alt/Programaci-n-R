<?php
//paso 1: vamos a crear las cabeceras http estrictas para api restful

header("Access-Control-Allow-Origin: *"); //este codigo peticiones desde cualquier origen, "*" permite cualquier origen, pero se puede especificar un dominio específico en lugar de "*"

header("Content-Type: application/json; charset=UTF-8"); // este codigo indica que la respuesta siempre sera en formato json y con el estandar utf-8: tildes y caracteres especiales

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); // este codigo indica los metodos http permitidos para esta api rest

// header("Access-Control-Allow-Headers: "); // este codigo indica los encabezados permitidos en las solicitudes a esta api rest


//paso 2: establecemos la conexion a la base de datos

$host = "localhost";
$db = "MATRICULA";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host; dbname=$db; charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // nos informa de cualquier error en la conexion a la base de datos
} catch (PDOException)  { //Si la conexion falla, la Api va a devolver un HORROR 500 (Error Interno del Servidor)
    
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión a la base de datos"]);
    exit();
}

//paso 3: Capturar el metodo HTTP

$method = $_SERVER['REQUEST_METHOD']; //captura el metodo HTTP de la solicitud (GET, POST, PUT, DELETE)


//paso 4: Creamos las peticiones con switch

switch ($method) {
    case 'GET': // Aquí va el código para manejar las solicitudes GET
        if(isset($_GET['id'])){ // Si se proporciona un ID, obtenemos un aula específico
            $sql = "SELECT * FROM AULA WHERE ID_AULA = :id";
            $stmt = $pdo->prepare($sql); 
            $stmt->execute(['id' => $_GET['id']]);
            $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        } else { // Si no se proporciona un ID, obtenemos todas las aulas
            $sql = "SELECT * FROM AULA";
            $stmt = $pdo->query($sql);
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($resultado);
        }
        break;
    case 'POST':// Aquí va el código para manejar las solicitudes POST
        $datosJSON = json_decode(file_get_contents("php://input"));

        // Validar que lleguen los datos requeridos
        if (!empty($datosJSON->nivel) && !empty($datosJSON->grado) && !empty($datosJSON->seccion)) {
            
            $sql = "INSERT INTO AULA (NIVEL, GRADO, SECCION, VACANTES_TOTALES, VACANTES_DISPONIBLES) 
                    VALUES (:nivel, :grado, :seccion, :totales, :disponibles)";
            
            $stmt = $pdo->prepare($sql);
            
            // Ejecutar con los datos del JSON
            $exito = $stmt->execute([
                'nivel' => $datosJSON->nivel,
                'grado' => $datosJSON->grado,
                'seccion' => $datosJSON->seccion,
                'totales' => $datosJSON->vacantes_totales,
                'disponibles' => $datosJSON->vacantes_disponibles
            ]);

            if ($exito) {
                http_response_code(201); // Created
                echo json_encode(["mensaje" => "Aula creada con éxito."]);
            } else {
                http_response_code(503); // Service Unavailable
                echo json_encode(["mensaje" => "No se pudo crear el aula."]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["mensaje" => "Datos incompletos. Faltan campos requeridos."]);
        }
        break;
    case 'PUT':// Aquí va el código para manejar las solicitudes PUT
        $datosJSON = json_decode(file_get_contents("php://input"));

        // Para hacer un UPDATE, necesitamos el ID obligatoriamente
        if (!empty($datosJSON->id_aula)) {
            
            $sql = "UPDATE AULA 
                    SET NIVEL = :nivel, GRADO = :grado, SECCION = :seccion, 
                        VACANTES_TOTALES = :totales, VACANTES_DISPONIBLES = :disponibles 
                    WHERE ID_AULA = :id";
            
            $stmt = $pdo->prepare($sql);
            
            $exito = $stmt->execute([
                'nivel' => $datosJSON->nivel,
                'grado' => $datosJSON->grado,
                'seccion' => $datosJSON->seccion,
                'totales' => $datosJSON->vacantes_totales,
                'disponibles' => $datosJSON->vacantes_disponibles,
                'id' => $datosJSON->id_aula
            ]);

            if ($exito) {
                http_response_code(200); // OK
                echo json_encode(["mensaje" => "Aula actualizada correctamente."]);
            } else {
                http_response_code(503);
                echo json_encode(["mensaje" => "No se pudo actualizar el aula."]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["mensaje" => "Falta el ID del aula a actualizar."]);
        }
        break;
    case 'DELETE':// Aquí va el código para manejar las solicitudes DELETE
        $datosJSON = json_decode(file_get_contents("php://input"));

        if (!empty($datosJSON->id_aula)) {
            $sql = "DELETE FROM AULA WHERE ID_AULA = :id";
            $stmt = $pdo->prepare($sql);
            $exito = $stmt->execute(['id' => $datosJSON->id_aula]);

            if ($exito) {
                http_response_code(200);
                echo json_encode(["mensaje" => "Aula eliminada correctamente."]);
            } else {
                http_response_code(503);
                echo json_encode(["mensaje" => "No se pudo eliminar el registro."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["mensaje" => "Falta el ID del aula a eliminar."]);
        }
        break;
    default:
        http_response_code(405); // Método no permitido
        echo json_encode(["error" => "Método no permitido"]);
        break;
}
?>