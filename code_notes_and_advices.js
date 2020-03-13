//Unsynchronus non-blocking model

console.log('Starting')

setTimeout(() => {
    console.log('1 second timer')
}, 1000)

setTimeout(() => {
    console.log('0 second timer')
}, 0)

console.log('Stopping')

 