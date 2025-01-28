document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const songList = document.getElementById('song-list');
    const volumeSlider = document.getElementById('volume-slider');
    const timeSlider = document.getElementById('time-slider');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentSongTitle = document.getElementById('current-song-title');
    const currentArtist = document.getElementById('current-artist');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const vinylDisc = document.querySelector('.vinyl-disc');
    const searchInput = document.getElementById('search-input');
    const lightModeBtn = document.getElementById('light-mode-btn');
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const musicPlayerContainer = document.querySelector('.music-player-container');
    const albumSidebarTitle = document.getElementById('album-sidebar-title');
    const sidebarPlaylist = document.getElementById('sidebar-playlist');

// Songs for the album
const albumSongs = {
    1: [
        { title: 'A Stand that Existed', artist: 'TToU', url: 'A%20Stand%20that%20Existed.mp3' },
        { title: 'Allocation Task Force', artist: 'TToU', url: 'Allocation%20Task%20Force.mp3' },
        { title: 'Alternates', artist: 'TToU', url: 'Alternates.mp3' },
        { title: 'Andr', artist: 'TToU', url: 'Andr.mp3' },
        { title: 'Anywhere in The Universe', artist: 'TToU', url: 'Anywhere%20in%20The%20Universe.mp3' },
        { title: 'Average Alternate', artist: 'TToU', url: 'Average%20Alternate.mp3' },
        { title: 'Casual', artist: 'TToU', url: 'Casual.mp3' },
        { title: 'Core of The Universe and All Knowledge', artist: 'TToU', url: 'Core%20of%20The%20Universe%20and%20All%20Knowledge.mp3' },
        { title: 'Cyber Trap', artist: 'TToU', url: 'Cyber%20Trap.mp3' },
        { title: 'Der Teemeister aus der Leere', artist: 'TToU', url: 'Der%20Teemeister%20aus%20der%20Leere.mp3' },
        { title: 'Futuristic World', artist: 'TToU', url: 'Futuristic%20World.mp3' },
        { title: 'G Foundation', artist: 'TToU', url: 'G%20Foundation.mp3' },
        { title: 'G-033', artist: 'TToU', url: 'G-033.mp3' },
        { title: 'G-Adv', artist: 'TToU', url: 'G-Adv.mp3' },
        { title: 'Guardian of the Cosmos', artist: 'TToU', url: 'Guardian%20of%20the%20Cosmos.mp3' },
        { title: 'H0RR0R', artist: 'TToU', url: 'H0RR0R.mp3' },
        { title: 'Holyght', artist: 'TToU', url: 'Holyght.mp3' },
        { title: 'I can see', artist: 'TToU', url: 'I%20can%20see.mp3' }
    ]
};


    let currentSongIndex = 0;
    let currentAlbum = 1;
    let songs = albumSongs[currentAlbum];

    // Theme toggle functionality
    lightModeBtn.addEventListener('click', () => {
        document.body.classList.add('light-mode');
        lightModeBtn.classList.add('active');
        darkModeBtn.classList.remove('active');
    });

    darkModeBtn.addEventListener('click', () => {
        document.body.classList.remove('light-mode');
        darkModeBtn.classList.add('active');
        lightModeBtn.classList.remove('active');
    });

    // Sidebar and Overlay Toggle
    const playlistToggle = document.getElementById('playlist-toggle');
    playlistToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        musicPlayerContainer.classList.toggle('blurred');
    });

    // Close sidebar when clicking overlay
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        musicPlayerContainer.classList.remove('blurred');
    });

    // Album selection with expanded playlist
    const albumOptions = document.querySelectorAll('.album-option');
    albumOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all albums and song lists
            albumOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked album
            option.classList.add('active');
            
            // Update current album
            currentAlbum = parseInt(option.dataset.album);
            songs = albumSongs[currentAlbum];
            
            // Repopulate playlist
            populatePlaylist(songs);
        });
    });

    // Populate playlist
    function populatePlaylist(songsToShow) {
        songList.innerHTML = '';
        songsToShow.forEach((song, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${song.title}</span>
                <span>${song.artist}</span>
            `;
            li.addEventListener('click', () => playSong(index));
            songList.appendChild(li);
        });
    }

    function playSong(index) {
        currentSongIndex = index;
        const song = songs[index];
        audioPlayer.src = song.url;
        audioPlayer.play();
        
        // Update UI
        currentSongTitle.textContent = song.title;
        currentArtist.textContent = song.artist;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        vinylDisc.classList.add('spinning');

        // Highlight active song
        const listItems = songList.querySelectorAll('li');
        listItems.forEach(item => item.classList.remove('active'));
        listItems[index].classList.add('active');
    }

    // Album sidebar title click to expand playlist
    albumSidebarTitle.addEventListener('click', () => {
        sidebarPlaylist.innerHTML = ''; // Clear previous content
        
        // Populate with all songs from all albums
        Object.values(albumSongs).forEach((albumSongList, albumIndex) => {
            const albumTitle = `TToU OST #${albumIndex + 1}`;
            
            albumSongList.forEach((song, songIndex) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${song.title}</span>
                    <span>${song.artist}</span>
                `;
                li.addEventListener('click', () => {
                    // Switch to correct album and play song
                    currentAlbum = albumIndex + 1;
                    songs = albumSongs[currentAlbum];
                    playSong(songIndex);
                    
                    // Close sidebar
                    sidebar.classList.remove('open');
                    overlay.classList.remove('active');
                    musicPlayerContainer.classList.remove('blurred');
                });
                sidebarPlaylist.appendChild(li);
            });
        });

        sidebarPlaylist.classList.toggle('active');
    });

    // Update the album title in the sidebar
    albumSidebarTitle.textContent = 'The Tale of Universe OST';

    // Play/Pause control
    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            vinylDisc.classList.add('spinning');
        } else {
            audioPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            vinylDisc.classList.remove('spinning');
        }
    });

    // Next and Previous controls
    nextBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(currentSongIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(currentSongIndex);
    });

    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
    });

    // Time slider and time tracking
    audioPlayer.addEventListener('timeupdate', () => {
        const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        timeSlider.value = percentage;

        // Update current time
        const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
        const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    });

    audioPlayer.addEventListener('loadedmetadata', () => {
        // Set total time
        const totalMinutes = Math.floor(audioPlayer.duration / 60);
        const totalSeconds = Math.floor(audioPlayer.duration % 60);
        totalTimeEl.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    });

    // Time slider seeking
    timeSlider.addEventListener('input', (e) => {
        const time = (e.target.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = time;
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        // Only filter if a playlist is currently visible
        const playlistSection = document.querySelector('.playlist-section');
        if (!playlistSection.classList.contains('is-hidden')) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredSongs = songs.filter(song => 
                song.title.toLowerCase().includes(searchTerm) || 
                song.artist.toLowerCase().includes(searchTerm)
            );
            populatePlaylist(filteredSongs);
        }
    });

    // Initial playlist population
    populatePlaylist(songs);
});
