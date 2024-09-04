document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.video');
    const audioTrack = document.getElementById('audio-track');

    let isPlaying = false;

    const syncVideos = (event) => {
        const currentTime = event.target.currentTime;
        videos.forEach(video => {
            if (Math.abs(video.currentTime - currentTime) > 0.1) {
                video.currentTime = currentTime;
            }
        });
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioTrack.pause();
            videos.forEach(video => video.pause());
        } else {
            audioTrack.play();
            videos.forEach(video => video.play());
        }
        isPlaying = !isPlaying;
    };

    const enterFullscreen = (event) => {
        const video = event.target;
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) { // Safari
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE11
            video.msRequestFullscreen();
        }
    };

    // Синхронизация видео при изменении времени
    videos.forEach(video => {
        video.addEventListener('timeupdate', syncVideos);
        video.addEventListener('click', enterFullscreen);
    });

    // Управление воспроизведением
    audioTrack.addEventListener('play', togglePlay);
    audioTrack.addEventListener('pause', togglePlay);
});
