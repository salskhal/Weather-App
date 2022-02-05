const API_KEY = "ebef449c775e4ffda5e200607220402";


let cityName = "Ilorin"
let app = document.querySelector(".content")
let temperature = document.querySelector(".temp")
let locate = document.querySelector(".location-name")
let condition = document.querySelector(".condition")
let humidity = document.querySelector(".humidity")
let wind = document.querySelector(".wind")
let icon = document.querySelector(".icon")
let cityInput = document.querySelector(".city-input")
let dateOutput = document.querySelector(".date-output")

let fetchBtn = document.querySelector(".search-btn")


let cityList = document.querySelectorAll(".city")

let weatherInfo = {}


cityList.forEach(city => {
    city.addEventListener("click", (e) =>{

        let selected = e.target.innerHTML
        cityName = selected
        console.log(cityName)
        fetchWeather()
        
        app.style.opacity = "0"
    })
})



fetchBtn.addEventListener("click", ()=>{
    let select = cityInput.value
    cityName = select
    
    fetchWeather()
})



function setResult(){
    locate.innerHTML = `${weatherInfo.city}, ${weatherInfo.country}`
    condition.innerHTML = weatherInfo.condition
    icon.src = weatherInfo.src
    temperature.innerHTML = `${weatherInfo.temp}&#176C`
    humidity.innerHTML = `${weatherInfo.humidity}%`
    wind.innerHTML = `${weatherInfo.wind}km/h`

   
}



function fetchWeather(){
    fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`)
    .then(res => res.json())
    .then(data =>{
        weatherInfo = {
            city: data.location.name, //
            country: data.location.country, //
            temp: data.current.temp_c, //
            condition: data.current.condition.text, //
            src: data.current.condition.icon, //
            humidity: data.current.humidity,
            wind: data.current.wind_kph,
            data: data.location.localtime
        }

        const date = data.location.localtime
        const y = parseInt(date.substr(0,4))
        const d = parseInt(date.substr(5,2))
        const m = parseInt(date.substr(8,2))
        dateOutput.innerHTML = `${dayOfWeek(d, m, y)} ${d}-${m}-${y}`

        console.log(cityName)

        setResult()
        app.style.opacity = "1"
    })
}


function dayOfWeek(day, month, year){
    const weekDay = [
        "Sunday",
        "Monday",
        "Tuesday", 
        "Wednesday",
        "Thursday", 
        "Friday", 
        "Saturday"
    ]
    return weekDay[new Date(`${day}/${month}/${year}`).getDay()]
}



fetchWeather()
