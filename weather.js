const apiKey = "27ec79cc76e4f42707f1911c9ad31e38";

async function getWeather() {

    const city = document.getElementById("city").value;

    if(city==""){
        alert("Enter city name");
        return;
    }

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

        const response = await fetch(url);

        const data = await response.json();

        if(data.cod=="404"){
            alert("City not found");
            return;
        }

        document.getElementById("weather").style.display="block";

        document.getElementById("cityName").innerHTML=data.name;

        document.getElementById("temp").innerHTML=data.main.temp+" °C";

        document.getElementById("condition").innerHTML=data.weather[0].main;

        document.getElementById("humidity").innerHTML=data.main.humidity+"%";

        document.getElementById("wind").innerHTML=data.wind.speed+" km/h";

        document.getElementById("icon").src=
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    }

    catch(error){

        alert("Something went wrong");

    }

}