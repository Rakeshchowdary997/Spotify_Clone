class MusicPlayer {
    constructor() {
        this.currentAudio = null;
        this.currentButton = null;
        this.songs = {
            'Baby': 'songs/baby.mp3',
            'Ala Vaikunthapurramuloo': 'songs/ala.mp3',
            'Starboy': 'songs/starboy.mp3',
            'Fear Song[TELUGU]': 'songs/fear.mp3',
            'Satranga': 'songs/satranga.mp3',
            'Aashiqui 2': 'songs/item-6.mp3',
            'Heeriye': 'songs/heeriye.mp3',
            'DARSHANA': 'songs/darshana.mp3',
            'Srivalli': 'songs/srivalli.mp3',
            'Neeve': 'songs/neeve.mp3',
            'Raataan Lambiyan': 'songs/raatan.mp3',
            'Kesariya': 'songs/kesariya.mp3',
            'M.S.Dhoni': 'songs/msdhoni.mp3',
            'Chaleya': 'songs/chaleya.mp3',
            'Apna Bana Le': 'songs/apna.mp3'
        };

        this.initializePlayButtons();
    }

    initializePlayButtons() {
        const playButtons = document.querySelectorAll('.play-btn');
        playButtons.forEach(button => {
            // Add pause icon
            button.innerHTML = `
                <span>
                    <i class="fa-solid fa-play"></i>
                    <i class="fa-solid fa-pause"></i>
                </span>
            `;

            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handlePlayClick(button);
            });
        });
    }

    handlePlayClick(button) {
        const songTitle = button.closest('.item').querySelector('h4').textContent;
        const songPath = this.songs[songTitle] || this.songs[songTitle.split('(')[0].trim()];

        if (!songPath) {
            console.error('Song not found:', songTitle);
            return;
        }

        if (this.currentButton === button && this.currentAudio) {
            // Same song clicked - toggle play/pause
            if (this.currentAudio.paused) {
                this.currentAudio.play();
                button.classList.add('playing');
            } else {
                this.currentAudio.pause();
                button.classList.remove('playing');
            }
        } else {
            // Different song clicked
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentButton?.classList.remove('playing');
            }

            this.currentButton = button;
            this.currentAudio = new Audio(songPath);
            
            this.currentAudio.addEventListener('ended', () => {
                button.classList.remove('playing');
            });

            this.currentAudio.addEventListener('error', () => {
                console.error('Error playing audio file:', songPath);
                button.classList.remove('playing');
            });

            this.currentAudio.play().then(() => {
                button.classList.add('playing');
            }).catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    }
}

// Initialize the music player when the page loads
window.addEventListener('DOMContentLoaded', () => {
    const player = new MusicPlayer();
});