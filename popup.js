let listenerActive = false;
document.addEventListener('DOMContentLoaded', function () {
  // Get the current active tab when the popup is loaded
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentUrl = tabs[0].url;  // Get the current URL of the active tab
    console.log(currentUrl);

    // If the URL contains 'embeds', start the listener immediately
    if (currentUrl.includes('embeds')) {
    //   chrome.tabs.sendMessage(tabs[0].id, { action: 'startListening' });
      listenerActive = true;
        updatePopup();
        document.getElementById('stopBtn').addEventListener('click', function () {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'stopListening' })
        });
    } else {
      // If the URL doesn't include 'embeds', set up the button listener for the start button
      document.getElementById('startBtn').addEventListener('click', function () {
        const modifiedUrl = modifyUrl(currentUrl);
        chrome.tabs.create({ url: modifiedUrl }, function (newTab) {
          chrome.tabs.sendMessage(newTab.id, { action: 'startListening' });
          listenerActive = true;
          console.log(listenerActive);
          updatePopup();
        });
      });
    }
  });
});


function modifyUrl(url) {
  // Change "document" to "embeds" and replace the last part after the last '/' with "content"
    const urlParts = url.split('/');
    console.log(urlParts);
    urlParts[urlParts.length - 1] = 'content';  // Replace the last part of the URL
    let newUrl = '';
    if (url.includes("document")) {
        newUrl = urlParts.join('/').replace('document', 'embeds');  // Change "document" to "embeds"
    } else {
        newUrl = urlParts.join('/').replace('doc', 'embeds');  // Change "document" to "embeds"
    }


  return newUrl;
}

function updatePopup() {
    if (listenerActive) {
        startBtn.textContent = 'Le programme est lancé';
        stopBtn.style.display = 'block';
      startBtn.disabled = true;  // Disable the button after listener is active
    } else {
      startBtn.textContent = 'Lancer le programmer';
    }
  }