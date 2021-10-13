const musicContainer = document.getElementById('music_container'),

    playBtn = document.getElementById('play'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),

    audio = document.querySelector('audio'),
    musicTitle = document.getElementById('music_title'),
    musicCover = document.getElementById('music_cover'),
    progressContainer = document.getElementById('progress_container'),
    progress = document.getElementById('proress');

// 플레이 리스트를 배열에 넣어준다.
const songs = ['Sunny Winter Day', 'Shine Of Snow', 'After the Rain'];

// 기본 설정 트랙
let songsIndex = 2;


// loadSong  - 음악 불러오기

function loadSong (song) {
    // 타이틀은 songs[songsIndex]의 것을 가져옴
    musicTitle.innerText = song;
    audio.src = `./music/${song}.wav`;
    // musicCover.src = `./img/${song}.jpg`; 

}

loadSong(songs[songsIndex]);



// 버튼 이벤트가 들어왔을 때

function pauseSong () {
    musicContainer.classList.remove('play');
    audio.pause();
    playBtn.querySelector('i.bx').classList.remove('bx-pause');
    playBtn.querySelector('i.bx').classList.add('bx-play');
};

function playSong () {
    musicContainer.classList.add('play');
    audio.play();
    playBtn.querySelector('i.bx').classList.remove('bx-play');
    playBtn.querySelector('i.bx').classList.add('bx-pause');
};


playBtn.addEventListener('click', () => {
    // 플레이 버튼에 클릭이벤트가 들어왔을 때
    // 플레이의 상태 -> 뮤직 컨테이너에 플레이가 있어 음악이 실행중 
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying) {
        // 플레이 버튼을 눌렀을 때 음악이 실행중이면 멈춤 함수실행
        pauseSong();

    } else {
        playSong();
        // 그렇지 않으면 플레이 송
    }

});

function prevSong () {
    // 이전 음악
    songsIndex--;
    // 송인덱스를 하나씩 빼서 앞으로 가게한다

    if(songsIndex < 0) {
        songsIndex = songs.length -1;
        // 만약 송인덱스가 0보다 작으면
        // songs.length -1;      -->
        // 노래가 3곡이라서 songs 배열의 길이는 3 인덱스는 0, 1, 2 라서 -1
    }
    loadSong(songs[songsIndex]);
    // 플레이어에 로드를 하고
    playSong(); //플레이 해줌
};



function nextSong () {
    // 다음 음악
    songsIndex++;
    // 송인덱스를 하나씩 빼서 앞으로 가게한다

    if(songsIndex > songs.length -1) {
        songsIndex = 0;
        // 만약 송인덱스가 곡의 배열의 길이 -1보다 크면 
        // 인덱스를 0으로 해서 인덱스를 배열의 처음으로 보냄   -->
    }

    loadSong(songs[songsIndex]);
    // 플레이어에 로드를 하고
    playSong(); //플레이 해줌
};


// console.log(songs.length);

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// 음악 상태바

function updateProgress(e) {
// 이벤트를 받아서
const {duration, currentTime} = e.srcElement;
// 속성으로 변수 지정 const duration = e.srcElement.duration;

// 음악이나 비디오 플레이 퍼센트 계산하는거는 이거
const progressPercent = (currentTime / duration) * 100;
// 프로그래스의 퍼센트는 현재시간을 음악의 전체 시간으로
progress.style.width = `${progressPercent}%`;

};

audio.addEventListener('timeupdate', updateProgress);
// 오디오에 타임 업데이트 이벤트가 생기면...


// 오디오 바를 클릭했을 때 이동

function setProgress (e) {
    const width = this.clientWidth;
    // 프로그레스 컨테이너의 전체너비
// 만약, 실제로 보여지고 있는 컨텐츠가 얼마만큼의 공간을 차지하고 있는지 확인하고 싶다면,
// `clientWidth`와 `clientHeight` 속성을 사용하는 것이 좋다.

const clientX = e.offsetX;
//프로그레스 컨테이너에서 내가 클릭한 x의 좌표 
// 좌표를 출력하도록 하는 이벤트가 걸려있는 DOM node를 기준으로 좌표를 표시합니다.const

const duration = audio.duration;

audio.currentTime = (clientX / width) * duration;

};


progressContainer.addEventListener('click', setProgress)


audio.addEventListener('ended', nextSong);