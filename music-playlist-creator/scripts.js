document.addEventListener("DOMContentLoaded", () => {
    const playlistArt = document.getElementById("playlist_art");
    const playlistName = document.getElementById("playlist_name");
    const playlistCreator = document.getElementById("playlist_creator");
    const likeCount = document.getElementById("likeCount");
    const songsList = document.getElementById("songs_list");

    let currentPlaylist; // Declare the variable to hold the current playlist

    function displayRandomPlaylist(playlists) {
        const randomIndex = Math.floor(Math.random() * playlists.length);
        const randomPlaylist = playlists[randomIndex];

        currentPlaylist = randomPlaylist; // Initialize currentPlaylist
        playlistArt.src = randomPlaylist.playlist_art;
        playlistName.innerText = randomPlaylist.playlist_name;
        playlistCreator.innerText = `Creator: ${randomPlaylist.playlist_creator}`;

        let songsHTML = '';
        randomPlaylist.songs.forEach(song => {
            songsHTML += `
                <li>
                    <img src="${song.cover_art}" alt="Song cover art" class="song-cover">
                    <p class="song-title">${song.title}</p> 
                    <p class="song-artist">${song.artist}</p>
                    <p class="song-duration">${song.duration}</p>
                </li>`;
        });
        songsList.innerHTML = songsHTML;
    }

    // Shuffle button event listener
    document.getElementById("shuffle-button").addEventListener("click", () => {
        const songs = Array.from(songsList.children);
        songs.sort(() => Math.random() - 0.5);
        songsList.innerHTML = '';
        songs.forEach(song => songsList.appendChild(song));
    });

    // Search functionality
    function filterPlaylists() {
        const query = document.getElementById("search-bar").value.toLowerCase();
        const filteredPlaylists = data.playlists.filter(playlist => 
            playlist.playlist_name.toLowerCase().includes(query) || 
            playlist.playlist_creator.toLowerCase().includes(query)
        );
        displayRandomPlaylist(filteredPlaylists);
    }

    displayRandomPlaylist(data.playlists);
    window.filterPlaylists = filterPlaylists; // Make filterPlaylists accessible globally
});
