class Fetch {
  async getCurrent(input) {
    const myKey = "f9322c26a711ec0c17687bc72a372e22";

    const response = await fetch(                                 //make request to url
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}&units=imperial` 
    );

    const data = await response.json();                          // convert data to json form

    const fiveForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${myKey}&units=imperial`
    );

    const fiveForecastData = await fiveForecast.json();
    
    var allData = [data, fiveForecastData];
    console.log(allData);
    return allData;

  }
}

class UI {
  constructor() {
    this.uiContainer = document.getElementById("content");
    //this.uiContainer2 = document.getElementById("fiveDay")
  }


//NEED TO CONVERT MAX TEMP BELOW TO C OR F
  populateUI(allData) { 
//console.log(allData[0])
console.log(allData[1])
    this.uiContainer.innerHTML = `

    <div id="content">
      <h2 id="cityName">${allData[0].name}</h2>  
      <p id="maxTemp">Temperature: ${allData[0].main.temp_max}</p>
      <p id="humidity">Humidity: ${allData[0].main.humidity}%</p>
      <p id="wind">Wind Speed: ${allData[0].wind.speed}mph</p>
    </div>`;
  var forecastArray = allData[1].list
  for(var i=0; i < forecastArray.length; i++) {
    console.log(forecastArray[i]);

  }

   // this.uiContainer2.innerHTML = ``
  }

  clearUI() {
    uiContainer.innerHTML = "";
  }

  saveToLS(data) {
    localStorage.setItem("city", JSON.stringify(data));
  }

  getFromLS() {
    if (localStorage.getItem("city" == null)) {
      return this.defaultCity;
    } else {
      this.city = JSON.parse(localStorage.getItem("city"));
    }

    return this.city;
  }

  clearLS() {
    localStorage.clear();
  }
}

//Calling on the two functions ^^^^ FETCH & UI

const ft = new Fetch();
const ui = new UI();

//add event listener for submit button//

const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
button.addEventListener("click", () => {
  const currentVal = search.value;

  ft.getCurrent(currentVal).then((data) => {
    //call a UI method//
    ui.populateUI(data);
    //call saveToLS
    ui.saveToLS(data);
  });
});

//event listener for local storage

window.addEventListener("DOMContentLoaded", () => {
  const dataSaved = ui.getFromLS();
  ui.populateUI(dataSaved);
});
