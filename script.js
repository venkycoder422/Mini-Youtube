var Key = 'AIzaSyBlpqOUP9HRLCpwmkhMlJRXW0E3i_Qxmos';
var Key1 ='AIzaSyBNnX6pfoDGeWUpm1pm6ImYLnjlF2aPWtQ';
//var API_KEY=`AIzaSyBNnX6pfoDGeWUpm1pm6ImYLnjlF2aPWtQ`;
//https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResult=20&key
// thumbnails:
// default: {url: 'https://i.ytimg.com/vi/IsI4_kL2MI4/default.jpg', width: 120, height: 90}
// high: {url: 'https://i.ytimg.com/vi/IsI4_kL2MI4/hqdefault.jpg', width: 480, height: 360}
// medium:
// height: 180
// url: "https://i.ytimg.com/vi/IsI4_kL2MI4/mqdefault.jpg"
// width: 320

let timerId;
function debounce(func, delay) {
    if (timerId) {
        clearTimeout(timerId);
    }

    timerId = setTimeout(function () {
        func();
    }, delay);
}

async function main() {
    try {
        let data = await fetchData();
        if (!data) {
            return false;
        }
        //console.log(data)
        getting(data);
    } catch (err) {
        console.log(err);
    }
}

const getalldata = async () => {
    try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${Key1}&part=snippet`);
        const data = await res.json();
        //console.log(data.items);
        return  data.items;
    } catch (error) {
        console.log(error)
    }
}






const fetchData = async () => {
    try {
        const str = document.querySelector("#searchInput").value;
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?&part=snippet&key=${Key1}&q=${str}`);
        //console.log(response);
        const data = await response.json();
        //console.log(data);
        return data.items;
        //getting(data.items.snippet.thumbnails.medium.url);
    } catch (err) {
        console.log(err);
    }
}
//console.log(a)
const getting = (data) => {
    document.querySelector('#searchResults').innerText = ''
    data.forEach(function (arrData) {
        console.log(arrData)
        // let vedioCard=document.createElement('div');

        //     var videoFrame=document.createElement('iframe');
        //     //videoFrame.src="https://www.youtube.com/embed/nzVZA3P_t9Q";
        //     videoFrame.src=`https://www.youtube.com/embed/${arrData.id.videoId}`;
        //     videoFrame.width='100%';
        //     videoFrame.height='400px';

        //     vedioCard.append(videoFrame);
        console.log(arrData);
        let card = document.createElement('div');
        card.style.alignItems = "center";
        let img = document.createElement('img');
        let title = document.createElement('h4');
        console.log(arrData.snippet.tittle === undefined);
        {
            arrData.snippet.title == undefined ? title.innerText = "No tittle" : title.innerText = arrData.snippet.title;
        }

        img.src = arrData.snippet.thumbnails.high.url;
        img.addEventListener('click', function () {
            localStorage.setItem('youtubeId', JSON.stringify(arrData.id.videoId));
            window.location.href = "./videos.html";

        })

        card.append(img, title);
        document.querySelector('#searchResults').append(card);
        //console.log(videoCard);
    })

}

const defaultfunction=async()=>{

    let data = await getalldata();
 
    console.log(data);
    getting(data);
    
 }
 defaultfunction();


// vedios script it is
var id = JSON.parse(localStorage.getItem('youtubeId')) || "";


let vedioCard = document.createElement('div');

var videoFrame = document.createElement('iframe');
//videoFrame.src="https://www.youtube.com/embed/nzVZA3P_t9Q";
videoFrame.src = `https://www.youtube.com/embed/${id}`;
videoFrame.width = '100%';
videoFrame.height = '400px';
videoFrame.style.marginTop="-65px";

vedioCard.append(videoFrame);

document.querySelector("#clikedVideo").append(vedioCard);