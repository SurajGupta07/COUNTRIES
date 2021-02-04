const countriesContainer = document.querySelector('.countries')
const text = prompt("Enter country name")


const renderCountry = function (data, className = '') {
    const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+(data.population) / 10000000).toFixed()}M  </p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `
    countriesContainer.insertAdjacentHTML('beforeend', html)
    countriesContainer.style.opacity = 1;
}

const getCountryAndNeighbour = function (country) {
    //AJAX CALL
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`)
    request.send();
    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText)
        console.log(data)

        //Render contry one
        renderCountry(data);

        //Render Neighbour country
        const [neighbourData] = data.borders;

        if (!neighbourData) return;

        //AJAX call for neighbour country
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbourData}`)
        request2.send();

        request2.addEventListener('load', function () {
            const data2 = JSON.parse(this.responseText)
            console.log(data2)

            renderCountry(data2, 'neighbour')
        })
    })
}
console.log(text)
getCountryAndNeighbour(text)