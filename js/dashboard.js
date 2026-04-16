// ================= VARIABLES =================
let chartGenero = null;
let chartNiveles = null;

let modoPago = 1, idPagoEdit = null;
let modoAlumno = 1, idAlumnoEdit = null;
let modoCurso = 1, idCursoEdit = null;
let modoAula = 1, idAulaEdit = null;


// ================= READY =================
$(document).ready(function(){

// ================= UTIL =================
function setActiveMenu(id){
    $('.sidebar-nav li').removeClass('active');
    $(id).parent().addClass('active');
}

function estadoClassFix(text){
    if(!text) return "";
    return text.toLowerCase().trim().replace(/\s+/g,'-');
}


// ================= NAV =================
$('#btnDashboard').click(()=>{
    $('#moduloDashboard').show();
    $('#moduloEstudiantes').hide();
    $('#seccionCursos,#seccionAulas,#seccionMatriculas,#seccionPagos,#seccionConfig').hide();
    setActiveMenu('#btnDashboard');
    cargarDatosDashboard();
});

$('#btnAlumnos').click(()=>{
    $('#moduloDashboard').hide();
    $('#moduloEstudiantes').show();
    $('#seccionAlumnos').show();
    $('#seccionCursos,#seccionAulas,#seccionMatriculas,#seccionPagos,#seccionConfig').hide();
    setActiveMenu('#btnAlumnos');
    cargarAlumnos();
});

$('#btnCursos').click(()=>{
    $('#moduloDashboard').hide();
    $('#moduloEstudiantes').hide();
    $('#seccionCursos').show();
    $('#seccionAlumnos,#seccionAulas,#seccionMatriculas,#seccionPagos,#seccionConfig').hide();
    setActiveMenu('#btnCursos');
    cargarCursos();
});

$('#btnAulas').click(()=>{
    $('#moduloDashboard').hide();
    $('#moduloEstudiantes').hide();
    $('#seccionAulas').show();
    $('#seccionAlumnos,#seccionCursos,#seccionMatriculas,#seccionPagos,#seccionConfig').hide();
    setActiveMenu('#btnAulas');
    cargarAulas();
});

$('#btnMatriculas').click(()=>{
    $('#moduloDashboard').hide();
    $('#moduloEstudiantes').hide();
    $('#seccionMatriculas').show();
    $('#seccionAlumnos,#seccionCursos,#seccionAulas,#seccionPagos,#seccionConfig').hide();
    setActiveMenu('#btnMatriculas');
    cargarMatriculas();
});

$('#btnPagos').click(()=>{
    $('#moduloDashboard').hide();
    $('#moduloEstudiantes').hide();
    $('#seccionPagos').show();
    $('#seccionAlumnos,#seccionCursos,#seccionAulas,#seccionMatriculas,#seccionConfig').hide();
    setActiveMenu('#btnPagos');
    cargarPagos(); // IMPORTANTE
});

$('#btnConfig').click(()=>{
    $('#moduloDashboard').hide();
    $('#moduloEstudiantes').hide();
    $('#seccionConfig').show();
    $('#seccionAlumnos,#seccionCursos,#seccionAulas,#seccionMatriculas,#seccionPagos').hide();
    setActiveMenu('#btnConfig');
    cargarConfigAlumnos();
});


// ================= MODALES =================
$('#btnNuevoPago').click(()=>{
    $('#modalPago').fadeIn();
    modoPago = 1;
    idPagoEdit = null;
    $('#formPago')[0].reset();
});

$('#btnNuevoAlumno').click(()=>{
    $('#modalAlumno').fadeIn();
    modoAlumno = 1;
    idAlumnoEdit = null;
    $('#formAlumno')[0].reset();
});

$('#btnNuevoCurso').click(()=>{
    $('#modalCurso').fadeIn();
    modoCurso = 1;
    idCursoEdit = null;
    $('#formCurso')[0].reset();
});

$('#btnNuevaAula').click(()=>{
    $('#modalAula').fadeIn();
    modoAula = 1;
    idAulaEdit = null;
    $('#formAula')[0].reset();
});

$('.btn-cerrar-modal').click(()=>{
    $('.modal-overlay').fadeOut();
});


// ================= GUARDAR =================
$('#formPago').submit(function(e){
    e.preventDefault();

    let data = $(this).serializeArray();
    data.push({name:"opcion", value: modoPago});
    if(modoPago==2) data.push({name:"id", value:idPagoEdit});

    $.post("php/crud_pagos.php", $.param(data), function(){
        $('#modalPago').fadeOut();
        cargarPagos();
    },"json");
});

$('#formAlumno').submit(function(e){
    e.preventDefault();

    let data = $(this).serializeArray();
    data.push({name:"opcion", value: modoAlumno});
    if(modoAlumno==2) data.push({name:"id", value:idAlumnoEdit});

    $.post("php/crud_alumnos.php", $.param(data), function(){
        $('#modalAlumno').fadeOut();
        cargarAlumnos();
        cargarMatriculas();
        cargarConfigAlumnos();
    },"json");
});

$('#formCurso').off('submit').on('submit', function(e){
    e.preventDefault();

    let data = $(this).serializeArray();

    data.push({name:"opcion", value: modoCurso});

    if(modoCurso == 2){
        data.push({name:"id", value: idCursoEdit});
    }

    $.ajax({
        url: "php/crud_cursos.php",
        type: "POST",
        data: $.param(data),
        dataType: "json",
        success: function(res){
            $('#modalCurso').fadeOut();
            cargarCursos();
        },
        error: function(xhr){
            console.error("ERROR:", xhr.responseText);
        }
    });
});

$('#formAula').submit(function(e){
    e.preventDefault();

    let data = $(this).serializeArray();
    data.push({name:"opcion", value: modoAula});
    if(modoAula==2) data.push({name:"id", value:idAulaEdit});

    $.post("php/crud_aulas.php", $.param(data), function(){
        $('#modalAula').fadeOut();
        cargarAulas();
        cargarDatosDashboard();
    },"json");
});


// ================= LISTAR =================
function cargarPagos(){
    $.post("php/crud_pagos.php",{opcion:4},function(data){

        let html="";
        data.forEach(p=>{
            html+=`
            <tr>
                <td>${p.ID_PAGO}</td>
                <td>${p.NOMBRES} ${p.APELLIDOS}</td>
                <td>${p.MONTO}</td>
                <td>${p.FECHA_PAGO}</td>
                <td>${p.METODO}</td>
                <td><span class="estado ${estadoClassFix(p.ESTADO)}">${p.ESTADO}</span></td>
                <td>
                    <i class="fa-solid fa-pen editarPago"></i>
                    <i class="fa-solid fa-trash eliminarPago"></i>
                </td>
            </tr>`;
        });

        $("#tablaPagos").html(html);

    },"json");
}

function cargarAlumnos(){
    $.post("php/crud_alumnos.php",{opcion:4},function(data){
        let html="";
        data.forEach(a=>{
            html+=`
            <tr>
                <td>${a.ID_ALUMNO}</td>
                <td>${a.NOMBRES}</td>
                <td>${a.APELLIDOS}</td>
                <td>${a.DNI_ALUMNO}</td>
                <td>${a.FECHA_NACIMIENTO}</td>
                <td>${a.CELULAR}</td>
                <td>${a.CORREO}</td>
                <td><span class="estado ${estadoClassFix(a.ESTADO)}">${a.ESTADO}</span></td>
                <td>
                    <i class="fa-solid fa-trash eliminarAlumno"></i>
                </td>
            </tr>`;
        });
        $("#tablaAlumnos").html(html);
    },"json");
}

function cargarConfigAlumnos(){
    $.post("php/crud_alumnos.php",{opcion:4},function(data){
        let html="";
        data.forEach(a=>{
            html+=`
            <tr>
                <td>${a.ID_ALUMNO}</td>
                <td>${a.NOMBRES}</td>
                <td>${a.APELLIDOS}</td>
                <td>${a.DNI_ALUMNO}</td>
                <td>${a.CELULAR}</td>
                <td>${a.CORREO}</td>
                <td>
                    <i class="fa-solid fa-pen editarAlumno"></i>
                </td>
            </tr>`;
        });
        $("#tablaConfigAlumnos").html(html);
    },"json");
}


// ================= MATRÍCULAS =================
function cargarMatriculas(){
    $.post("php/crud_alumnos.php",{opcion:4},function(data){
        let html="";
        data.forEach(a=>{
            if(a.ESTADO==="Activo"){
                html+=`
                <tr>
                    <td>${a.ID_ALUMNO}</td>
                    <td>${a.NOMBRES}</td>
                    <td>${a.APELLIDOS}</td>
                    <td>${a.DNI_ALUMNO}</td>
                    <td>${a.CELULAR}</td>
                    <td><span class="estado activo">Activo</span></td>
                </tr>`;
            }
        });
        $("#tablaMatriculas").html(html);
    },"json");
}


// ================= CURSOS =================
function cargarCursos(){
    $.post("php/crud_cursos.php",{opcion:4},function(data){
        let html="";
        data.forEach(c=>{
            html+=`
            <tr>
                <td>${c.ID_CURSO}</td>
                <td>${c.CODIGO_CURSO}</td>
                <td>${c.NOM_CURSO}</td>
                <td>${c.CREDITO}</td>
                <td><span class="estado ${estadoClassFix(c.ESTADO)}">${c.ESTADO}</span></td>
                <td>
                    <i class="fa-solid fa-pen editarCurso"></i>
                    <i class="fa-solid fa-trash eliminarCurso"></i>
                </td>
            </tr>`;
        });
        $("#tablaCursos").html(html);
    },"json");
}


// ================= AULAS =================
function cargarAulas(){
    $.post("php/crud_aulas.php",{opcion:4},function(data){
        let html="";
        data.forEach(a=>{
            html+=`
            <tr>
                <td>${a.ID_AULA}</td>
                <td>${a.NIVEL}</td>
                <td>${a.GRADO}</td>
                <td>${a.SECCION}</td>
                <td>${a.VACANTES_TOTALES}</td>
                <td>${a.VACANTES_DISPONIBLES}</td>
                <td>
                    <i class="fa-solid fa-trash eliminarAula"></i>
                </td>
            </tr>`;
        });
        $("#tablaAulas").html(html);
    },"json");
}


// ================= ELIMINAR =================
$(document).on("click",".eliminarPago",function(){
    let id=$(this).closest("tr").find("td:eq(0)").text().trim();

    $.post("php/crud_pagos.php",{opcion:3,id:id},()=>{
        cargarPagos();
    });
});

$(document).on("click",".eliminarAlumno",function(){
    let id=$(this).closest("tr").find("td:eq(0)").text().trim();
    $.post("php/crud_alumnos.php",{opcion:3,id_alumno:id},()=>{
        cargarAlumnos();
        cargarConfigAlumnos();
    });
});

$(document).on("click",".eliminarCurso",function(){
    let id=$(this).closest("tr").find("td:eq(0)").text().trim();
    $.post("php/crud_cursos.php",{opcion:3,id:id},()=>cargarCursos());
});

$(document).on("click",".eliminarAula",function(){
    let id=$(this).closest("tr").find("td:eq(0)").text().trim();
    $.post("php/crud_aulas.php",{opcion:3,id:id},()=>{
        cargarAulas();
        cargarDatosDashboard();
    });
});


// ================= EDITAR =================
$(document).on("click",".editarPago",function(){

    let id = $(this).closest("tr").find("td:eq(0)").text().trim();

    $.post("php/crud_pagos.php",{opcion:5,id:id},function(p){

        if(!p) return;

        $("input[name='id_alumno']").val(p.ID_ALUMNO);
        $("input[name='monto']").val(p.MONTO);
        $("select[name='metodo']").val(p.METODO);
        $("select[name='estado']").val(p.ESTADO);

        modoPago = 2;
        idPagoEdit = id;

        $('#modalPago').fadeIn();

    },"json");

});

$(document).on("click",".editarAlumno",function(){
    let id = $(this).closest("tr").find("td:eq(0)").text().trim();

    $.post("php/crud_alumnos.php",{opcion:5,id:id},function(a){
        if(!a) return;

        $("input[name='dni']").val(a.DNI_ALUMNO);
        $("input[name='nombres']").val(a.NOMBRES);
        $("input[name='apellidos']").val(a.APELLIDOS);
        $("input[name='fecha_nac']").val(a.FECHA_NACIMIENTO);
        $("input[name='edad']").val(a.EDAD);
        $("select[name='genero']").val(a.GENERO);
        $("select[name='estado']").val(a.ESTADO);
        $("input[name='direccion']").val(a.DIRECCION);
        $("input[name='celular']").val(a.CELULAR);
        $("input[name='correo']").val(a.CORREO);
        $("input[name='apoderado']").val(a.NOMBRE_APODERADO);
        $("input[name='cel_apoderado']").val(a.CELULAR_APODERADO);
        $("input[name='username']").val(a.USERNAME);

        modoAlumno = 2;
        idAlumnoEdit = id;

        $('#modalAlumno').fadeIn();
    },"json");
});

$(document).on("click",".editarCurso",function(){
    let id = $(this).closest("tr").find("td:eq(0)").text().trim();

    $.post("php/crud_cursos.php",{opcion:5,id:id},function(c){
        if(!c) return;

        $("input[name='codigo']").val(c.CODIGO_CURSO);
        $("input[name='nombre']").val(c.NOM_CURSO);
        $("input[name='credito']").val(c.CREDITO);
        $("select[name='estado']").val(c.ESTADO);
        $("select[name='id_aula']").val(c.ID_AULA);

        modoCurso = 2;
        idCursoEdit = id;

        $('#modalCurso').fadeIn();
    },"json");
});


// ================= DASHBOARD =================
function cargarDatosDashboard(){

    if(!document.getElementById('graficoGenero')) return;

    $.get("php/dashboard_datos.php", function(res){

        if(!res.exito) return;

        let datos = res.datos;

        $("#kpiTotalAlumnos").text(datos.kpis.totalAlumnos);
        $("#kpiTotalAulas").text(datos.kpis.totalAulas);
        $("#kpiVacantesDisp").text(datos.kpis.vacantesDisp);

        //  SOLO CAMBIO AQUÍ
        let labelsG=[], dataG=[], coloresG=[];
        datos.graficos.genero.forEach(g=>{
            labelsG.push(g.GENERO === 'M' ? 'Masculino' : 'Femenino');
            dataG.push(g.cantidad);

            // asignar color correcto SIN depender del orden
            if(g.GENERO === 'M'){
                coloresG.push('#36A2EB'); // azul
            }else{
                coloresG.push('#FF6384'); // rosado
            }
        });

        let ctx=document.getElementById('graficoGenero').getContext('2d');
        if(chartGenero) chartGenero.destroy();

        chartGenero=new Chart(ctx,{
            type:'doughnut',
            data:{
                labels:labelsG,
                datasets:[{
                    data:dataG,
                    backgroundColor: coloresG
                }]
            }
        });

        let labelsN=[], tot=[], disp=[];
        datos.graficos.niveles.forEach(n=>{
            labelsN.push(n.NIVEL);
            tot.push(n.totales);
            disp.push(n.disponibles);
        });

        let ctx2=document.getElementById('graficoNiveles').getContext('2d');
        if(chartNiveles) chartNiveles.destroy();

        chartNiveles=new Chart(ctx2,{
            type:'bar',
            data:{
                labels:labelsN,
                datasets:[
                    {label:'Totales',data:tot},
                    {label:'Disponibles',data:disp}
                ]
            }
        });

    },"json");
}


// ================= INICIO =================
cargarAlumnos();

});