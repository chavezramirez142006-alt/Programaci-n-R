$(document).ready(function () {
  $("#loginForm").submit(function (evento) {
    evento.preventDefault();

    let usuario = $("#txtUsuario").val();
    let password = $("#txtPassword").val();

    $.ajax({
      url: "php/login.php",
      type: "POST",
      dataType: "json",
      data: {
        user: usuario,
        pass: password,
      },
      beforeSend: function () {
        Swal.fire({
          title: "Validando credenciales...",
          html: "Por favor, espere un momento.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      },
      success: function (respuesta) {
        if (respuesta.exito) {
          Swal.fire({
            icon: "success",
            title: "¡Acceso Concedido!",
            text: "Redirigiendo al sistema...",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {

            // 🔥 CAMBIO IMPORTANTE AQUÍ
            window.location.href = "php/dashboard.php";

          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Acceso Denegado",
            text: "El usuario o la contraseña son incorrectos.",
            confirmButtonColor: "#d33",
          });
        }
      },
      error: function () {
        Swal.fire({
          icon: "error",
          title: "¡Error de conexión!",
          text: "No se pudo conectar con el servidor.",
          confirmButtonColor: "#3085d6",
        });
      },
    });
  });
});