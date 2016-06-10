
chrome.app.runtime.onLaunched.addListener(function() {
  console.log('background loaded');
  chrome.app.window.create('window.html', {
    'outerBounds': {
      'width': 1280,
      'height': 640
    }
  });
});

