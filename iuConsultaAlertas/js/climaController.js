let URLAssistanceServiceApi = 'https://assistanceservices.herokuapp.com/api'
let URLGobierno = 'https://ws.smn.gob.ar/alerts/type/AL'
let URLDia = 'https://assistanceservices.herokuapp.com/api/alerts/day/'

let contenedorSelect = document.querySelector('#contenedorSelect');


async function obtenerDatosApi(){
    let datos = await fetch(URLAssistanceServiceApi).then(r => r.json())
    console.log(datos)
}


function cambiarDia(event){
    let dia = event.target.options.selectedIndex
    let posicionDiaHoy = 4
    if(dia != posicionDiaHoy){
        fetch(URLDia + dia)
        .then(x => x.json())
        .then(obj =>{
            getClimaCards(obj.alerts)
        })
    }else{
        mostrarClimaHoy()
    }  
    
}



function getClimaCards(data){
    let tmp = ''
    data.map(alerta => {
        tmp += cardComponent(alerta)
    })
    document.querySelector('#contenedorcardComponent').innerHTML = ''
    document.querySelector('#contenedorcardComponent').innerHTML = tmp
}

function mostrarClimaHoy(){
    fetch(URLGobierno)
        .then(x => x.json())
        .then(obj =>{
            getClimaCards(obj)
        })
}

mostrarClimaHoy()