//https://nodejs.org/api/fs.html

const fs = require('fs');


//Sync file read
console.log('sync')
const res = fs.readFileSync('./5mb.txt', 'utf-8')
console.log(res);


//Async file read
console.log('async')
fs.readFile('./5mb.txt', 'utf-8', (err, data) => {
    if(err) console.log(err);
    console.log(data);
})
console.log('done')
