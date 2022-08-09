// datas
const music_list = [
  {
    img:
      "https://i.ytimg.com/vi/MJmxdlCtFWU/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBgBwsqLjtQ3kwEBFdAQk1BA1Z6cw",
    name: "Two Two Two",
    film: "Kaathuvaakula Rendu Kaadhal",
    artist: "Anirudh",
    music: "music/Two Two Two.mp3",
  },
  {
    img:
      "https://i0.wp.com/99lyricstore.com/wp-content/uploads/2021/10/jugnu-lyrics-badshah.jpg",
    name: "Jugnu",
    film: "Badshah",
    artist: "Nikhita Gandhi | Akanksha Sharma",
    music: "music/Jugnu.mp3",
  },
  {
    img:
      "https://i.ytimg.com/vi/WgrLE4Fqxeo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLChxO0w-PnVS3BHxzppCEkDJLYItw",
    name: "Bullet",
    film: "The Warrior",
    artist: "DSP",
    music: "music/Bullet.mp3",
  },
  {
    img:
      "https://i.ytimg.com/vi/Y3-PeuQ7nvY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD0X9wJRcr-CnZsdyity_untFPoF",
    name: "Yanji",
    film: "Vikram Vedha",
    artist: "Sam C.S",
    music: "music/Yanji.mp3",
  },
];

// helpers

const zeroPad = (num) => String(num).padStart(2, "0");

function secondsToMinutes(time) {
  return zeroPad(Math.floor(time / 60)) + ":" + zeroPad(Math.floor(time % 60));
}
let isPlaying = false;
//load 1st one
let trackInd = 0;

const musicMetaName = document.querySelector(".music-meta_name");
const musicMetaFilm = document.querySelector(".music-meta_film");

const musicMetaArtist = document.querySelector(".music-meta_artist");

const musicMetaImg = document.querySelector(".album-art");
//audio tag create
let currentTrack = document.createElement("audio");

let startTime=document.querySelector('.start-time')

let endTime=document.querySelector('.end-time')
let updateTimer;
let israndom=false

loadTrack(trackInd);

// Complete the below functions

//load each track
function loadTrack(trackInd) {
  const { music } = music_list.at([trackInd]);
  currentTrack.src = music;
  currentTrack.load();
  updateMetaData(trackInd);
}

//update all info for each songs
function updateMetaData(trackInds) {
  clearInterval(updateTimer)
  const { img, name, film, artist } = music_list.at([trackInds]);
  musicMetaName.innerHTML = name;
  musicMetaFilm.innerHTML = film;
  musicMetaArtist.innerHTML = artist;
  musicMetaImg.src = img;
  updateTimer=setInterval(setUpdate,1000)
}

//ebery second update time
function setUpdate(){
let seekPostion=(currentTrack.currentTime/currentTrack.duration)*100
seekBar.value=seekPostion
upDateSeekBarFilled()


startTime.innerText=secondsToMinutes(currentTrack.currentTime);
endTime.innerText=secondsToMinutes(currentTrack.duration);
}

function upDateSeekBarFilled(){
  seekBarFilled.style.width =seekBar.value - 1 + "%";
}



function repeatTrack() {

  loadTrack(trackInd);
  playTrack()
}

function randomTrack() {

  israndom=!israndom

}




function nextTrack() {
  let currIndex = israndom
  ?Number.parseInt(Math.round()*music_list.length)
  : trackInd + 1;
  playCurrentSong(currIndex);
}




function playCurrentSong(currInd) {
  //keep on looping like 0 1 2 3
  trackInd = currInd % music_list.length;
  //load track
  loadTrack(trackInd);

  //play track
  playTrack();
  console.log(trackInd,music_list.at(trackInd))
}




function prevTrack() {
  let currIndex =israndom
  ?Number.parseInt(Math.round()*music_list.length)
  :trackInd - 1;
  playCurrentSong(currIndex);
 
}

let Playpausebtn = document.querySelector(".playpause-track");

function playTrack() {
  currentTrack.play();
  isPlaying = true;
  //show pause button
  Playpausebtn.innerHTML = ' <i class="fa fa-pause fa-3x"></i>';
  musicMetaImg.classList.add('rotate')
}



function playPauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}



function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  //show play btn
  Playpausebtn.innerHTML = ' <i class="fa fa-play fa-3x"></i>';
  musicMetaImg.classList.remove('rotate')
}



function seekTo() {

seekBar.value=
currentTrack.currentTime=currentTrack.duration*(seekBar.value/100)

// console.log(currentTrack.duration,
//   seekBar.value,
//   secondsToMinutes(currentTrack.duration),
// secondsToMinutes(currentTrack.currentTime)
//   )

}
