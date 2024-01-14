
// now for bottom play button to play/pause a song
let j = 0;
let k = j+1;
CurrentSrc = "./songs/"+k+".mp3"; 
let CurrentSong = new Audio(CurrentSrc);
let MasterPlay = document.querySelector("#masterPlay");

let gifShow = document.querySelector(".songInfo img"); // the gif image that bounces when a song is played
let gifShow2 = document.querySelectorAll(".songListPlay img");

//function to change play/pause button and progressbar

function SongProgression(CurrentSrc,j){
    CurrentSong = new Audio(CurrentSrc);
    CurrentSong.play();
    MasterPlay.classList.remove("fa-circle-play");
    MasterPlay.classList.add("fa-pause");
    MasterPlay.style.color="red";
    gifShow.style.opacity = "1";
    gifShow2[j].style.opacity = "1";
    SongProgressBar = document.getElementById("SongProgressBar");
        
    CurrentSong.addEventListener("timeupdate", function(){
        console.log("timeupdate"); // tells how much has passed when song is played.
        
        SongProgress = parseInt((CurrentSong.currentTime/CurrentSong.duration)*100);
        console.log(SongProgress); //shows percentage of songs played
            
        SongProgressBar.value = SongProgress; // this will update the seekbar value as song progresses
        
        // To display total song duration at the end of seekbar
        let TotalTime = document.querySelector("#TotalTime");
        let TimeMinutes = Math.floor(CurrentSong.duration / 60);
        let TimeSeconds = Math.floor(CurrentSong.duration - (TimeMinutes * 60));
        TotalTime.textContent = TimeMinutes+":"+TimeSeconds;
        
        // To display current song duration
        let Nowtime = document.querySelector("#Nowtime");
        let NowtimeMinutes = Math.floor(CurrentSong.currentTime / 60);
        let NowtimeSeconds = Math.floor(CurrentSong.currentTime - (NowtimeMinutes * 60));
        Nowtime.textContent = NowtimeMinutes+":"+NowtimeSeconds;
    });
        
    SongProgressBar.addEventListener("change", function(){
        CurrentSong.currentTime = SongProgressBar.value * CurrentSong.duration/100; //getting time from progressbar value (reverse of first formula)
    });
    

    // For playing nextsong when a song is ended
    CurrentSong.addEventListener("timeupdate", function(){
        console.log("timeupdate"); // tells how much has passed when song is played.
    
        let SongProgress = parseInt((CurrentSong.currentTime/CurrentSong.duration)*100);
        
        if (SongProgress === 100){  

            //if seekbar reaches 100, play next song.(Copied and used next button code.)

            if(k==7){
                gifShow2[j].style.opacity = "0";
                CurrentSong.pause();
                j=0;
                k=1;
                CurrentSrc = "./songs/"+k+".mp3"; 
                SongProgression(CurrentSrc,j);
            }else{
                gifShow2[j].style.opacity = "0";
                CurrentSong.pause();
                j=j+1;
                k=k+1;
                CurrentSrc = "./songs/"+k+".mp3";
                SongProgression(CurrentSrc,j); 
            }
        }

        // For displaying song names at the bottom
        let DisplayName = document.querySelector(".DisplayName");
        let songName = document.querySelectorAll(".songName");
        DisplayName.textContent = songName[j].textContent;
    });
}

// Clicking a song to play it

let Songclick = document.getElementsByClassName("songItem");

for (let h=0;h<Songclick.length;h++){
    Songclick[h].addEventListener('mouseover', function() {
        Songclick[h].style.cursor = 'pointer';
      });

    Songclick[h].addEventListener('ended', function() {
        console.log("ended");
    });
    Songclick[h].addEventListener("click",function(){
        CurrentSong.pause();
        gifShow2[j].style.opacity = "0";
        j = h;
        k = j+1;
        CurrentSrc = "./songs/"+k+".mp3";
        CurrentSong = new Audio(CurrentSrc);
        SongProgression(CurrentSrc,j);
    });
}

MasterPlay.addEventListener("click", function(){
    // in case play button is pressed
    if (CurrentSong.paused || CurrentSong.currentTime<=0){
        this.style.color = "red";
        CurrentSong.play();
        MasterPlay.classList.remove("fa-circle-play");
        MasterPlay.classList.add("fa-pause");
        gifShow.style.opacity = "1";
        gifShow2[j].style.opacity = "1";
    }
    // in case Pause button is pressed
    else{
        this.style.color = "green";
        CurrentSong.pause();
        MasterPlay.classList.remove("fa-pause");
        MasterPlay.classList.add("fa-circle-play");
        gifShow.style.opacity = "0";
        gifShow2[j].style.opacity = "0";
    }
    // Seekbar times (start and end)
    CurrentSong.addEventListener("timeupdate", function(){
        // To display total song duration at the end of seekbar
        let TotalTime = document.querySelector("#TotalTime");
        let TimeMinutes = Math.floor(CurrentSong.duration / 60);
        let TimeSeconds = Math.floor(CurrentSong.duration - (TimeMinutes * 60));
        TotalTime.textContent = TimeMinutes+":"+TimeSeconds;
                    
        // To display current song duration
        let Nowtime = document.querySelector("#Nowtime");
        let NowtimeMinutes = Math.floor(CurrentSong.currentTime / 60);
        let NowtimeSeconds = Math.floor(CurrentSong.currentTime - (NowtimeMinutes * 60));
        Nowtime.textContent = NowtimeMinutes+":"+NowtimeSeconds;
    });
    
    // For displaying song names at the bottom
    let DisplayName = document.querySelector(".DisplayName");
    let songName = document.querySelectorAll(".songName");
    DisplayName.textContent = songName[j].textContent;
});


// Now we have to update Progressbar/Seekbar when song is played

let SongProgressBar = document.getElementById("SongProgressBar");

CurrentSong.addEventListener("timeupdate", function(){
    console.log("timeupdate"); // tells how much has passed when song is played.

    let SongProgress = parseInt((CurrentSong.currentTime/CurrentSong.duration)*100);
    console.log(SongProgress); //shows percentage of songs played
    
    SongProgressBar.value = SongProgress; // this will update the seekbar value as song progresses
});

SongProgressBar.addEventListener("change", function(){
    CurrentSong.currentTime = SongProgressBar.value * CurrentSong.duration/100; //getting time from progressbar value (reverse of first formula)
});

// next button to play next song
let next = document.querySelector(".fa-forward-step");
next.addEventListener("click", function(){
    if(k==7){
        gifShow2[j].style.opacity = "0";
        CurrentSong.pause();
        j=0;
        k=1;
        CurrentSrc = "./songs/"+k+".mp3"; 
        SongProgression(CurrentSrc,j);
    }else{
        gifShow2[j].style.opacity = "0";
        CurrentSong.pause();
        j=j+1;
        k=k+1;
        CurrentSrc = "./songs/"+k+".mp3";
        SongProgression(CurrentSrc,j); 
    }
});

// previous button to play previous songs (similar code to next button but k and j will decrement)

let back = document.querySelector(".fa-backward-step");
back.addEventListener("click", function(){
    if(k==1){
        gifShow2[j].style.opacity = "0";
        CurrentSong.pause();
        j=6;
        k=7;
        CurrentSrc = "./songs/"+k+".mp3"; 
        SongProgression(CurrentSrc,j);
    }else{
        gifShow2[j].style.opacity = "0";
        CurrentSong.pause();
        j=j-1;
        k=k-1;
        CurrentSrc = "./songs/"+k+".mp3";
        SongProgression(CurrentSrc, j); 
    }
});

SongProgressBar = document.getElementById("SongProgressBar");

CurrentSong.addEventListener("timeupdate", function(){
    console.log("timeupdate"); // tells how much has passed when song is played.

    let SongProgress = parseInt((CurrentSong.currentTime/CurrentSong.duration)*100);    
    if (SongProgress === 100){
        console.log("Song has ended.");
        gifShow2[j].style.opacity = "0";
        CurrentSong.pause();
        j=j+1;
        k=k+1;
        CurrentSrc = "./songs/"+k+".mp3";
        SongProgression(CurrentSrc,j); 
    }
});

// Done, just change names and images (logo image too). 
// New feature ADDED - Play next song when song ends.

