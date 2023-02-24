const form = document.getElementById('test-form');
const startTestButton = document.getElementById('start-test');
const video = document.getElementById('video');
const videoContainer = document.getElementById('video-container');
let intervalId;

// Set up getUserMedia constraints for video and audio
const constraints = {
  video: true,
  audio: true
};

// Handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.elements['name'].value;
  const email = form.elements['email'].value;
  const code = form.elements['code'].value;
  const data = {
    name,
    email,
    code
  };
  // Send data to backend server
  fetch('https://example.com/api/start-test', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
  // Start video and audio streams
  startMedia();
});

// Get video and audio streams
function startMedia() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      video.srcObject = stream;
      video.play();
      videoContainer.style.display = 'block';
      // Start image capture at 3 minute intervals
      intervalId = setInterval(() => {
        captureImage();
      }, 180000);
    })
    .catch(error => {
      console.error(error);
    });
}

// Capture and send image to backend server
function captureImage() {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL('image/png');
  const data = {
    image: imageData,
    timestamp: Date.now()
  };
  // Send image data to backend server
  fetch('https://example.com/api/capture-image', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
}

// Stop video and audio streams when window is closed
window.addEventListener('beforeunload', () => {
  clearInterval(intervalId);
  video.pause();
  video.srcObject.getTracks().forEach(track => track.stop());
});

