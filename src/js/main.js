console.log("hello world")

const API_KEY = "ebef449c775e4ffda5e200607220402";

const API = ` http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=new`


fetch(API)
.then(res => res.json())
.then(data => console.log(data))
.catch(err => {
    console.log(err)
})