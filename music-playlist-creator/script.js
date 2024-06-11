//Opening and Closing the Modal
var modal = document.getElementById("playlistModal");
var span = document.getElementsByClassName("close")[0];

//Content in Modal for Playlist & Song Names
function openModal(playlist) {
   document.getElementById('playlist_name').innerText = playlist.playlist_name;
   document.getElementById('playlist_art').src = playlist.playlist_art;
   document.getElementById('playlist_creator').innerText = `Creator: ${playlist.playlist_creator}`;
   document.getElementById('like_count').innerText = `Likes: ${playlist.likeCount}`;
  //Arrow Loop for songs list
   let songsHtml = playlist.songs.map(song => `
      <li>
          <img src="${song.cover_art}" alt="${song.title} cover art" />
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

span.onclick = function() {
   modal.style.display = "none";
}
window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}