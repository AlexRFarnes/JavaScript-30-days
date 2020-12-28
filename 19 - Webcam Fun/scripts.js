const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio:false})
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(() => {
            console.error("You denied the access to the webcam");
        })
}


function paintToCanvas() {
    // pass the video to the canvas element
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height)
        // take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        // Can apply own effects
        pixels = rgbSplit(pixels);
        ctx.globalAlpha = 0.1;
        
       
        // put them back
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    // sound effect
        snap.currentTime = 0;
        snap.play();

    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handosmeAF');
    link.innerHTML = `<img src="${data}" alt="Handomse AF" />`;
    strip.insertBefore(link, strip.firstChild);
}

function rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - 200] = pixels.data[i + 0];
        pixels.data[i - 200] = pixels.data[i + 1];
        pixels.data[i - 500] = pixels.data[i + 2];
    }
    return pixels;
}



getVideo();

video.addEventListener('canplay', paintToCanvas);