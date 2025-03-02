
if (window.location.href.includes('embeds')) {
  startClickListenerOnImages();
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('received message');
  if (message.action === 'startListening') {
    startClickListenerOnImages();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'stopListening') {
      stopClickListenerOnImages();

  }
});

// Define the function for handling click events on images
function handleImageClick(event) {
  if (event.target.tagName === 'IMG') {
    const imgSrc = event.target.src;
    downloadImage(imgSrc);
  }
}

// Define the function for handling mouseover events on images
function handleImageMouseOver(event) {
  if (event.target.tagName === 'IMG') {
    event.target.style.cursor = `pointer`;
  }
}

// Function to start the click and mouseover listeners
function startClickListenerOnImages() {
  // Add the click event listener
  document.body.addEventListener('click', handleImageClick);
  
  // Add the mouseover event listener
  document.body.addEventListener('mouseover', handleImageMouseOver);
}

// Function to stop the click and mouseover listeners
function stopClickListenerOnImages() {
  // Remove the click event listener
  document.body.removeEventListener('click', handleImageClick);
  
  // Remove the mouseover event listener
    document.body.removeEventListener('mouseover', handleImageMouseOver);
    resetCursorStyle();
}

function downloadImage(imgSrc) {
  const a = document.createElement('a');
  a.href = imgSrc;
    a.download = imgSrc.split('/').pop();  // Use the image's name as the filename for the download
    a.target = '_blank'
    a.title = "Ouvrir l'image";
  a.click();  // Trigger the download
}

function resetCursorStyle() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.style.cursor = '';  // Reset the cursor to default
  });
}