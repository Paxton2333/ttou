import { albumSongs } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
    const downloadAlbumsBtn = document.getElementById('download-albums-btn');
    const downloadAlbumsModal = document.getElementById('download-albums-modal');
    const downloadAlbumsList = document.getElementById('download-albums-list');

    downloadAlbumsBtn.addEventListener('click', () => {
        downloadAlbumsModal.classList.add('show');
        populateAlbumsList();
    });

    // Close modal when clicking outside
    downloadAlbumsModal.addEventListener('click', (e) => {
        if (e.target === downloadAlbumsModal) {
            downloadAlbumsModal.classList.remove('show');
        }
    });

    function populateAlbumsList() {
        downloadAlbumsList.innerHTML = '';
        Object.keys(albumSongs).forEach((albumId) => {
            const albumOption = document.createElement('div');
            albumOption.classList.add('download-album-option');
            albumOption.textContent = `Download Album ${albumId}`;
            albumOption.addEventListener('click', () => downloadAlbum(albumId));
            downloadAlbumsList.appendChild(albumOption);
        });
    }

    async function downloadAlbum(albumId) {
        // Dynamically import JSZip
        const { default: JSZip } = await import('https://cdn.jsdelivr.net/npm/jszip@3.10.0/dist/jszip.min.js');
        
        const zip = new JSZip();
        const albumTracks = albumSongs[albumId];
        
        // Track download progress
        const downloadPromises = albumTracks.map(async (song) => {
            try {
                const response = await fetch(song.url);
                const blob = await response.blob();
                zip.file(song.title + '.mp3', blob);
            } catch (error) {
                console.error(`Failed to download ${song.title}:`, error);
            }
        });

        // Wait for all tracks to be added to zip
        await Promise.all(downloadPromises);

        // Generate the zip file
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        
        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(zipBlob);
        downloadLink.download = `TToU_Album_${albumId}.zip`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // Close the modal
        downloadAlbumsModal.classList.remove('show');
    }
});
