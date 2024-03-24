import {updateWeather, error404} from './app.js'

const defaultLoaction = '#/weather?lat=22.3039&lon=70.8022'

const curretLoaction = function(){
    window.navigator.geolocation.getCurrentPosition(res =>{
        const {latitude , longtitude} = res.coords;

        updateWeather(`lat=${latitude}`,`lon=${longtitude}`)
    },err =>{
        window.location.hash = defaultLoaction
    });
}

const searchedLocation = query => updateWeather(...query.split("&"))
// updateWeather("lat=22.3039","lon=70.8022")

const routes = new Map([
    ["/current-location",curretLoaction],
    ["/weather",searchedLocation]
])

const checkHash =()=>{
    const requestURL = window.location.hash.slice(1);
 
    const [route,query] = requestURL.includes ? requestURL.split("?") : [requestURL];

    routes.get(route) ? routes.get(route)(query) : error404();
}

window.addEventListener('hashchange',checkHash)

window.addEventListener('load',()=>{
    if(!window.location.hash)
    window.location.hash = '#/current-location'
    else
    checkHash();
})