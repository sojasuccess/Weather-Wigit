const
  headerIcon = document.querySelector('.header__forcast--cloud img'),
  headerDeg = document.querySelector('.header__forcast--degree p'),
  headerCity = document.querySelector('.header-city'),
  headerContinent = document.querySelector('.header-continent'),
  headerForcast = document.querySelector('.header-forcast'),
  cityForm = document.querySelector('.search-city form'),
  headerhum = document.querySelector('.hum'),

  firstCityIcon = document.querySelector('.first-city-icon'),
  firstCityDeg = document.querySelector('.first-deg'),
  // firstCity = document.querySelector('.loc'),
  firstcityName = document.querySelector('.loc p'),
  firstcitycountry = document.querySelector('.loc span'),


  secondCityIcon = document.querySelector('.second-city-icon'),
  secondCityDeg = document.querySelector('.second-deg'),
  secondCityName = document.querySelector('.second-loc p'),
  secondCityCountry = document.querySelector('.second-loc span'),


  firstDayIcon = document.querySelector('.daily__forcast--0 img'),
  firstDayText = document.querySelector('.daily__forcast--0 p'),
  firstDayCast = document.querySelector('.weather-condition-0'),
  secondDayIcon = document.querySelector('.daily__forcast--1 img'),
  secondDayText = document.querySelector('.daily__forcast--1 p'),
  secondDay = document.querySelector('.weather-condition-1'),
  thirdDayIcon = document.querySelector('.daily__forcast--2 img'),
  thirdDayText = document.querySelector('.daily__forcast--2 p'),
  thirdDay = document.querySelector('.weather-condition-2'),


  capHum = document.querySelector('.details1 p'),
  capWind = document.querySelector('.details1 p:last-child'),
  capHum2 = document.querySelector('.details2 p'),
  capWind2 = document.querySelector('.details2 p:last-child'),

  time = document.querySelector('.time p:first-child'),
  date = document.querySelector('.time p:last-child'),



forcast = new Forcast();


cityForm.addEventListener('click', function () {
  cityForm.search.style.zIndex = '1';
});



cityForm.addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();
  const city = cityForm.city.value.trim();
  cityForm.reset();
  forcast.updateCity(city)
    .then(data => {
      updateUI(data)
    })
    .catch(err => console.log(err))
};


function updateUI(data) {
  const { cityInfo, weather, dailyForcast } = data;

  const iconSrc = `./icon/icons/${weather.WeatherIcon}.svg`;
  headerIcon.setAttribute('src', iconSrc);
  headerCity.innerHTML = `<p>${cityInfo.EnglishName}, ${cityInfo.Country.EnglishName} </p>`;
  headerContinent.innerHTML = `<p>Country in ${cityInfo.Region.EnglishName}</p>`;
  headerDeg.innerHTML = `<p>${weather.Temperature.Metric.Value}&deg;</p>`;
  headerhum.innerHTML = `<p class="hum">${weather.WeatherText}</p>`;


  const dailySrc1 = `./icon/icons/${dailyForcast.DailyForecasts[0].Day.Icon}.svg`;
  firstDayIcon.setAttribute('src', dailySrc1);
  firstDayCast.innerHTML = `<span>${dailyForcast.DailyForecasts[0].Temperature.Minimum.Value}</span> / <span>${dailyForcast.DailyForecasts[0].Temperature.Maximum.Value}</span>`;
  firstDayText.innerHTML = `${dailyForcast.DailyForecasts[0].Day.IconPhrase}`;
  

  const dailySrc2 = `/icon/icons/${dailyForcast.DailyForecasts[1].Day.Icon}.svg`;
  secondDayIcon.setAttribute('src', dailySrc2);
  secondDay.innerHTML = `<span>${dailyForcast.DailyForecasts[1].Temperature.Minimum.Value}</span> / <span>${dailyForcast.DailyForecasts[1].Temperature.Maximum.Value}</span>`;
  secondDayText.innerHTML = `${dailyForcast.DailyForecasts[1].Day.IconPhrase}`;


  const dailySrc3 = `/icon/icons/${dailyForcast.DailyForecasts[2].Day.Icon}.svg`;
  thirdDayIcon.setAttribute('src', dailySrc3);
  thirdDay.innerHTML = `<span>${dailyForcast.DailyForecasts[2].Temperature.Minimum.Value}</span> / <span>${dailyForcast.DailyForecasts[2].Temperature.Maximum.Value}</span>`;
  thirdDayText.innerHTML = `${dailyForcast.DailyForecasts[2].Day.IconPhrase}`;


}

// function updateLivecity (cap)
const capitalOne = new Forcast();
capitalOne.getCity('oslo').then((oslo) => {
  firstcityName.innerHTML = `<p>${oslo.EnglishName}</p>`;
  firstcitycountry.innerHTML = `<span> ${oslo.Country.EnglishName}</span>`;


  return oslo
}).then((oslo)=>{
  capitalOne.getWeather(oslo.Key).then((oslo)=>{
    firstCityDeg.innerHTML = `<p>${oslo.Temperature.Metric.Value}</p><span>&deg;</span>`;
    const iconSrc = `./icon/icons/${oslo.WeatherIcon}.svg`;
    firstCityIcon.setAttribute('src', iconSrc);
    // console.log(oslo);
    capHum.innerHTML = `<p>humidity ${oslo.RelativeHumidity}%</p>`;
    capWind.innerHTML = `<p> ${oslo.Wind.Speed.Metric.Value} ${oslo.Wind.Speed.Metric.Unit}</p>`;


  })
});


// secon live city (cap)
const capitalTwo = new Forcast();
capitalTwo.getCity('zurich').then((zurich) => {
  secondCityName.innerHTML = `<p>${zurich.EnglishName}</p>`;
  secondCityCountry.innerHTML = `<span> ${zurich.Country.EnglishName}</span>`;
  return zurich;
}).then((zurich)=>{
  capitalTwo.getWeather(zurich.Key).then((zurich)=> {
    secondCityDeg.innerHTML = `<p>${zurich.Temperature.Metric.Value}</p><span>&deg;</span>`;
    const iconSrc = `./icon/icons/${zurich.WeatherIcon}.svg`;
    secondCityIcon.setAttribute('src', iconSrc);
    // console.log(zurich);
    capHum2.innerHTML = `<p>humidity ${zurich.RelativeHumidity}%</p>`;
    capWind2.innerHTML = `<p> ${zurich.Wind.Speed.Metric.Value} ${zurich.Wind.Speed.Metric.Unit}</p>`;
  })
})


const clock = () => {
  const now = new Date;
  const nowHour = now.getHours();
  const nowMinutes = now.getMinutes();
  const nowSeconds = now.getSeconds();
// console.log(nowSeconds)

// get and display todays date in the UI
  const theDate = now.toDateString();
  date.innerHTML = `<span>${theDate}</span>`;
  // display the time in the UI
  time.innerHTML = `
    <span>${nowHour} :</span>
    <span>${nowMinutes} :</span>
    <span>${nowSeconds}</span>
    `;
  }
  // clock()
  setInterval(clock, 1000)