const form = document.querySelector('.box-form');
form.addEventListener('submit', function(event){        //Previene que se reinicie la pagina al enviar el submit
    event.preventDefault();
});

//Tomamos la fecha actual
const fechaActual = new Date();
const year = fechaActual.getFullYear();
const month = fechaActual.getMonth() + 1;
const day = fechaActual.getDate();

//validamos los numeros ingresados, si son validos se calcula sino, se da error

function validarForm(){
    var inday = parseInt(document.getElementById('inday').value);
    var inmonth = parseInt(document.getElementById('inmonth').value);
    var inyear = parseInt(document.getElementById('inyear').value);

    const outputYear = document.getElementById('year');
    const outputMonth = document.getElementById('month');
    const outputDay = document.getElementById('day');

    let validacionUno = false;
    let validacionDos = true;

    if (isNaN(inday) || isNaN(inmonth) || isNaN(inyear) ||
    inday < 1 || inday > 31 ||
    inmonth < 1 || inmonth > 12 ||
    inyear < 1900 || inyear > year) {
    console.error('Error: Ingresa fechas válidas.');
    
}else{
    console.log('valido');
    validacionUno = true;
}
if (!validarDiasFebrero(inday, inmonth, inyear)) {
    return;
}

if(validacionUno == true && validacionDos == true){
    console.log('valido todo, calcular'); 
    calcular();
}
function calcular() {

    let diferenciaDay = day - inday;
    let diferenciaMonth = month - inmonth;
    let diferenciaYear = year - inyear;


    if (diferenciaDay < 0) {
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        diferenciaDay += lastDayOfMonth;
        diferenciaMonth--;
    }

    if (diferenciaMonth < 0) {
        diferenciaMonth += 12;
        diferenciaYear--;
    }

    console.log(diferenciaDay, diferenciaMonth, diferenciaYear);
    outputDay.innerHTML = diferenciaDay + 1;
    outputMonth.innerHTML = diferenciaMonth;
    outputYear.innerHTML = diferenciaYear;

}
}

//Validamos los dias de febrero dependiendo el a;o

function esBisiesto(anio) {
    return (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);
}

function validarDiasFebrero(dia, mes, anio) {
    // Verificar si el mes es febrero
    if (mes === 2) {
        // Verificar si el año es bisiesto
        const esAnioBisiesto = esBisiesto(anio);

        // Obtener el máximo de días en febrero según si es bisiesto o no
        const maxDiasFebrero = esAnioBisiesto ? 29 : 28;

        // Validar el día en febrero
        if (dia < 1 || dia > maxDiasFebrero) {
            console.error('Error: El día ingresado no es válido para febrero en el año proporcionado.');
            validacionDos = false;
            return false;
        }
    }
    return true;
}