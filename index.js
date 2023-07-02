const input = document.querySelector("#input");
const informacion = document.querySelector("#paises-container");
let countries = [];

const getIp = async () => {
    try {
        const response = await (await fetch(`https://restcountries.com/v3.1/all`)).json();
        countries = response;
    } catch (error) {
        alert('error')
    }
} 
getIp();
const getWeather = async () => {
    try {
        const weatherResponse =await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=75ef195357bb4c86442cecf9f177705d`)).json();
        console.log(weatherResponse);
    } catch (error) {
        alert('error')
    }
}
getWeather();

input.addEventListener("input", e =>{
    e.preventDefault();
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().startsWith(input.value.toLowerCase()));
        informacion.innerHTML = '';
        if (filteredCountries.length > 10 && filteredCountries.length < 200) {
            informacion.innerHTML =  `<h3>Debes ser mas especifico</h3> `
        }
        if (filteredCountries.length < 10) {
            filteredCountries.forEach(index => {
                informacion.innerHTML +=
                `
                <div class="paises-info">
                <img class = "pais-img" src="${index.flags.svg}" alt="">
                <h3>${index.name.common}</h3>
                </div>
                `
            });
        }
        if (filteredCountries.length === 1) {
            informacion.innerHTML =  `
            <div class="paises-info">
            <img class = "pais-img" src="${filteredCountries[0].flags.svg}" alt="">
            <h3>${filteredCountries[0].name.common}</h3>
                <div class="informacion">
                <p><span>Poblacion:</span> ${filteredCountries[0].population}</p>
                <p><span>Capital:</span> ${filteredCountries[0].capital}</p>
                <p><span>Region:</span> ${filteredCountries[0].region}</p>
                <p><span>Clima:</span> Soleado</p>
                </div>
            </div>
            `
        }
});