// ================= VARIABLES =================
let chartGenero = null;
let chartNiveles = null;

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
});

$('#btnConfig').click(()=>{
    $('#moduloDashboard').hide();
    $('#moduloEstudiantes').hide();
    $('#seccionConfig').show();
    $('#seccionAlumnos,#seccionCursos,#seccionAulas,#seccionMatriculas,#seccionPagos').hide();
    setActiveMenu('#btnConfig');
    cargarConfigAulas();
});


// ================= MODALES =================
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
$('#formAlumno').submit(function(e){
    e.preventDefault();

    let data = $(this).serializeArray();
    data.push({name:"opcion", value: modoAlumno});
    if(modoAlumno==2) data.push({name:"id", value:idAlumnoEdit});

    $.post("php/crud_alumnos.php", $.param(data), function(){
        $('#modalAlumno').fadeOut();
        cargarAlumnos();
        cargarMatriculas();
    },"json");
});

$('#formCurso').submit(function(e){
    e.preventDefault();

    let data = $(this).serializeArray();
    data.push({name:"opcion", value: modoCurso});
    if(modoCurso==2) data.push({name:"id", value:idCursoEdit});

    $.post("php/crud_cursos.php", $.param(data), function(){
        $('#modalCurso').fadeOut();
        cargarCursos();
    },"json");
});

$('#formAula').submit(function(e){
    e.preventDefault();

    let data = $(this).serializeArray();
    data.push({name:"opcion", value: modoAula});
    if(modoAula==2) data.push({name:"id", value:idAulaEdit});

    $.post("php/crud_aulas.php", $.param(data), function(){
        $('#modalAula').fadeOut();
        cargarAulas();
        cargarConfigAulas();
        cargarDatosDashboard();
    },"json");
});


// ================= LISTAR =================
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
                    <i class="fa-solid fa-pen editarAlumno"></i>
                    <i class="fa-solid fa-trash eliminarAlumno"></i>
                </td>
            </tr>`;
        });

        $("#tablaAlumnos").html(html);

    },"json");
}


// MATRÍCULAS
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


// CURSOS
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


// AULAS
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


// CONFIG
function cargarConfigAulas(){
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
                    <i class="fa-solid fa-pen editarAula"></i>
                </td>
            </tr>`;
        });

        $("#tablaConfigAulas").html(html);

    },"json");
}


// ================= ELIMINAR =================
$(document).on("click",".eliminarAlumno",function(){
    let id=$(this).closest("tr").find("td:eq(0)").text();
    $.post("php/crud_alumnos.php",{opcion:3,id_alumno:id},()=>cargarAlumnos());
});

$(document).on("click",".eliminarCurso",function(){
    let id=$(this).closest("tr").find("td:eq(0)").text();
    $.post("php/crud_cursos.php",{opcion:3,id:id},()=>cargarCursos());
});

$(document).on("click",".eliminarAula",function(){
    let id=$(this).closest("tr").find("td:eq(0)").text();
    $.post("php/crud_aulas.php",{opcion:3,id:id},()=>{
        cargarAulas();
        cargarConfigAulas();
        cargarDatosDashboard();
    });
});


// ================= EDITAR =================

// ESTE ERA EL QUE FALTABA
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
    let id=$(this).closest("tr").find("td:eq(0)").text();

    $.post("php/crud_cursos.php",{opcion:5,id:id},function(c){
        $("input[name='codigo']").val(c.CODIGO_CURSO);
        $("input[name='nombre']").val(c.NOM_CURSO);
        $("input[name='credito']").val(c.CREDITO);
        $("select[name='estado']").val(c.ESTADO);

        modoCurso=2;
        idCursoEdit=id;

        $('#modalCurso').fadeIn();
    },"json");
});

$(document).on("click",".editarAula",function(){
    let id=$(this).closest("tr").find("td:eq(0)").text();

    $.post("php/crud_aulas.php",{opcion:5,id:id},function(a){
        $("input[name='nivel']").val(a.NIVEL);
        $("input[name='grado']").val(a.GRADO);
        $("input[name='seccion']").val(a.SECCION);
        $("input[name='total']").val(a.VACANTES_TOTALES);
        $("input[name='disponible']").val(a.VACANTES_DISPONIBLES);

        modoAula=2;
        idAulaEdit=id;

        $('#modalAula').fadeIn();
    },"json");
});


// ================= DASHBOARD =================
function cargarDatosDashboard(){

    $.get("php/dashboard_datos.php", function(res){

        if(!res.exito) return;

        let datos = res.datos;

        $("#kpiTotalAlumnos").text(datos.kpis.totalAlumnos);
        $("#kpiTotalAulas").text(datos.kpis.totalAulas);
        $("#kpiVacantesDisp").text(datos.kpis.vacantesDisp);

        let labelsG=[], dataG=[];
        datos.graficos.genero.forEach(g=>{
            labelsG.push(g.GENERO === 'M' ? 'Masculino' : 'Femenino');
            dataG.push(g.cantidad);
        });

        dibujarGraficoGenero(labelsG,dataG);

        let labelsN=[], tot=[], disp=[];
        datos.graficos.niveles.forEach(n=>{
            labelsN.push(n.NIVEL);
            tot.push(n.totales);
            disp.push(n.disponibles);
        });

        dibujarGraficoNiveles(labelsN,tot,disp);

    },"json");
}


// ================= GRAFICOS =================
function dibujarGraficoGenero(etiquetas, datos){

    let ctx=document.getElementById('graficoGenero').getContext('2d');
    if(chartGenero) chartGenero.destroy();

    chartGenero=new Chart(ctx,{
        type:'doughnut',
        data:{ labels:etiquetas, datasets:[{ data:datos }] },
        options:{ responsive:true, maintainAspectRatio:false }
    });
}

function dibujarGraficoNiveles(etiquetas,totales,disponibles){

    let ctx=document.getElementById('graficoNiveles').getContext('2d');
    if(chartNiveles) chartNiveles.destroy();

    chartNiveles=new Chart(ctx,{
        type:'bar',
        data:{
            labels:etiquetas,
            datasets:[
                {label:'Totales',data:totales},
                {label:'Disponibles',data:disponibles}
            ]
        },
        options:{ responsive:true, maintainAspectRatio:false }
    });
}


// ================= INICIO =================
cargarAlumnos();

});