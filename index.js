/*Test URL for 400 - 500 "https://jsonplaceholder.typicode.com/invalid-endpoint"*/
const mainGridBox = document.getElementById("main-grid-box");




/*BACKGROUND FOT THE BODY*/
fetch("https://picsum.photos/v2/list?page=2&limit=100")
    .then((res) => {
        //console.log(res);

        if (!res.ok) {
            throw new Error(`${res.status} Cannot connect to server!`);
        }
        return res.json();
    })
    .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        //console.log(data[randomIndex].download_url);
        document.body.style.backgroundImage = `url(${data[randomIndex].download_url}`;
    
        /*Display Phot info for Grid 4*/
        console.log(data[randomIndex].author, data[randomIndex].url);
        //document.getElementById("photo-info").textContent = data[randomIndex].author;
        
        const photoInfoDiv = document.getElementById("photo-info");
        const photoLink = document.createElement("a");
        photoLink.href = data[randomIndex].url;
        photoLink.textContent = data[randomIndex].author;
    
        photoInfoDiv.append(photoLink);
        
    
        
    
    })

    .catch((err) => {
        console.log(err);
    });

/*LOCAL TIME FOR GRID 2*/
function currentTime() {
    const date = new Date();
    
    document.getElementById("current-time").textContent = date.toLocaleTimeString("en-es", {timeStyle: "medium"});
    document.getElementById("current-time").setAttribute("datetime", date);
}

setInterval(currentTime, 1000);



