function getWeatherData() {
      // Retrieve the API key entered by the user
      const apiKeyInput = document.getElementById("API_Key");
      const apiKey = apiKeyInput.value;
      // Check if the user's browser supports geolocation
      if (navigator.geolocation) {
        // Call the getCurrentPosition method with two arguments if geolocation is supported 
        navigator.geolocation.getCurrentPosition(showWeatherData, handleGeolocationError);
      } else {
        // Handle if geolocation is not supported
        console.log("Geolocation is not supported by this browser.");
      }
    
      function showWeatherData(position) {
        // Extract the latitude and longitude from the current user position 
        const { latitude, longitude } = position.coords;
        // Fetch weather data from the OpenWeatherMap API
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
          // Convert response to JSON
          .then(res => res.json())
          .then(({ list }) => {
            console.log(list);
            const cardHtml = list
            // Filter the list array to get only specified indexes
              .filter((_, index) => [0, 1, 2, 6, 14, 22, 30].includes(index))
              // Extract properties to create HTML string for each item 
              .map(({ dt_txt, main: { temp }, weather: [{ main }] }) => `
                <div class='card'>
                  <h2>Date: ${dt_txt}</h2>
                  <p>Temp: ${temp}℃ Weather: ${main}</p>
                </div>
              `)
              // Join all HTML strings into single HTML string
              .join("");
            // Set innerHTML of "resultDiv" to value of single HTML string
            document.getElementById("resultDiv").innerHTML = cardHtml;
          });
      }
      // Handle any geolocation issues 
      function handleGeolocationError(error) {
        console.error(`Geolocation error occurred. Error code: ${error.code}. Error message: ${error.message}.`);
      }
    }