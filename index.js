const input = document.querySelector("#input");
const informacion = document.querySelector("#paises-info");
const textoVacio = document.querySelector("#vacio");
let countries = [];
let datosPaises = "";

    const getIp = async () => {
        try {
            const response = await (await fetch(`https://restcountries.com/v3.1/all`)).json();
            countries = response;
        } catch (error) {
            alert('error')
        }
    } 
    getIp();

    getPaisesInfo = () => {
        const filteredCountries = countries.filter(country => country.name.common.toLowerCase().startsWith(input.value.toLowerCase()));
        for (let index = 0; index < filteredCountries.length; index++) {
            const countryName = filteredCountries[index].name.common;
            datosPaises = datosPaises +`
            <div id="paises-info">
            <h1>Imagen Del Pais</h1>
            <h3>${countryName}</h3>
            <div class="informacion">
            <p><span>Poblacion:</span> 928.33</p>
            <p><span>Capital:</span> Caracas</p>
            <p><span>Region:</span> America</p>
            <p><span>Clima:</span> Soleado</p>
            </div>
            </div>
            `
        }
        informacion.innerHTML = datosPaises;
    };
    
    input.addEventListener("input", e =>{
        e.preventDefault();
        getPaisesInfo();
        if (input.value === "") {
            
    }
});