

class Forcast {
  constructor() {
    // this.key = 'vAIeRZeALs5HJEcJGh7xNhkZ6jXzgz0o';
    this.key = '8BKokUBmTayMnmf1ck5TrBDGBHaTO2d0';
    this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
    this.forcastURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
  }

  async dailyForcast(cityID) {
    const query = `${cityID}?&apikey=${this.key}&details=true&metric=true`;
    const response = await fetch(this.forcastURL + query);
    const data = await response.json();
    // console.log(data)

    return data;
  }

  async updateCity(city) {
    const cityInfo = await this.getCity(city);
    const weather = await this.getWeather(cityInfo.Key);
    const dailyForcast = await this.dailyForcast(cityInfo.Key)
    // console.log(cityInfo, weather, dailyForcast)
    return { cityInfo, weather, dailyForcast };
  }

  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURL + query);
    const data = await response.json();
    // console.log(data[0])
    return data[0];
  }

  async getWeather(cityID) {
    const query = `${cityID}?&apikey=${this.key}&details=true&metric=true`;
    const response = await fetch(this.weatherURL + query);
    const data = await response.json();
    // console.log(data[0])

    return data[0];
  }
}
