
var ENVIRONMENTS = [
    'Contact',
    'Egypt',
    'Checkerboard',
    'Forest',
    'Goaland',
    'Yavapai',
    'Goldmine',
    'Threetowers',
    'Poison',
    'Arches',
    'Tron',
    'Japan',
    'Dream',
    'Volcano',
    'Starry', 
    'Osiris'  
  ];
  
  // aframe-state-component definition.
  AFRAME.registerState({
    // Initial state of our application. We have the current environment and the active menu.
    initialState: {
      environment: 'starry',
      environmentOptions: [],
      environmentNumPages: Math.floor(ENVIRONMENTS.length / 4),
      environmentPage: 0,
      environmentSeed: 123,
      menu: 'main',
      weatherActiveIndex: 0,
      weatherData: {
        name: '',
        temperature: 0,
        weather: [{
          main: '',
          icon: ''
        }]
      },
      weatherResults: []
    },
  
    // State changes are done via events and are handled here.
    handlers: {
      environmentPageNext: function (state) {
        if (state.environmentPage >= state.environmentNumPages - 1) { return; }
        state.environmentPage++;
      },
      
      environmentPagePrev: function (state) {
        if (state.environmentPage === 0) { return; }
        state.environmentPage--;  
      },
      
      // Emitted by randomize menu button.
      environmentRandomize: function (state) {
        state.environmentSeed = parseInt(Math.random() * 1000);
      },
  
      // This is emitted by the environment-changer component.
      // The environment to change to is passed by the event detail.
      environmentSet: function (state, environment) {
        state.environment = environment;
  
        // Change back to main menu after environment set just back changing this state variable!
        state.menu = 'main';
      },
  
      menuBack: function (state) {
       state.menu = 'main';  
      },
  
      // This is emitted and proxied from the main menu "Change Environment" button.
      // Once the state is changed, the application will react via the `bind`s, swapping the active menu, and toggling buttons.
      menuEnvironment: function (state) {
        state.menu = 'environment';  
      },
  
      menuWeather: function (state) {
        state.menu = 'weather';  
      },
  
      // From weather-fetcher component.
      weatherResults: function (state, weatherResults) {
        state.weatherResults = weatherResults;  
      },
  
      weatherPageNext: function (state) {
        if (!state.weatherResults.length) { return; }
        if (state.weatherActiveIndex < state.weatherResults.length - 1) {
          state.weatherActiveIndex++;  
        } else {
          state.weatherActiveIndex = 0;  
        }
      },
  
      weatherPagePrev: function (state) {
        if (!state.weatherResults.length) { return; }
        if (state.weatherActiveIndex > 0) {
          state.weatherActiveIndex--;  
        } else {
          state.weatherActiveIndex = state.weatherResults.length - 1;  
        }
      }
    },
  
    computeState: function (state) {
      // Format the weather API data structure and values a little bit.
      if (state.weatherResults[state.weatherActiveIndex]) {
        state.weatherData = state.weatherResults[state.weatherActiveIndex];
        state.weatherData.icon = `https://cors-anywhere.herokuapp.com/https://openweathermap.org/img/w/${state.weatherData.weather[0].icon}.png`;
        state.weatherData.temperature = (parseFloat(state.weatherData.main.temp) - 273.15).toFixed(0);
      }
      
      state.environmentOptions.length = 0;
      for (let i = state.environmentPage * 4; i < state.environmentPage * 4 + 4; i++) {
        state.environmentOptions.push(ENVIRONMENTS[i]);
      }
    }
  });