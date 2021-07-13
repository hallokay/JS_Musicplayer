
const musicContainer = document.getElementById('music_container'),

        playBtn = document.getElementById('play'),
        prevBtn = document.getElementById('prev'),
        nextBtn = document.getElementById('next'),

        audio = document.getElementById('audio'),
        progress = document.getElementById('progress'),
        progressContainer = document.getElementById('progress_container'),
        musicTitle= document.getElementById('music_title'),
        musicCover= document.getElementById('music_cover');

// songs titles
const songs = ['Sunny Winter Day', 'Shine Of Snow', 'After the Rain'];

// keep track of song
let songIndex = 2;


function loadSong(song){
 musicTitle.innerText = song;
 audio.src= `./music/${song}.wav`;
 
//  cover.src = './img/${song}'
}

 loadSong(songs[songIndex]);

// event listener


function playSong() {   
 musicContainer.classList.add('play');
 audio.play();
 playBtn.querySelector('i.bx').classList.remove('bx-play');
 playBtn.querySelector('i.bx').classList.add('bx-pause');


}

function pauseSong() {
 musicContainer.classList.remove('play');
 audio.pause();
 playBtn.querySelector('i.bx').classList.remove('bx-pause');
 playBtn.querySelector('i.bx').classList.add('bx-play');
}

playBtn.addEventListener('click', () => {
        const isPlaying = musicContainer.classList.contains('play');
//isPlaying은 뮤직 컨테이너에 플래이를 포함하는 상태
        if(isPlaying) {
         pauseSong();
        } else {
         playSong();
        }
})


function prevSong () {
        songIndex--;
        if(songIndex < 0) {
                songIndex = songs.length -1
                
        }
        loadSong(songs[songIndex]);
        playSong();
};

function nextSong () {
        songIndex++;
        if(songIndex > songs.length -1) {
                songIndex = 0;
              
        }
        loadSong(songs[songIndex]);
        playSong();
};
 
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


// progress

function updateProgress (e) {
 const {duration, currentTime} = e.srcElement;


const progressPercent = (currentTime / duration ) * 100;
progress.style.width = `${progressPercent}%`;
};
audio.addEventListener('timeupdate', updateProgress); 

//click on progress bar

function setProgress (e) {
 const width = this.clientWidth; 
 // 전체 너비
 const clientX = e.offsetX;
//  내가 누른 곳의 위치
//   console.log(clientX);

const duration = audio.duration;

audio.currentTime = (clientX / width) * duration;
};

progressContainer.addEventListener('click', setProgress);

// song Ends
audio.addEventListener('ended', nextSong);
