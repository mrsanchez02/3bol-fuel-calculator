const solicitado_capitan = document.getElementById('solicitado_capitan');
const contenido_avion = document.getElementById('contenido_avion');

const btnCalcular = document.getElementById('btnCalcular');
const cleanHistorial = document.getElementById('cleanHistorial')

const resultado = document.getElementById('resultado');
const historico = document.getElementById('historico')
const historial = document.getElementById('historial')

let operaciones = [];
const display = JSON.parse(localStorage.getItem('db_operaciones'))
operaciones = display;

class AirpcraftFuel {
    constructor(fuelToPlane,fuelToWings){
        this.fuelToPlane = fuelToPlane
        this.fuelToWings = fuelToWings
    }
}

const mostrarHistorico = () => {
    historico.innerHTML=''
    operaciones.map( (element,index) => {
        historico.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-start bg-transparent text-light border-light">
            <div class="ms-2 me-auto">
                <div class="fw-bold">${element.fuelToPlane}</div>
                ${element.fuelToWings}
            </div>
        </li>
    ` 
    });
}

if(!operaciones){
    historial.style='display:none'
    operaciones = [];
    mostrarHistorico();
}else{
    historial.style='display:block'
    mostrarHistorico();
}

formulario.addEventListener('submit', e => {
    e.preventDefault();
    const solicitado = solicitado_capitan.value;
    const contenido = contenido_avion.value;
    const diferencia = solicitado-contenido;

    const calculoCombustible = diferencia / 6.7;
    const combustibleCadaAla = calculoCombustible/2

    operaciones.push( new AirpcraftFuel(Number.parseFloat(calculoCombustible).toFixed(2), Number.parseFloat(combustibleCadaAla).toFixed(2)) )

    resultado.innerHTML=`
    <p class="lead text-success">
        Combustible a depositar directo al Avión:
        <span class="text-danger fw-bold">${Number.parseFloat(calculoCombustible).toFixed(2)}gl.</span>
    </p>
    <p class="lead text-success">
        Combustible a depositar en cada ala: 
        <span class="text-danger fw-bold">${Number.parseFloat(combustibleCadaAla).toFixed(2)}gl.</span>
    </p>
    `
    solicitado_capitan.value=''
    contenido_avion.value=''
    
    localStorage.setItem('db_operaciones',JSON.stringify(operaciones));
    mostrarHistorico();
})

cleanHistorial.addEventListener('click',()=>{
    localStorage.clear();
    historico.innerHTML='';
    historial.style='display:none';
})