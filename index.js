const input = document.querySelector("#input");
const informacion = document.querySelector("#paises-container");
const container = document.querySelector("#main-container");
const loading = document.querySelector(".centrado");
let countries = [];


const getIp = async () => {
    try {
        const response = await (await fetch(`https://restcountries.com/v3.1/all`)).json();
        countries = response;
    } catch (error) {
        alert('error')
    }
} 
getIp().then(() => {
    document.querySelector('.main-container').classList.remove("hidden");
    loading.classList.add("hidden");
  });

const getWeather = async (lat, lon) => {
        informacion.innerHTML = `
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        `
    try {
        const weatherResponse = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=75ef195357bb4c86442cecf9f177705d&units=metric`)).json();
        const clima = weatherResponse.weather[0].description;
        const temperatura = weatherResponse.main.temp;
        const iconClima = weatherResponse.weather[0].icon;
        // console.log(clima);
        return {clima,temperatura,iconClima}
    } catch (error) {
        alert('error')
    }
}

input.addEventListener("input",async e =>{
    e.preventDefault();
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().startsWith(input.value.toLowerCase()));
    informacion.innerHTML = '';
    // console.log(filteredCountries);
    if (filteredCountries.length > 10 && filteredCountries.length < 200) {
        informacion.innerHTML =  `<h3>Debes ser mas especifico</h3> `
    }
    if (filteredCountries.length < 10) {
        filteredCountries.forEach(index => {
            informacion.innerHTML +=
            `
            <div class="paises-info10">
            <img class = "pais-img" src="${index.flags.svg}" alt="">
            <h3 class="name-country10">${index.name.common}</h3>
            </div>
            `
        });
    }
    if (filteredCountries.length === 1) {
        const lat = filteredCountries[0].latlng[0];  
        const lon = filteredCountries[0].latlng[1];
        const ambiente = await getWeather(lat,lon);
        // console.log(ambiente);
        informacion.innerHTML =  `
        <div class="paises-info">
        <img class = "pais-img" src="${filteredCountries[0].flags.svg}" alt="">
        <h3 id="tittle">${filteredCountries[0].name.common}</h3>
                <div class="informacion">
                <p><span>Poblacion:</span> ${filteredCountries[0].population}</p>
                <p><span>Capital:</span> ${filteredCountries[0].capital}</p>
                <p><span>Region:</span> ${filteredCountries[0].region}</p>
                <p><span>Temperatura:</span> ${ambiente.temperatura} <span>°C</span></p>
                <p><span>Clima:</span> ${ambiente.clima}</p>
                <img class="icon-weather" src="https://openweathermap.org/img/wn/${ambiente.iconClima}@2x.png" alt="">
                </div>
            </div>
            `
        }
});