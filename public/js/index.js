window.onload = function (){

var weatherhumidity = document.getElementById('weatherhumidity')
var weathertemperature = document.getElementById('weathertemperature')
var weatherdescription = document.getElementById('weatherdescription')
var weathermain = document.getElementById('weathermain')
var button = document.getElementById('button')
var cityInput = document.getElementById('cityInput')
var inputcontainer = document.getElementById('inputcontainer')
var weatherimage = document.getElementById('image')
var appcontainer = document.getElementById('appcontainer')

cityInput.addEventListener('keydown', function(e){
  if (e.keyCode === 13){
    makeRequest("Enter");
    }
   })
button.addEventListener('click', function(){
  makeRequest("Click");

  })

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function makeRequest(type) {
  console.log(type);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" +cityInput.value +"&APPID=e328f5a07998d9a414702875ca2100bc", true);
  xhr.onload = function (e){
   if(xhr.readyState === 4){
     if(xhr.status === 200){
       var data = JSON.parse(xhr.responseText);
       console.log(data)
       console.log(data.visibility)

       var sunrise = data.sys.sunrise
       var sunset = data.sys.sunset
       var now = Date.now() / 1000

       var daytime = sunrise < now && now < sunset;
       console.log("is it daytime?", daytime);

       console.log(sunrise,sunset)
       console.log("sunrise",sunrise)
       console.log("sunset",sunset)

       console.log("now",now)

       weathermain.innerHTML = data.weather[0].main
  console.log(data.weather[0].main)

       if (daytime) {
         if (data.weather[0].main === "Clear") {
           weatherimage.src="../../assets/images/clear.png"

         }
         if (data.weather[0].main === "Clouds") {
           weatherimage.src="../../assets/images/clouds.png"
         }
         if (data.weather[0].main === "Rain") {
           weatherimage.src="../../assets/images/rain.png"

         }
         if (data.weather[0].main === "Drizzle") {
           weatherimage.src="../../assets/images/rain.png"

         }
         if (data.weather[0].main === "Snow") {
           weatherimage.src="../../assets/images/snowflake.png"
         }
       } else {
         weatherimage.src="../../assets/images/moon.png"
       }


       var description = toTitleCase(data.weather[0].description).replace("Drizzle", "").replace("Rain", "")



       weatherdescription.innerHTML = description
       weathertemperature.innerHTML = (data.main.temp - 273.15).toFixed() +"°C"
       weatherhumidity.innerHTML = data.main.humidity +"%"

     } else {
       console.error(xhr.statusText)
     }
   }
  };
  xhr.onerror = function (e) {
   console.error(xhr.statusText);
  };
  xhr.send(null)

}

}
