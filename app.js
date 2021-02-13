
var lyricArea = document.getElementById('lyricArea');
var suggContainer = document.getElementById('suggContainer');

const showSuggesion = () => {
    const getInput = document.getElementById('inputForm').value;
    if (getInput != '') {
        GetSearched(getInput);
    }
    else {
        alert("GIVE A VALID NAME")
    }
}

const GetSearched = async(searchText)=>{
    toggleSpinner();
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    display(data.data) 
    toggleSpinner();
    
}
const display = (arrayName) => {

    suggContainer.style.display = "block";
suggContainer.innerHTML = '';
lyricArea.innerText = "";

    arrayName.forEach( obj => {
        const songName = obj.title;
        const artistName = obj.artist.name;
const newDiv = document.createElement('div');
newDiv.className = "single-result row align-items-center my-3 p-3"
        newDiv.innerHTML = `
    <div class="col-md-9">
                        <h3 class="lyrics-name">
                        ${songName}</h3>
                        <p class="author lead">Album by <span>${artistName}</span></p>
    </div>
    <div class="col-md-3 text-md-right text-center">
                        <button id="getLyricsBtn" 
                        onclick="GetLyrics('${artistName}', '${songName}')"
                        class="btn btn-success">Get Lyrics</button>
    </div>
    <div  class=" row align-items-center my-3 p-3">
    <audio controls src="${obj.preview}"></audio>
    </div>
        `
        suggContainer.appendChild(newDiv);
    });
} 

const GetLyrics = async(artist, title)=>{
    
    LyricsSpinner();
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    const res = await fetch(url);
    const data = await res.json();
    
        if (data.lyrics != '') {
            lyricArea.innerText = data.lyrics;
            LyricsSpinner();
        }
    else {
        lyricArea.innerText = 'Sorry, Lyrics Not Found! Try With Another Song!';
        LyricsSpinner();
    }
}




const toggleSpinner = () => {
    const spinner = document.getElementById('spinner');
    const suggContainer = document.getElementById('suggContainer');
    spinner.classList.toggle('d-none')
    suggContainer.classList.toggle('d-none');
}
const LyricsSpinner = () => {
    const spinner = document.getElementById('spinner');
    const lyricArea = document.getElementById('lyricArea');
    spinner.classList.toggle('d-none');
    lyricArea.classList.toggle('d-none');
}
function handle(e){
    if(e.key === "Enter"){
showSuggesion();
        
    }

    return false;
}

