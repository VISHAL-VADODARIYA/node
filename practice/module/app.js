// const os = require('os')

// let totalMemory = os.totalmem()
// let freeMemory = os.freemem()

// console.log(totalMemory  /(1024 *1024* 1024))
// console.log(freeMemory  /( 1024 *1024* 1024))


// const fs = require('fs');

// let files = fs.readFileSync('./sample-protected.pdf')
// console.log(files.toString())


// const EventEmitter = require('events')
// const emitter = new EventEmitter();

// emitter.on('message',(e)=>{console.log(e)}) //register a listener
// emitter.emit('message',{id:1,url:'http://'}) //raise an event 



const http = require('http')

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.write('hello this is first time run server')
        res.end()
    }
    const utla = req.url.split('/')

    if(utla[2] === 'event'){
        res.write(JSON.stringify({params: utla[1]}))
        res.end()
    }
})
// server.on('connection',(socket)=>{console.log('new connection....')})
server.listen(3000)
console.log('listening on port 3000...')