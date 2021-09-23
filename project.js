function initialize() {
    const videoInput = document.getElementById('video-input');
    const playBtn = document.getElementById('play-btn');

    playBtn.addEventListener('click', () => {
        const parameters = document.getElementById('parameters').children;
        const autoplay = parameters[0].checked;
        const controls = parameters[1].checked;
        const loop = parameters[2].checked;
        const muted = parameters[3].checked;

        playVideo(videoInput.value, autoplay, controls, loop, muted);
    });
}

function playVideo(url, autoplay, controls, loop, muted, width, height, preload, poster) {
    addOverlay();

    // Create Video Container
    const videoContainer = document.createElement('div');
    videoContainer.id = 'overlay-video-container';
    document.body.append(videoContainer);

    // Fade in
    setTimeout(() => {
        videoContainer.style.opacity = '1';
    }, 100);

    // YouTube
    if (url.includes('youtube.com')) {
        // Create iframe Container
        const iframeContainer = document.createElement('div');
        iframeContainer.id = 'overlay-iframe-container';

        // Extract YouTube Video ID
        let videoId = '';
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length == 11) videoId = match[2];

        // Create Video
        const video = document.createElement('iframe');
        video.src = 'https://www.youtube.com/embed/' + videoId;

        // Set Parameters
        if (arguments.length > 1) video.src += '?';
        if (autoplay) video.src += 'autoplay=1';
        if (controls == false) video.src += '&controls=0';
        if (loop) video.src += '&loop=1';
        if (muted) video.src += '&mute=1';
        video.allowFullscreen = true;

        // Apend Video
        iframeContainer.append(video);
        videoContainer.append(iframeContainer);
    }
    // Video
    else {
        // Create Video
        const video = document.createElement('video');
        video.id = 'overlay-video';

        // Set Parameters
        if (autoplay) video.autoplay = autoplay;
        if (controls) video.controls = controls;
        if (loop) video.loop = loop;
        if (muted) video.muted = muted;
        if (width) video.width = width;
        if (height) video.height = height;
        if (preload) video.preload = preload;
        if (poster) video.poster = poster;

        // Extract Video Extension
        const ext = url.split(/[#?]/)[0].split('.').pop().trim();

        // Create Source
        const videoSource = document.createElement('source');
        videoSource.src = url;
        videoSource.type = 'video/' + ext;

        // Append Video
        video.append(videoSource);
        videoContainer.append(video);
    }
}

function addOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.addEventListener('click', () => { removeOverlay(); });
    document.body.append(overlay);

    // Fade in
    setTimeout(() => {
        overlay.style.opacity = '0.75';
    }, 100);
}

function removeOverlay() {
    const overlay = document.getElementById('overlay');
    const videoContainer = document.getElementById('overlay-video-container');

    // Fade out
    setTimeout(() => {
        overlay.style.opacity = '0';
        videoContainer.style.opacity = '0';

        setTimeout(() => {
            overlay.remove();
            videoContainer.remove();
        }, 500);
    }, 100);
}

initialize();