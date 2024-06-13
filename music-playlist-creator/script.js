document.addEventListener("DOMContentLoaded", () => {
  // Data from data.js
  const playlistsData = data;
  console.log(playlistsData);

  // Get references to the modal and close button
  const modal = document.getElementById("playlistModal");
  const span = document.getElementsByClassName("close")[0];

  // Get playlist from data and render on screen
  const playlistContainer = document.getElementById("playlist-cards");
  playlistsData.playlists.forEach((playlist) => {
    const card = createPlaylistCard(playlist);
    playlistContainer.appendChild(card);
  });

  // Function to create playlist cards
  function createPlaylistCard(playlist) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
       <img src="${playlist.playlist_art}" alt="cover">
       <h3>${playlist.playlist_name}</h3>
       <p>${playlist.playlist_creator}</p>
      <div class="like-container">
         <span class="heart-icon">&#x2665;</span>
         <span class="like_count">${playlist.likeCount}</span>
      </div>
     `;

    // Add event listener to open modal with playlist details
    card.addEventListener("click", (event) => {
      if (!event.target.classList.contains("heart-icon")) {
        openModal(playlist);
      }
    });

    // Heart icon Like/Unlike feature
    const heartIcon = card.querySelector(".heart-icon");
    heartIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      const likeCountElement = heartIcon.nextElementSibling;
      let likeCount = parseInt(likeCountElement.textContent);
      if (heartIcon.classList.contains("liked")) {
        likeCount--;
        heartIcon.classList.remove("liked");
      } else {
        likeCount++;
        heartIcon.classList.add("liked");
      }
      likeCountElement.textContent = likeCount;
      playlist.likeCount = likeCount;
    });

    return card;
  }

  // Function to open the modal with playlist details
  function openModal(playlist) {
    // Populate playlist details in the modal
    document.getElementById("playlist_name").textContent =
      playlist.playlist_name;
    document.getElementById("playlist_art").src = playlist.playlist_art;
    document.getElementById(
      "playlist_creator"
    ).innerText = `Creator: ${playlist.playlist_creator}`;
    document.getElementById(
      "like_count"
    ).innerText = `Likes: ${playlist.likeCount}`;

    // Populate song list in the modal
    const songList = document.getElementById("songs_list");
    songList.innerHTML = playlist.songs
      .map(
        (song) => `
           <li>
             <img src="${song.cover_art}" alt="${song.title} cover art">
             <div>
               <strong>${song.title}</strong> by ${song.artist}
               <p>Album: ${song.album}</p>
               <p>Duration: ${song.duration}</p>
             </div>
           </li>
         `
      )
      .join("");

    modal.style.display = "block";
  }

  // Event Listener to Shuffle Songs
  document.getElementById("shuffle-button").addEventListener("click", () => {
    // shuffling songs randomly
    const songList = document.getElementById("songs_list");
    const songs = Array.from(songList.children);
    songs.sort(() => Math.random() - 0.5);
    songList.innerHTML = "";
    songs.forEach((song) => songList.appendChild(song));
  });

  // Close modal for close button
  span.onclick = function () {
    modal.style.display = "none";
  };

  // Close modal for clicking outside of modal
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Function to filter playlists
  function filterPlaylists(query) {
    const cards = playlistContainer.getElementsByClassName("card");
    for (let card of cards) {
      const playlistName = card.getElementsByTagName("h3")[0].textContent.toLowerCase();
      const playlistCreator = card.getElementsByTagName("p")[0].textContent.toLowerCase();
      if (playlistName.includes(query) || playlistCreator.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  }

  // Event listener for the search input
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    filterPlaylists(query);
  });
});
