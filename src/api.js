const cityForm = document.querySelector("#weatherForm");

const getWeatherConditions = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2&units=metric`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    
    let div = document.createElement("div");
    div.setAttribute("id", "conditions");
    let city = document.createElement("h2");
    let cityNode = document.createTextNode(data.name);
    city.appendChild(cityNode);

    div.setAttribute("id", "conditions");
    let country = document.createElement("h1");
    let countryNode = document.createTextNode(data.sys.country);
    country.appendChild(countryNode);

    let temp = document.createElement("div");
    let tempNode = document.createTextNode("\t"+data.main.temp + " °C ");
    temp.appendChild(tempNode);

    let desc = document.createElement("div");
    let descNode = document.createTextNode("| \t   "+data.weather[0].description);
    desc.appendChild(descNode);

    let rise = document.createElement("div");
    let riseNode = document.createTextNode("| \t   "+data.sys.sunrise);
    rise.appendChild(riseNode)

    div.appendChild(city);
    div.appendChild(country);
    div.appendChild(temp);
    div.appendChild(desc);
    div.appendChild(rise);
    document.querySelector("main").appendChild(div);
  } catch (error) {
    console.log(error);
    let errorDiv = document.createElement("div");
    errorDiv.setAttribute("id", "error");
    let errorNode = document.createTextNode(error.message);
    errorDiv.appendChild(errorNode);
    document.querySelector("main").appendChild(errorDiv);
  }
}

cityForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityInput = document.querySelector("#cityInput");
  const city = cityInput.value;
  getWeatherConditions(city);
});



document.addEventListener("DOMContentLoaded", (e) => {
    cityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if(document.querySelector("#city").value != ""){
            let conditionsDiv = document.querySelector("#conditions");
            if(conditionsDiv){
                document.querySelector("main").removeChild(conditionsDiv);
            }
            getWeatherConditions(document.getElementById("city").value);
        }else{
            console.log("You must provide a city");
        }
    })
})


function searchMeal() {
  const input = document.getElementById("meal-input").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const resultDiv = document.getElementById("meal-result");

      if (data.meals == null) {
        resultDiv.innerHTML = "No meals found.";
        return;
      }

      const meal = data.meals[0];
      const mealName = meal.strMeal;
      const mealInstructions = meal.strInstructions;
      const mealImage = meal.strMealThumb;

      const html = `
          <h2>${mealName}</h2>
          <p>${mealInstructions}</p>
          <img src="${mealImage}" alt="${mealName}" />
        `;

      resultDiv.innerHTML = html;
    })
    .catch((error) => {
      console.error(error);
      const resultDiv = document.getElementById("meal-result");
      resultDiv.innerHTML = "An error occurred while fetching meal data.";
    });
}