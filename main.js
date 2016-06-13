var str2ab=function(str) {
  var buf=new ArrayBuffer(str.length);
  var bufView=new Uint8Array(buf);
  for (var i=0; i<str.length; i++) {
    bufView[i]=str.charCodeAt(i);
  }
  return buf;
}

// From https://developer.chrome.com/trunk/apps/app_hardware.html
var ab2str=function(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
};
var socketId;

// Handle the "onReceive" event.
var onReceive = function(info) {
  webview = document.getElementById('webview');
  if (info.socketId !== socketId)
    return;
  webview.contentWindow.postMessage(ab2str(info.data), "*");
};

// Create the Socket
chrome.sockets.udp.create({}, function(socketInfo) {
  socketId = socketInfo.socketId;
  // Setup event handler and bind socket.
  chrome.sockets.udp.onReceive.addListener(onReceive);
  chrome.sockets.udp.bind(socketId,
    "127.0.0.1", 8899, function(result) {
      if (result < 0) {
        console.log("Error binding socket.");
        return;
      }
  });
});

