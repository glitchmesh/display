var socket = new window.WebSocket(window.webSocketEndpoint)
var cycleStep = 0
var currentImages = document.querySelector('main').childNodes
var timer

socket.onopen = init

function init () {
  socket.send(JSON.stringify({
    channel: 'receiver'
  }))
  socket.onmessage = handleMessage
}

function handleMessage (message) {
  displayMessage(JSON.parse(message.data).images)
  if (!timer) {
    timer = window.setInterval(cycleImages, 100)
  }
}

function displayMessage (images) {
  document.querySelector('main').innerHTML = images.map(function (src) {
    return '<img src="' + src + '">'
  }).join('')
}

function cycleImages () {
  var oldStep = cycleStep
  cycleStep = (cycleStep + 1) % 20
  currentImages.item(oldStep).style.display = 'none'
  currentImages.item(cycleStep).style.display = 'block'
}
