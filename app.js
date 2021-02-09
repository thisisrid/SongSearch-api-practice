
var lyricArea = document.getElementById('lyricArea');
var suggContainer = document.getElementById('suggContainer');

const GetSearched = async(searchText)=>{
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    display(data.data) 
}

const GetLyrics = async(artist, title)=>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    const res = await fetch(url);
    const data = await res.json();
    
        if (data.lyrics != '') {
            lyricArea.innerText = data.lyrics;
        console.log(data.lyrics)
        }
    else {
        lyricArea.innerText = 'Sorry, Lyrics Not Found! Try With Another Song!'
    }
    
}

const showSuggesion = () => {
    const getInput = document.getElementById('inputForm').value;
    GetSearched(getInput);
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


