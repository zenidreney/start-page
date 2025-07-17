/*Test URL for 400 - 500 "https://jsonplaceholder.typicode.com/invalid-endpoint"*/
const mainGridBox = document.getElementById("main-grid-box");

fetch("https://picsum.photos/v2/list")
    .then((res) => {
        //console.log(res);

        if (!res.ok) {
            throw new Error(`${res.status} Cannot connect to server!`);
        }
        return res.json();
    })
    .then((data) => {
        //console.log(data, data.length, Math.random() * data.length, Math.floor(Math.random() * data.length));
        const randomIndex = Math.floor(Math.random() * data.length);
        console.log(data[randomIndex].download_url);
        document.body.style.backgroundImage = `url(${data[randomIndex].download_url}`;
    
    
    })

    .catch((err) => {
        console.log(err);
    });
