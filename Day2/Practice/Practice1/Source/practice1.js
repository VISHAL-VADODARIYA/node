// const fs = require('fs')

// const data = '\nHello India'
// fs.appendFile('person.txt',data,'utf-8',(err,data)=>{
//     if(err){
//         return console.log(err)
//     }
//     console.log('data appended successfully')
// })

// fs.readFile('person.txt','utf-8',(err,data)=>{
//     if(err){
//         return console.log(err)
//     }
//     console.log(data)
// })


console.log(process.argv[2]+' '+process.argv[3])