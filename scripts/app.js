var solicitado_capitan = document.getElementById('solicitado_capitan');
const contenido_avion = document.getElementById('contenido_avion');

const btnCalcular = document.getElementById('btnCalcular');
const cleanHistorial = document.getElementById('cleanHistorial')

const resultado = document.getElementById('resultado');
const historico = document.getElementById('historico')
const historial = document.getElementById('historial')

var operaciones = [];
const display = JSON.parse(localStorage.getItem('db_operaciones'))
operaciones = display;

const mostrarHistorico = () => {
    historico.innerHTML=''
    operaciones.map( (element,index) => {
        historico.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
                <div class="fw-bold">${element['Directo al avion']}</div>
                ${element['En cada ala']}
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

    console.log(`Combustible a depositar directo al Avión: ${calculoCombustible.toFixed()}`);
    console.log(`Combustible a depositar en cada ala: ${combustibleCadaAla.toFixed()}`);

    operaciones.push(
        {
        'Directo al avion': `${calculoCombustible}`,
        'En cada ala':`${combustibleCadaAla}`
    })

    resultado.innerHTML=`
    <p class="lead text-success">
        Combustible a depositar directo al Avión:
        <span class="text-danger fw-bold">${calculoCombustible.toFixed()}gl.</span>
    </p>
    <p class="lead text-success">
        Combustible a depositar en cada ala: 
        <span class="text-danger fw-bold">${combustibleCadaAla.toFixed()}gl.</span>
    </p>
    `
    solicitado_capitan.value=''
    contenido_avion.value=''
    
    console.log(operaciones)
    localStorage.setItem('db_operaciones',JSON.stringify(operaciones))
    mostrarHistorico();
})

cleanHistorial.addEventListener('click',()=>{
    localStorage.clear();
    historico.innerHTML='';
    historial.style='display:none'
})