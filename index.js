const key = 'm8IWvSW0XsX2hHSg5AyQUAkpFInd1xAc'; //api key

const getWeather = async(code) => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${code}?apikey=${key}`;
  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

const getCity = async(city) => {
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`;
  const response = await fetch(base + query);
  const data = await response.json();

  return (data[0]);
};

const cityForm = document.querySelector('.find-the-weather');
const details = document.querySelector('.details');

const updateUI = (data) => {

  const cityInfo = data.cityInfo;
  const weather = data.weather;

  details.innerHTML = `    
        <h4 class="city">${cityInfo.EnglishName}</h4>
        <div class="condition">${weather.WeatherText}</div>
        <div class="temperature">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>°C</span>
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
        </div>
        <div class="rain">${weather.PrecipitationType}</div>
    `;
};

const updateCity = async(city) => {
  const cityInfo = await getCity(city);
  const weather = await getWeather(cityInfo.Key);

  return {
    cityInfo,
    weather
  };
}

cityForm.addEventListener('submit', ev => {
  ev.preventDefault();

  const city = cityForm.location.value.trim();

  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
})