const form = document.getElementById('form')
const input = document.getElementById('input')
const result = document.getElementById('result')

form.addEventListener('submit', async event => {
  event.preventDefault()
  const response = await requestIP(input.value)

  printData(response)
})

async function requestIP (IP) {
  const url = `https://ip-geo-location4.p.rapidapi.com/?ip=${IP}&format=json`

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '98715c9804msh27b7e791e2e5d85p16091bjsnba36cbd2c1e4',
      'X-RapidAPI-Host': 'ip-geo-location4.p.rapidapi.com'
    }
  }

  try {
    const response = await fetch(url, options)
    const result = JSON.parse(await response.text())
    return result
  } catch (error) {
    return error
  }
}

function printData (data) {
  if (data.status === 'success') {
    result.innerHTML = `
      <div>
        <h1>Resultados para la IP: <strong>${data.ip}</strong></h1>
      </div>
      <div class="box">
        <h2>Lat: <strong>${data.location.latitude}</strong></h2>
        <h2>Lon: <strong>${data.location.longitude}</strong></h2>
      </div>
      <div>
        <h2>Continente: <strong>${data.continent.continent_name}</strong></h2>
      </div>
      <div>
        <h2>Pais: <strong>${data.country.country_name}</strong></h2>
      </div>
      <div>
        <h2>Ciudad: <strong>${data.city.name}</strong></h2>
      </div>
    `
  } else {
    result.innerHTML = `
      <div>
        <h1>No se ha podido encontrar un resultado para la IP solicitada</h1>
      </div>
    `
  }
}
