onmessage = (e) => {
  console.log('Message received from main script: ', e)
  postMessage('Here's a message...')
}
