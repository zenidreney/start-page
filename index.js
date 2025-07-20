/*Test URL for 400 - 500 "https://jsonplaceholder.typicode.com/invalid-endpoint"*/
const mainGridBox = document.getElementById("main-grid-box");
let city, region, country;
let inputLocation = "Cadiz";



/*Event Listeners*/

const getLocBtn = document.getElementById("get-loc-btn");
getLocBtn.addEventListener("click", function (e) {
    e.preventDefault();
    
    inputLocation = document.getElementById("input-location").value.toLowerCase().trim();
    displayMeteo(inputLocation);
});

/*BACKGROUND FOT THE BODY*/
fetch("https://picsum.photos/v2/list?page=2&limit=100")
    .then((res) => {
        if (!res.ok) {
            throw new Error(`${res.status} Cannot connect to server!`);
        }
        return res.json();
    })
    .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        //console.log(data[randomIndex].download_url);
        document.body.style.backgroundImage = `url(${data[randomIndex].download_url}`;

        /*Display Phot0 info for Grid 4*/

        const photoInfoDiv = document.getElementById("photo-info");
        const photoLink = document.createElement("a");
        photoLink.href = data[randomIndex].url;
        photoLink.textContent = data[randomIndex].author;

        photoInfoDiv.append(photoLink);
    })

    .catch((err) => {
        console.log(err);
    });


/*METEO FOR GRID 1*/

function displayMeteo(loc) {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${loc}&count=5&language=en&format=json`)
        .then((res) => {
            //console.log(res);
            if (!res.ok) {
                throw new Error(`Error code: ${res.status}!`);
            }
            return res.json();
        })
        .then((data) => {
            console.log(data, data.results[0].admin1, data.results[0].country_code);
            const lat = data.results[0].latitude;
            const lon = data.results[0].longitude;
            city = data.results[0].name;
            region = data.results[0].admin1;
            country = data.results[0].country_code;
            return fetch(
                "https://api.open-meteo.com/v1/forecast?" +
                    `latitude=${lat}&longitude=${lon}` +
                    `&daily=temperature_2m_mean` +
                    `&daily=temperature_2m_min` +
                    `&daily=temperature_2m_max` +
                    `&forecast_days=1`
            );
        })
        .then((res) => res.json())
        .then((meteo) => {
            //console.log(meteo, meteo.daily.temperature_2m_max[0]);

            const cityName = document.getElementById("city-name");
            const meanTemp = document.getElementById("mean-temp");
            const minTemp = document.getElementById("min-temp");
            const maxTemp = document.getElementById("max-temp");

            cityName.textContent = city + "," + region + "," + country;
            meanTemp.textContent = meteo.daily.temperature_2m_mean[0];
            minTemp.textContent = meteo.daily.temperature_2m_min[0];
            maxTemp.textContent = meteo.daily.temperature_2m_max[0];
        })
        .catch((err) => console.error(err));
}

displayMeteo(inputLocation);

/*LOCAL TIME FOR GRID 2*/
function currentTime() {
    const date = new Date();

    document.getElementById("current-time").textContent = date.toLocaleTimeString("en-es", { timeStyle: "medium" });
    document.getElementById("current-time").setAttribute("datetime", date);
}

setInterval(currentTime, 1000);
