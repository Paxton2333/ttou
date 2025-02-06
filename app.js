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
    const playModeToggle = document.getElementById('play-mode-toggle');
    const searchBtn = document.getElementById('search-btn');
    const searchResultsSidebar = document.querySelector('.search-results-sidebar');
    const searchResultsList = document.getElementById('search-results-list');
    const closeSearchResultsBtn = document.getElementById('close-search-results');
    const downloadSongBtn = document.getElementById('download-song-btn');

    // Play mode constants
    const PLAY_MODES = {
        ORDER: 'order',
        LOOP_ONE: 'loop-one',
        RANDOM: 'random',
        STOP: 'stop'
    };

    let currentPlayMode = PLAY_MODES.ORDER;

    // Songs for the albums
    const albumSongs = {
        1: [
            { title: 'A Stand that Existed', artist: 'TToU', url: 'aste.mp3' },
            { title: 'Allocation Task Force', artist: 'TToU', url: 'Allocation%20Task%20Force.mp3' },
            { title: 'Alternate in his Place', artist: 'TToU', url: 'Alternate%20in%20his%20Place.mp3' },
            { title: 'Alternates', artist: 'TToU', url: 'Alternates.mp3' },
            { title: 'Andr', artist: 'TToU', url: 'Andr.mp3' },
            { title: 'Anywhere in The Universe', artist: 'TToU', url: 'Anywhere%20in%20The%20Universe.mp3' },
            { title: 'Asylum', artist: 'TToU', url: 'Asylum.mp3' },
            { title: 'Average Alternate', artist: 'TToU', url: 'Average%20Alternate.mp3' },
            { title: 'Boxage', artist: 'TToU', url: 'Boxage.mp3' },
            { title: 'Carnage', artist: 'TToU', url: 'Carnage.mp3' },
            { title: 'Casual', artist: 'TToU', url: 'Casual.mp3' },
            { title: 'Core of The Universe and All Knowledge', artist: 'TToU', url: 'Core%20of%20The%20Universe%20and%20All%20Knowledge.mp3' },
            { title: 'Cube of Sixth Stage Seal', artist: 'TToU', url: 'Cube%20of%20Sixth%20Stage%20Seal.mp3' },
            { title: 'Cyber Trap', artist: 'TToU', url: 'Cyber%20Trap.mp3' },
            { title: 'Der Teemeister aus der Leere', artist: 'TToU', url: 'Der%20Teemeister%20aus%20der%20Leere.mp3' },
            { title: 'Descendant', artist: 'TToU', url: 'Descendant.mp3' },
            { title: 'Destiny', artist: 'TToU', url: 'Destiny.mp3' },
            { title: 'Expandable', artist: 'TToU', url: 'Expandable.mp3' },
            { title: 'Extended Madness Distorted Awareness Disorder', artist: 'TToU', url: 'Extended%20Madness%20Distorted%20Awareness%20Disorder.mp3' },
            { title: 'Frenzy', artist: 'TToU', url: 'Frenzy.mp3' },
            { title: 'Futuristic World', artist: 'TToU', url: 'Futuristic%20World.mp3' },
            { title: 'G Foundation', artist: 'TToU', url: 'G%20Foundation.mp3' },
            { title: 'G-033', artist: 'TToU', url: 'G-033.mp3' },
            { title: 'G-Adv', artist: 'TToU', url: 'G-Adv.mp3' },
            { title: 'Guardian of the Cosmos', artist: 'TToU', url: 'Guardian%20of%20the%20Cosmos.mp3' },
            { title: 'H0RR0R', artist: 'TToU', url: 'H0RR0R.mp3' },
            { title: 'Hantrence', artist: 'TToU', url: 'Hantrence.mp3' },
            { title: 'Holyght', artist: 'TToU', url: 'Holyght.mp3' },
            { title: 'Hunter in the Compound', artist: 'TToU', url: 'Hunter%20in%20the%20Compound.mp3' },
            { title: 'I can see', artist: 'TToU', url: 'I%20can%20see.mp3' },
            { title: 'I care about whatever I see', artist: 'TToU', url: 'I%20care%20about%20whatever%20I%20see.mp3' },
            { title: 'Immortal Ascension', artist: 'TToU', url: 'Immortal%20Ascension.mp3' },
            { title: 'Joker Joker', artist: 'TToU', url: 'Joker%20Joker.mp3' },
            { title: 'K@n0sk1', artist: 'TToU', url: 'K@n0sk1.mp3' },
            { title: 'Kamustrophy', artist: 'TToU', url: 'Kamustrophy.mp3' },
            { title: 'L1ght', artist: 'TToU', url: 'L1ght.mp3' },
            { title: 'Late Night Whispers', artist: 'TToU', url: 'Late%20Night%20Whispers.mp3' },
            { title: 'Lurker', artist: 'TToU', url: 'Lurker.mp3' },
            { title: 'M4N1F35T10N', artist: 'TToU', url: 'M4N1F35T10N.mp3' },
            { title: 'Metal Army', artist: 'TToU', url: 'Metal%20Army.mp3' },
            { title: 'Metal Scratches', artist: 'TToU', url: 'Metal%20Scratches.mp3' },
            { title: 'My rain flowing in your vein', artist: 'TToU', url: 'My%20rain%20flowing%20in%20your%20vein.mp3' },
            { title: 'Once upon a time', artist: 'TToU', url: 'Once%20upon%20a%20time.mp3' },
            { title: 'Orbitation', artist: 'TToU', url: 'Orbitation.mp3' },
            { title: 'Overload', artist: 'TToU', url: 'Overload.mp3' },
            { title: 'Phonkage', artist: 'TToU', url: 'Phonkage.mp3' },
            { title: 'Purple Flash', artist: 'TToU', url: 'Purple%20Flash.mp3' },
            { title: 'Reese', artist: 'TToU', url: 'Reese.mp3' },
            { title: 'Reluctance', artist: 'TToU', url: 'Reluctance.mp3' },
            { title: 'Run as Fast as you can', artist: 'TToU', url: 'Run%20as%20Fast%20as%20you%20can.mp3' },
            { title: 'Screams', artist: 'TToU', url: 'Screams.mp3' },
            { title: 'Soft tunes', artist: 'TToU', url: 'Soft%20tunes.mp3' },
            { title: 'TV-er', artist: 'TToU', url: 'TV-er.mp3' },
            { title: 'Technique of Brain', artist: 'TToU', url: 'Technique%20of%20Brain.mp3' },
            { title: 'The Alternate Scientist', artist: 'TToU', url: 'The%20Alternate%20Scientist.mp3' },
            { title: 'The Emperor', artist: 'TToU', url: 'The%20Emperor.mp3' },
            { title: 'The First Alternate', artist: 'TToU', url: 'The%20First%20Alternate.mp3' },
            { title: 'The LordGods', artist: 'TToU', url: 'The%20LordGods.mp3' },
            { title: 'The Most Perfect Alternate Exist', artist: 'TToU', url: 'The%20Most%20Perfect%20Alternate%20Exist.mp3' },
            { title: 'The Old Duke', artist: 'TToU', url: 'The%20Old%20Duke.mp3' },
            { title: 'The Security Director', artist: 'TToU', url: 'The%20Security%20Director.mp3' },
            { title: 'The Space Blitzkrieg', artist: 'TToU', url: 'The%20Space%20Blitzkrieg.mp3' },
            { title: 'The True Speech', artist: 'TToU', url: 'The%20True%20Speech.mp3' },
            { title: 'Tragic', artist: 'TToU', url: 'Tragic.mp3' },
            { title: 'True Nature of Nullify Everything', artist: 'TToU', url: 'True%20Nature%20of%20Nullify%20Everything.mp3' },
            { title: 'UW1', artist: 'TToU', url: 'UW1.mp3' },
            { title: 'Universal Assassin Organization', artist: 'TToU', url: 'Universal%20Assassin%20Organization.mp3' },
            { title: 'Universal Weapon Association', artist: 'TToU', url: 'Universal%20Weapon%20Association.mp3' },
            { title: 'Universe Empire', artist: 'TToU', url: 'Universe%20Empire.mp3' },
            { title: 'Veroy', artist: 'TToU', url: 'Veroy.mp3' },
            { title: 'Voidus Abyssal Series', artist: 'TToU', url: 'Voidus%20Abyssal%20Series.mp3' },
            { title: 'Watching us, Laughing at us', artist: 'TToU', url: 'Watching%20us%2C%20Laughing%20at%20us.mp3' },
            { title: 'Wretched Arm', artist: 'TToU', url: 'Wretched%20Arm.mp3' },
            { title: 'Xylo the Phone', artist: 'TToU', url: 'Xylo%20the%20Phone.mp3' },
            { title: 'Buoyancy', artist: 'TToU', url: 'Buoyancy.mp3' },
            { title: 'C3RT41N', artist: 'TToU', url: 'C3RT41N.mp3' },
            { title: 'Core', artist: 'TToU', url: 'Core.mp3' },
            { title: 'Cotton', artist: 'TToU', url: 'Cotton.mp3' },
            { title: 'Crunchy', artist: 'TToU', url: 'Crunchy.mp3' },
            { title: 'Cyst', artist: 'TToU', url: 'Cyst.mp3' },
            { title: 'Darkest Tide', artist: 'TToU', url: 'Darkest%20Tide.mp3' },
            { title: 'Deep Water', artist: 'TToU', url: 'Deep%20Water.mp3' },
            { title: 'Duo-Minded', artist: 'TToU', url: 'Duo-Minded.mp3' },
            { title: 'End', artist: 'TToU', url: 'End%20.mp3' },
            { title: 'Epicness', artist: 'TToU', url: 'Epicness.mp3' },
            { title: 'Fantastic', artist: 'TToU', url: 'Fantastic.mp3' },
            { title: 'Fearless, Braveness, Hopeless...', artist: 'TToU', url: 'Fearless%2C%20Braveness%2C%20Hopeless..mp3' },
            { title: 'His and Her Creation', artist: 'TToU', url: 'His%20and%20Her%20Creation.mp3' },
            { title: 'Industrious', artist: 'TToU', url: 'Industrious.mp3' },
            { title: 'Iu', artist: 'TToU', url: 'Iu.mp3' },
            { title: 'Jumping on life', artist: 'TToU', url: 'Jumping%20on%20life.mp3' },
            { title: 'Kearo', artist: 'TToU', url: 'Kearo.mp3' },
            { title: 'Kirk', artist: 'TToU', url: 'Kirk.mp3' },
            { title: 'Listen', artist: 'TToU', url: 'Listen.mp3' },
            { title: 'Macula', artist: 'TToU', url: 'Macula.mp3' },
            { title: 'Man im dead', artist: 'TToU', url: 'Man%20im%20dead.mp3' },
            { title: 'Mechanics', artist: 'TToU', url: 'Mechanics.mp3' },
            { title: 'Mess', artist: 'TToU', url: 'Mess.mp3' },
            { title: 'Morphin and Mimicin', artist: 'TToU', url: 'Morphin%20and%20Mimicin.mp3' },
            { title: 'Nah Im Done', artist: 'TToU', url: 'Nah%20Im%20Done.mp3' },
            { title: 'Ohioic', artist: 'TToU', url: 'Ohioic.mp3' },
            { title: 'Other side', artist: 'TToU', url: 'Other%20side.mp3' },
            { title: 'Pablo', artist: 'TToU', url: 'Pablo.mp3' },
            { title: 'Pre Timeskip', artist: 'TToU', url: 'Pre%20Timeskip.mp3' },
            { title: 'Prediction', artist: 'TToU', url: 'Prediction.mp3' },
            { title: 'Prpr', artist: 'TToU', url: 'Prpr.mp3' },
            { title: 'Roofing', artist: 'TToU', url: 'Roofing.mp3' },
            { title: 'Runting', artist: 'TToU', url: 'Runting.mp3' },
            { title: 'Scrrr', artist: 'TToU', url: 'Scrrr.mp3' },
            { title: 'The Rock n Roll Music', artist: 'TToU', url: 'The%20Rock%20n%20Roll%20Music.mp3' },
            { title: 'The Universe Biggest Arm Dealer', artist: 'TToU', url: 'The%20Universe%20Biggest%20Arm%20Dealer.mp3' },
            { title: 'Trant', artist: 'TToU', url: 'Trant.mp3' },
            { title: 'Undead Rising', artist: 'TToU', url: 'Undead%20Rising.mp3' },
            { title: 'Unforgettable Dreams', artist: 'TToU', url: 'Unforgettable%20Dreams.mp3' },
            { title: 'What', artist: 'TToU', url: 'What.mp3' },
            { title: '86-79-73-68-32-73-83-32-65-80-80-82-79-65-67-72-73-78-71', artist: 'TToU', url: '86-79-73-68-32-73-83-32-65-80-80-82-79-65-67-72-73-78-71.mp3' },
            { title: 'Creek', artist: 'TToU', url: 'Creek.mp3' },
            { title: 'Distorta Inanis', artist: 'TToU', url: 'Distorta%20Inanis.mp3' },
            { title: 'Gardeners', artist: 'TToU', url: 'Gardeners.mp3' },
            { title: 'HESO Squad 3', artist: 'TToU', url: 'HESO%20Squad%203.mp3' },
            { title: 'I got nothing left behind', artist: 'TToU', url: 'I%20got%20nothing%20left%20behind.mp3' },
            { title: 'Nty', artist: 'TToU', url: 'Nty.mp3' },
            { title: 'The time is up', artist: 'TToU', url: 'The%20time%20is%20up.mp3' },
            { title: 'Unbreakable Charge', artist: 'TToU', url: 'Unbreakable%20Charge.mp3' },
            { title: 'Wave', artist: 'TToU', url: 'Wave.mp3' },
            { title: 'CH1LL1NG', artist: 'TToU', url: 'CH1LL1NG.mp3' },
            { title: '1N73RN4L', artist: 'TToU', url: '1N73RN4L.mp3' },
            { title: '1934', artist: 'TToU', url: '1934.mp3' },
            { title: '1478', artist: 'TToU', url: '1478.mp3' },
            { title: 'Tyance', artist: 'TToU', url: 'Tyance.mp3' },
            { title: 'Rhapsody', artist: 'TToU', url: 'Rhapsody.mp3' },
            { title: 'Renting Support', artist: 'TToU', url: 'Renting%20Support.mp3' },
            { title: 'Drifting', artist: 'TToU', url: 'Drifting.mp3' },
            { title: 'On Call', artist: 'TToU', url: 'On%20Call.mp3' },
            { title: 'Driving', artist: 'TToU', url: 'Driving.mp3' },
            { title: 'Yeh', artist: 'TToU', url: 'Yeh.mp3' },
            { title: 'Neh', artist: 'TToU', url: 'Neh.mp3' },
            { title: 'Ech', artist: 'TToU', url: 'Ech.mp3' },
            { title: 'H4TR3D', artist: 'TToU', url: 'H4TR3D.mp3' },
            { title: 'Hopk', artist: 'TToU', url: 'Hopk.mp3' },
            { title: 'Pohk', artist: 'TToU', url: 'Pohk.mp3' },
            { title: '7-11', artist: 'TToU', url: '7-11.mp3' },
            { title: 'K0N', artist: 'TToU', url: 'K0N.mp3' },
            { title: 'NOO00O000OO0O0OOO0', artist: 'TToU', url: 'NOO00O000OO0O0OOO0.mp3' },
            { title: 'Reccc', artist: 'TToU', url: 'Reccc.mp3' },
            { title: 'Run4', artist: 'TToU', url: 'Run4.mp3' },
            { title: 'ST0P', artist: 'TToU', url: 'ST0P.mp3' },
            { title: 'Wobble', artist: 'TToU', url: 'Wobble.mp3' },
            { title: 'On Call', artist: 'TToU', url: 'On%20Call.mp3' },
            { title: '魔法少女はぜったい勝つ', artist: 'TToU', url: '魔法少女はぜったい勝つ.mp3' },
            { title: '邪悪結社', artist: 'TToU', url: '邪悪結社.mp3' },
            { title: '你的头为什么是尖尖的', artist: 'TToU', url: '你的头为什么是尖尖的.mp3' },
            { title: 'Beyond the Veil', artist: 'TToU', url: 'Beyond%20the%20Veil.mp3' },
            { title: 'Welcome Foundation', artist: 'TToU', url: 'Welcome%20Foundation.mp3' },
            { title: '魔法少女の覚醒', artist: 'TToU', url: '魔法少女の覚醒.mp3' },
            { title: '「Fight！最強魔法少女たちは今日も世界を救う！」', artist: 'TToU', url: '「Fight！最強魔法少女たちは今日も世界を救う！」.mp3' },
            { title: '「三重の秘密：高校魔法少女たち」', artist: 'TToU', url: '「三重の秘密：高校魔法少女たち」.mp3' }
        ],
        2: [] // Currently empty, can be populated later
    };

    let currentAlbum = 1;
    let songs = albumSongs[currentAlbum];
    let currentSongIndex = 0;

    // Play mode toggle functionality
    function updatePlayModeIcon() {
        const modeIcons = {
            [PLAY_MODES.ORDER]: 'fa-sort-amount-down-alt',
            [PLAY_MODES.LOOP_ONE]: 'fa-repeat',
            [PLAY_MODES.RANDOM]: 'fa-random',
            [PLAY_MODES.STOP]: 'fa-stop'
        };
        playModeToggle.innerHTML = `<i class="fas ${modeIcons[currentPlayMode]}"></i>`;
    }

    playModeToggle.addEventListener('click', () => {
        const modes = Object.values(PLAY_MODES);
        const currentIndex = modes.indexOf(currentPlayMode);
        currentPlayMode = modes[(currentIndex + 1) % modes.length];
        updatePlayModeIcon();
    });

    // Modify the end of song behavior based on play mode
    audioPlayer.addEventListener('ended', () => {
        switch (currentPlayMode) {
            case PLAY_MODES.ORDER:
                nextBtn.click();
                break;
            case PLAY_MODES.LOOP_ONE:
                audioPlayer.currentTime = 0;
                audioPlayer.play();
                break;
            case PLAY_MODES.RANDOM:
                const randomIndex = Math.floor(Math.random() * songs.length);
                playSong(randomIndex);
                break;
            case PLAY_MODES.STOP:
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                vinylDisc.classList.remove('spinning');
                break;
        }
    });

    // Initial icon setup
    updatePlayModeIcon();

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

    // Download current song functionality
    downloadSongBtn.addEventListener('click', () => {
        // If no song is playing, return early
        if (!songs[currentSongIndex]) return;

        const currentSong = songs[currentSongIndex];
        const downloadLink = document.createElement('a');
        
        // Use the current song's URL to create download
        downloadLink.href = currentSong.url;
        downloadLink.download = `${currentSong.title || 'Unknown Track'} - ${currentSong.artist}.mp3`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });

    // Function to perform search across all albums
    function searchTracks(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        const allSongs = Object.values(albumSongs).flat();
        const filteredSongs = allSongs.filter(song => 
            song.title.toLowerCase().includes(searchTerm) || 
            song.artist.toLowerCase().includes(searchTerm)
        );
        return filteredSongs;
    }

    // Function to populate search results
    function populateSearchResults(songs) {
        searchResultsList.innerHTML = '';
        const ul = document.createElement('ul');
        
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${song.title}</span>
                <span>${song.artist}</span>
            `;
            li.addEventListener('click', () => {
                // Find the album and index of the song
                for (const [albumId, albumSongList] of Object.entries(albumSongs)) {
                    const songIndex = albumSongList.findIndex(s => 
                        s.title === song.title && s.artist === song.artist
                    );
                    if (songIndex !== -1) {
                        currentAlbum = parseInt(albumId);
                        songs = albumSongs[currentAlbum];
                        playSong(songIndex);
                        break;
                    }
                }
                
                // Close search results sidebar
                searchResultsSidebar.classList.remove('open');
            });
            ul.appendChild(li);
        });
        
        searchResultsList.appendChild(ul);
    }

    // Search button click event
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            const results = searchTracks(searchTerm);
            populateSearchResults(results);
            searchResultsSidebar.classList.add('open');
        }
    });

    // Close search results sidebar
    closeSearchResultsBtn.addEventListener('click', () => {
        searchResultsSidebar.classList.remove('open');
    });

    // Allow search on enter key press
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
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
