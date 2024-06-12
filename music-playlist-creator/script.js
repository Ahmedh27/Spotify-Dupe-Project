// Get references to the modal and close button
var modal = document.getElementById("playlistModal");
var span = document.getElementsByClassName("close")[0];

// Function to open the modal with playlist data
function openModal(playlist) {
    document.getElementById('playlist_name').innerText = playlist.playlist_name;
    document.getElementById('playlist_art').src = playlist.playlist_art;
    document.getElementById('playlist_creator').innerText = `Creator: ${playlist.playlist_creator}`;
    document.getElementById('like_count').innerText = `Likes: ${playlist.likeCount}`;

    let songsHtml = playlist.songs.map(song => `
        <li>
            <img src="${song.cover_art}" alt="${song.title} cover art">
            <div>
                <strong>${song.title}</strong> by ${song.artist}
                <p>Album: ${song.album}</p>
                <p>Duration: ${song.duration}</p>
            </div>
        </li>
    `).join('');
    document.getElementById('songs_list').innerHTML = songsHtml;

    modal.style.display = "block";
}

// Close modal when the close button is clicked
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Function to create and display playlist cards
function displayPlaylists() {
    const playlistContainer = document.getElementById('playlist-cards');
    data.playlists.forEach(playlist => {
        let playlistDiv = document.createElement('div');
        playlistDiv.className = 'card';
        playlistDiv.onclick = () => openModal(playlist);
        playlistDiv.innerHTML = `
            <img src="${playlist.playlist_art}" alt="${playlist.playlist_name}">
            <h3>${playlist.playlist_name}</h3>
            <p>${playlist.playlist_creator}</p>
            <p>Likes: ${playlist.likeCount}</p>
        `;
        playlistContainer.appendChild(playlistDiv);
    });
}


// Initialize the display of playlists on page load
window.onload = displayPlaylists;

