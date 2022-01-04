var cities = [
    'Beijing',
    'London',
    'San Francisco',
    'Los Angeles',
    'Tokyo'
  ];
  
  var API_KEY = 'b4cea493c85c158fc98b568c036159af';
  
  // Fetch weather data from openweathermap API.
  AFRAME.registerComponent('weather-fetcher', {
    init: function () {
      var requests = cities.map(city => 
        fetch(new Request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)).then(result => {
          return result.json();
        })
      );
      Promise.all(requests).then(results => {
        this.el.sceneEl.emit('weatherResults', results);
      });
    }
  });