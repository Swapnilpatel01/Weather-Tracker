const api = {
    key: '9c392b55fccba61e91259a611c988a98',
    base: 'https://api.openweathermap.org/data/2.5/'
}

const input = document.getElementById('userInput');
//const input2 = document.getElementById('userInput2')
const searchButton = document.getElementById('button');

function search() {
    getAPIData(input.value);
    console.log(input.value);
}
searchButton.addEventListener('click', search);

input.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        searchButton.click();
    }
})

// input2.addEventListener('keypress', function (event) {
//     if (event.keyCode === 13) {
//         searchButton.click();
//     }
// })

function getAPIData(city, state) {
    fetch(`${api.base}weather?q=${city},${state}&units=imperial&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayWeatherData);
}

function displayWeatherData(weather) {
    console.log(weather);
    
    let location = document.getElementById('location');
    location.innerHTML = `${weather.name}, ${weather.sys.country}`;
    //${input2.value.charAt(0).toUpperCase() + input2.value.slice(1)}

    let weatherType = document.getElementById('weatherType');
    weatherType.innerHTML = `${weather.weather[0].main}`;

    let temperature = document.getElementById('temperature');
    temperature.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>°F/</span>${toCelsius(weather.main.temp)}<span>°C</span>`;

    let currentDate = new Date();
    let date = document.getElementById('date');
    date.innerHTML = dateBuilder(currentDate);
}

function toCelsius(temp) {
    let tempCelsius = Math.round((temp - 32) * (5 / 9)).toFixed(0);
    return `${tempCelsius}`;
}


function dateBuilder(currentDate) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
        'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[currentDate.getDay()];
    let month = months[currentDate.getMonth()];
    let date = currentDate.getDate();
    let year = currentDate.getFullYear();

    return `${day} ${month} ${date}, ${year}`;
}

function currentTime() {
    let currTime = new Date();
    document.getElementById("time").innerHTML = currTime;
}

//Returns user's location based on IP address
// {$.get("https://ipinfo.io/json", function (response) {
//         $(".region").html("Location: " + response.city + ", " + response.region)
//     }, "jsonp")}