const apiKey = 'b67ee6df6321fffb1285dad68ff9d912'
let searchBtn = $('#searchButton')
let predetermine = $('.location')
var collectedWeather
let appendForecast = $('#forecast')
$(document).ready(function(){

    function getWeather(searchName){
        const url = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${searchName}&appid=${apiKey}`
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            appendForecast.empty()
            for (let i = 0; i < 40; i += 8) {
                var icn = data.list[i].weather[0].icon
                console.log(icn)
                var minTemp = data.list[i].main.temp_min
                var maxTemp = data.list[i].main.temp_max
                var icon = "https://openweathermap.org/img/wn/" + icn + "@2x.png" 
                var date = data.list[i].dt_txt.split(' ')
                var formatDate = date[0]
                var li = $('<li>').addClass("border-2 border-solid p-5")
                var h3 = $('<h3>').text(formatDate)
                var img = $('<img>').attr('src', icon)
                var h4MinTemp = $('<h4>').text(minTemp + '°')    
                var h4MaxTemp =  $('<h4>').text(maxTemp + '°')
                li.append(h3, img, h4MinTemp, h4MaxTemp)
                appendForecast.append(li)      
            }
            const weatherSave = {
                date: formatDate,
                icon: icon,
                minTemp: minTemp,
                maxTemp: maxTemp
        }

            
            localStorage.setItem(searchName, JSON.stringify(weatherSave))
        }
            )
        }
        searchBtn.click(function() {
            const searchName = $('#locationSearch').val()
            getWeather(searchName);
           })
         
         predetermine.click(function(){
          const searchName = $(this).attr('id')
             getWeather(searchName);
         })
    })




