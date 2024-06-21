"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
/* const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  console.log(request.responseText);

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
  })
}; */

const renderCountry = function (data) {
  const languages = data.languages;
  const language = Object.keys(languages)[0];
  console.log(language);
  const currencies = data.currencies;
  const currency = Object.keys(currencies)[0];
  console.log(currency);

  const html = `
     <article class="country">
      <img class="country__img" src="${data.flags.png}" alt=${data.flags.alt} />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[language]}</p>
        <p class="country__row"><span>💰</span>${
          data.currencies[currency].name
        }</p>
      </div>
    </article> 
    `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};

// coding challenge1
const whereAmI = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=330442670781094498659x61313`
  )
    .then(function (response) {
      if (!response.ok)
        throw new Error(`problem with geocoding ${response.status}`);
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      // console.log(data.country);
      console.log(`you are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then((data) => renderCountry(data[0]))

    .catch((err) => console.error(`${err.message}💥`));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.447);
