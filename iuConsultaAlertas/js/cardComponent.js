const cardComponent = data  => {
    return `

            <div class="card bg-secondary" style="width: 95rem; margin-block-end: 15px;">
                <div class="card-header">
                    <h5>${data.title}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${getZonas(data.zones)}</li>
                    <li class="list-group-item">${data.date} ${data.hour}</li>
                    <li class="list-group-item"> ${data.description}</li>
                </ul>
            </div>

    `
}

function getZonas(zonas){
    let zonasString = ''
    zonas = Object.values(zonas)
    for (let i = 0; i < zonas.length; i++) {
        if(i == zonas.length - 1){
            zonasString += zonas[i]
        }else{
            zonasString += zonas[i] + ', '
        }
    }
    return zonasString
}