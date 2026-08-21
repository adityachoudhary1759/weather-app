const apiKey = "27ec79cc76e4f42707f1911c9ad31e38";

async function getWeather() {

    const cityInput = document.getElementById("city");
    const weatherBox = document.getElementById("weather");

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Enter city name");
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "City not found");
            weatherBox.style.display = "none";
            return;
        }

        console.log("Weather Data:", data);

        weatherBox.style.display = "block";


        document.getElementById("cityName").textContent =
            data.name;


        document.getElementById("temp").textContent =
            `${data.main.temp.toFixed(1)} °C`;


        document.getElementById("condition").textContent =
            data.weather[0].main;


        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;


        document.getElementById("wind").textContent =
            `${data.wind.speed.toFixed(2)} km/h`;


        const icon = document.getElementById("icon");

        const iconCode = data.weather[0].icon;

        icon.src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        icon.alt =
            data.weather[0].description;


        icon.onerror = function () {

            console.log("Weather icon failed to load");

            this.src =
                `https://openweathermap.org/img/wn/${iconCode}.png`;
        };


    } catch (error) {

        console.error("Error:", error);

        alert("Something went wrong. Please check your internet connection.");

        weatherBox.style.display = "none";
    }
}


document.getElementById("city").addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        getWeather();
    }

});