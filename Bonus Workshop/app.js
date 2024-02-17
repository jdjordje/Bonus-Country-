// CountrySearch 🌍🌎🌏
// CountrySearch is an application that is meant to search for countries and get data for them in real-time. The application is very simple. It only has one functionality: Search and show the countries in cards

// Requirements
// There should be one search input to input the name or partial name of a country
// There should be a button for search to initiate
// When the button is clicked, show countries in cards with the info below
// The card shows:
// Flag (photo of the flag)
// Name
// Population
// Capital
// Area
// If there are no results found show a "Country Not Found" message on the screen
// The API for countries is: https://restcountries.com/
// Read the API documentation to figure out how to call for the countries
const inputForm = document.querySelector(`.inputForm`);
const searchInput = document.querySelector(`#search`);
const submit = document.querySelector(`#submit`);
const display = document.querySelector(`#display`);

const urlByName = "https://restcountries.com/v3.1/name/";
const urlAll = "https://restcountries.com/v3.1/all";
const fetchData = async url => {
  try {
    const res = await fetch(url);

    if (res.status === 404) {
      throw "Country Not Found";
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const fetchBySearch = async input => {
  if (input) {
    return fetchData(`${urlByName}${input}`);
  } else {
    return fetchData(urlAll);
  }
};

const renderData = dataB => {
  console.log(dataB);
  display.innerHTML = "";
  let displayData = "";
  dataB.forEach(country => {
    displayData += `<div class="card">
    <div class="flag">
      <img src="${country.flags.png}" alt="" width="100" />
    </div>
    <ul>
      <li>Name:${country.name.common}</li>
      <li>Population:${country.population}</li>
      <li>Capital:${country.capital}</li>
      <li>Area:${country.area}</li>
      <li></li>
    </ul>
  </div>`;
  });
  display.innerHTML = displayData;
};

inputForm.addEventListener(`submit`, async event => {
  const inputValue = searchInput.value;

  event.preventDefault();

  try {
    const data = await fetchBySearch(inputValue);
    renderData(data);
  } catch (error) {
    display.innerHTML = "";
    display.innerText = "Country not found";
  }
});
