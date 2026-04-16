<?php
require 'auth.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel ABC - Matrícula OnLine</title>


    <link rel="shortcut icon" href="imgxd/pexels-dhenry-7486212 (1).jpg" type="image/x-icon">

    <link rel="stylesheet" href="../css/dashboard.css">

    <script>
        window.addEventListener('pageshow', function(event) {
        if (event.persisted || window.performance.navigation.type === 2) {
        
        window.location.reload();
        }
        });
    </script>

</head>
<body>

    <a href="logout.php" class="botonc">Cerrar Sesión</a>

</body>
</html>