
const url = 'https://swapi.dev/api/films/';
const people = 'https://swapi.dev/api/people/';
const planets = 'https://swapi.dev/api/planets/';
const starship = 'https://swapi.dev/api/starships/';
const out = document.querySelector('.swapi_content');


async function asyncFetch() {
    const res = await fetch(url);
    const data = await res.json();
    displayFilms(data);
}
function displayFilms(data) {
    let output = "";
    let id = 1;
    data.results.forEach(item => {
        output += `<li class="list_films" data-film="${id}">${item.title}</li>`;
        id++;
    });
    document.querySelector('.swapi_films').innerHTML = output;
};
asyncFetch();

// search

let search = document.querySelector('#search_input');
let btn = document.querySelector('.btn');
btn.addEventListener('click', function () {
    let val = search.value.trim();
    asyncFilms(val);
});
async function asyncFilms(val) {
    const resFilm = await fetch(url);
    const dataFilm = await resFilm.json();
    const resPeople = await fetch(people);
    const dataPeople = await resPeople.json();
    const resPlanet = await fetch(planets);
    const dataPlanet = await resPlanet.json();
    const resStar = await fetch(starship);
    const dataStar = await resStar.json();
    massURL(dataFilm, dataPeople, dataPlanet, dataStar, val);
};

function massURL(dataFilm, dataPeople, dataPlanet, dataStar, val) {
    const objF = dataFilm.results.find( item => item.title == val);
    const objP = dataPeople.results.find( item => item.name == val);
    const objPl = dataPlanet.results.find( item => item.name == val);
    const objS = dataStar.results.find( item => item.name == val);
   
    let obj = (objF != undefined) ? objF : (objP != undefined) ? objP : (objPl != undefined) ? objPl : (objS != undefined) ? objS : out.innerHTML = 'Не найдено';
    funkSearch(obj);

    function funkSearch(obj) {
        let inform = '';

    for(let key in obj) {
        if (obj[key] instanceof Array){
            if (key == 'starships') {
                 obj[key].forEach(item => {FilmsInfo(item)}); 
            } else if (key == 'planets') {
                obj[key].forEach(item => {FilmsInfo(item)}); 
            } else if (key == 'characters') {
                obj[key].forEach(item => {FilmsInfo(item)});
            } else if (key == 'films') {
                obj[key].forEach(item => {FilmsInfo(item)});
            } else if (key == 'vehicles') {
                obj[key].forEach(item => {FilmsInfo(item)});
            } else if (key == 'species') {
                obj[key].forEach(item => {FilmsInfo(item)});
            } else if (key == 'residents') {
                obj[key].forEach(item => {FilmsInfo(item)});
            } else if (key == 'pilots') {
                obj[key].forEach(item => {FilmsInfo(item)});
            }
        }
    } 
    async function FilmsInfo(item) {
        let resPlanet = await fetch(item);
        let infoPlanet = await resPlanet.json(); 
        inform += infoPlanet.title + ', ';
        outInf(obj, inform);
    }
}
};
function outInf(obj, inform) {
    let outSerch = '<ul class="ul_search">';
    localStorage.setItem (Object.values(obj)[0], JSON.stringify(obj));
    for(let key in obj) {  
        if (key == 'starships') {
            if(obj[key] != ''){
                outSerch += ` <li> <b>${key}</b> : ${inform}</li>`;      
            } else {
                outSerch += '';
            }    
        } else if (key == 'planets') {
            outSerch += ` <li> <b>${key}</b> : ${inform}</li>`;
        } else if (key == 'characters') {
            outSerch += ` <li> <b>${key}</b> : ${inform}</li>`;
        } else if (key == 'films') {
            outSerch += ` <li> <b>${key}</b> : ${inform}</li>`;
        } else if (key == 'vehicles') {
            if(obj[key] != ''){
                outSerch += ` <li> <b>${key}</b> : ${inform}</li>`;      
            } else {
                outSerch += '';
            }    
        } else if (key == 'species') {
            if(obj[key] != ''){
                outSerch += ` <li> <b>${key}</b> : ${inform}</li>`;      
            } else {
                outSerch += '';
            }    
        }else if (key == 'residents') {
            if(obj[key] != ''){
                outSerch += ` <li> <b>${key}</b> : ${inform}</li>`;
            } else {
                outSerch += '';
            }    
        } else if (key == 'pilots') {
            if(obj[key] != ''){
                outSerch += ` <li> <b>${key}</b> : ${inform}</li>`;
            } else {
                outSerch += '';
            }    
        } else if (key == 'url') {
            outSerch += ` <li> <b>${key}</b> : <a class="link_starships" href="${obj[key]}">Link to more</a> </li>`;
        }else {
            outSerch += ` <li> <b>${key}</b> : ${obj[key]}</li>`; 
        }   
    }
    outSerch += '</ul>';
    out.innerHTML = outSerch;
}  

// info films
document.querySelector('.swapi_films').addEventListener('click', clickFilms);
function clickFilms(e){
    e = e || window.event;
    infoFilms(e.target.getAttribute('data-film'));
};

async function infoFilms(film) {
    let res = await fetch(url + film);
    let info = await res.json(); 

    const planetName = [];
    const starshipsName = [];
    const speciesName = [];
    const vehiclesName = [];
    const CharactersName = [];

    info.planets.forEach(planet => { CharactersInfo(planet, planetName) });
    info.starships.forEach(starship => { CharactersInfo(starship,starshipsName) });
    info.species.forEach(species => { CharactersInfo(species, speciesName) });
    info.vehicles.forEach(vehicles => { CharactersInfo(vehicles, vehiclesName) });
    info.characters.forEach(characters => { CharactersInfo(characters, CharactersName) });

    async function CharactersInfo(item, mass) {
        let resCharacters = await fetch(item);
        let infoCharacters = await resCharacters.json(); 
        mass.push(infoCharacters.name);
        if(CharactersName) {
            outInfo(info, planetName, starshipsName, speciesName, vehiclesName, CharactersName);
        }
    }   
}

function outInfo(info, planetName, starshipsName, speciesName, vehiclesName, CharactersName) {
    let outInform = '';

    outInform += `<h3 class="title-film">${info.title}</h3>`;
    outInform += `<ul class="info-film-ul">
        <li class="info-film-li"><b>Director:</b> ${info.director}</li> <b></b>
        <li class="info-film-li"><b>Created:</b> ${info.created}</li>
        <li class="info-film-li"><b>Edited:</b> ${info.edited}</li>
        <li class="info-film-li"><b>Episode_id:</b> ${info.episode_id}</li>
        <li class="info-film-li"><b>Opening_crawl:</b> ${info.opening_crawl}</li>`;
        outInform += `<li class="info-film-li"><b>Planets:</b> `
        for(let i in planetName) {
            outInform += `<a class="link_planets" href="${i}">${planetName[i]}</a> `;
        } 
        outInform += `</li>`;
        outInform += `<li class="info-film-li"><b>Characters:</b> `
        for(let h in CharactersName) {
            outInform += `<a class="link_characters" href="${h}">${CharactersName[h]}</a>, `;
        } 
        outInform += `</li>`;
        outInform += `<li class="info-film-li"><b>Producer:</b> ${info.producer}</li>`;
        outInform += `<li class="info-film-li"><b>Starships:</b> `;
        for(let k in starshipsName) {
            outInform += `<a class="link_starships" href="${k}">${starshipsName[k]}</a>,  `;
        };
        outInform += `</li>`;
        outInform += `<li class="info-film-li"><b>Species:</b> `;
        for(let j in speciesName) {
            outInform += `<a class="link_species" href="${j}">${speciesName[j]}</a>,  `;
        };
        outInform += `</li>`;
        outInform += `<li class="info-film-li"><b>URL:</b> <a class="link_url" href="${info.url}"> Link to Film </a></li>`;
        outInform += `<li class="info-film-li"><b>Vehicles:</b> `;
        for(let j in vehiclesName) {
            outInform += `<a class="link_vehicles" href="${j}">${vehiclesName[j]}</a>,  `;
        };
        outInform += `</li>`;
        outInform += `<li class="info-film-li"><b>Release_date:</b> ${info.release_date}</li>
        </ul>`;

    out.innerHTML = outInform;
}


