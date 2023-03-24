const fs = require('fs');
// const book ={
//     title:"Throne of Glass",
//     author:"Sarah J. Mass"
// }

// const bookJson = JSON.stringify(book);
// console.log(bookJson);

// fs.writeFileSync('1-json.json',bookJson);

// const dataBuffer = fs.readFileSync('1-json.json');
// dataJson = dataBuffer.toString();
// console.log(dataJson);
// data = JSON.parse(dataJson);

// console.log(data.title);

const dataBuffer = fs.readFileSync("1-json.json");
console.log(dataBuffer);
const dataJson = dataBuffer.toString();
console.log(dataJson);
const data = JSON.parse(dataJson);
console.log(data);

data.name ="yati";
data.planet ="pluto";
data.age = 22;

console.log(data);

user = JSON.stringify(data);
fs.writeFileSync('1-json.json', user);