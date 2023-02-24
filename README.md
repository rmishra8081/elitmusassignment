# elitmusassignment


Here is the Link of deployement :- https://rmishra8081.github.io/elitmusassignment/



Frontend (Chrome Extension):

Use HTML, CSS, and JavaScript to create the extension's user interface.
Use the Chrome Extension API to communicate with the backend server, perform audio and video checks, and capture images from the user's webcam.
Implement a form that allows the user to enter their name, email, and test invitation code.
On submission of the form, send a POST request to the backend server to store the user's information.
Display the user's live webcam feed on the page.
Capture and send images of the user to the backend server at configurable intervals (using the Chrome Extension API).
Implement error handling and display appropriate error messages to the user.

HTML PART

<!DOCTYPE html>
<html>
  <head>
    <title>Test Proctoring Extension</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Test Proctoring Extension</h1>
    <form id="test-form">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <label for="code">Test Invitation Code:</label>
      <input type="text" id="code" name="code" required>
      <button type="submit" id="start-test">Start Test</button>
    </form>
    <div id="video-container">
      <video id="video" autoplay></video>
    </div>
  </body>
  <script src="script.js"></script>
</html>


The code I provided earlier is the HTML code for the frontend of the Chrome extension. It consists of the following components:

The <!DOCTYPE html> declaration at the top of the code specifies that this is an HTML document.

The <html> tag indicates the start of an HTML document, and everything inside this tag is HTML code.

The <head> tag contains information about the document, such as the title of the page and links to external files. In this case, it contains a reference to an external stylesheet file called style.css.

The <title> tag specifies the title of the page, which appears in the browser's title bar.

The <link> tag with rel="stylesheet" and href="style.css" attributes links to an external CSS file called style.css, which is used to style the HTML elements.

The <body> tag contains all the visible content of the page.

The <h1> tag contains the heading of the page.

The <form> tag contains a form that allows the user to input their name, email, and test invitation code.

The <label> tags provide a label for each form input.

The <input> tags specify the form inputs, with type, id, and name attributes. The required attribute indicates that the user must fill in these fields before submitting the form.

The <button> tag specifies a button that the user clicks to start the test.

The <div> tag creates a container for the video element.

The <video> tag creates a video element that will display the user's webcam feed once the test has started. The autoplay attribute starts the video automatically when the page is loaded.

The final <script> tag specifies a link to an external JavaScript file called script.js, which will contain the logic for the frontend of the extension.

CSS PART

body {
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

label {
  margin-top: 10px;
}

input {
  width: 250px;
  padding: 5px;
  margin-left: 10px;
}

button {
  margin-top: 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

#video-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

#video {
  width: 640px;
  height: 480px;
  border: 2px solid black;
}
The code provided is CSS code, which is used to style the HTML elements in the frontend of the Chrome extension. It applies styles to the different elements of the HTML code, including the form, input fields, button, and video container. Let's go over each style rule:

body: sets the font family for the entire document to Arial or a sans-serif font.

h1: centers the text of the heading.

form: sets the display property to flex, which allows us to use flexbox properties to style the form elements. The flex direction is set to column, which stacks the form elements on top of each other. The align-items property centers the form elements horizontally. The margin-top property creates space between the heading and the form.

label: sets the margin-top property to create space between each form input and its label.

input: sets the width property of the input fields to 250px, adds padding of 5px, and adds left margin of 10px. This creates a consistent size and spacing for the input fields.

button: styles the button with a green background color, white text, and no border. The padding creates a button size, the text-align property centers the text horizontally, the border-radius creates rounded corners, and the cursor property changes the mouse pointer to a hand when hovering over the button.

#video-container: sets the margin-top property to create space between the form and the video container. The display property is set to flex, which centers the video element horizontally using justify-content.

#video: sets the width and height properties of the video element to 640px and 480px, respectively. The border property adds a 2px solid black border around the video element. This creates a consistent size and style for the video element.


JavaScript File

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


This code is an example of a simple JavaScript program that uses WebRTC to access the user's webcam and microphone, captures an image every three minutes, and sends it to a backend server for test proctoring purposes.

The program starts by setting up some constants and variables and defining a set of constraints for the user's webcam and microphone. It then listens for the form submission event and sends the form data to a backend server using the Fetch API.

Once the form data is submitted, the program uses the getUserMedia() method to access the user's webcam and microphone and displays the video stream on the page. It also sets up an interval that captures an image from the video stream every three minutes using the captureImage() function.

The captureImage() function creates a new canvas element, draws the current frame from the video stream onto the canvas, and converts the canvas to a base64-encoded image data URL using the toDataURL() method. It then sends the image data and a timestamp to the backend server using the Fetch API.

Finally, the program sets up an event listener to stop the video and audio streams and clear the interval that captures images when the window is closed.
