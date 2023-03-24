const geocode = (address, callback) =>{
    setTimeout(() => {
        const data = {
            longitute :0,
            lattitute:0
        };
        callback(data);
    }, 2000);
    
}

geocode("philadalphia", (d)=>{
    console.log(d);
});

const sum =(a,b,callback)=>{
    setTimeout(() => {
        data = a+b;
        callback(data);
    }, 2000);
}

sum(10,15,(d)=>{
    console.log(d);
})

const multiply =(a,b,callback)=>{
    setTimeout(() => {
        ans = a*b;
        callback(ans);
    }, 2000);
}

multiply(10,15,(an)=>{
    console.log(an);
})