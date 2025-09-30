const choosingArea = document.querySelector(".chooser");
const raceArea = document.querySelector(".track");
const chosenDogs = [];
const startFetchButton = document.querySelector(".dog-fetch-button");
const raceStarter = document.querySelector(".race-starter");
let dogs;
const raceTrack = document.querySelector(".race-track");
 
startFetchButton.addEventListener("click", fetchDogList);
 
function fetchDogList(event) {
   
    event.target.style.display="none";
 
    for(let i = 0; i<10; i++) {
        fetch("https://dog.ceo/api/breeds/image/random")
        .then( res => res.json())
        .then( data => {
            chosenDogs.push({
                url: data.message,
                progress: 0,
                chosen: false,
                placement: null
            })
        })
        .catch( error => {
            console.log("Fetch failed");
        })
    }
 
    setTimeout(() => {
        setUpChooser();
    }, 1000);
 
}
 
// On the Chooser area
 
function setUpChooser() {
    chosenDogs.forEach( (el) => {
        const newDivElement = document.createElement("div");
        newDivElement.setAttribute("style", `background: url(${el.url}); background-size: cover`);
        newDivElement.classList.add("dog");
        newDivElement.addEventListener("click", changeToRaceTrack);
        choosingArea.appendChild(newDivElement);
    })
    dogs = document.querySelectorAll(".dog");
}
 
function changeToRaceTrack(e) {
    dogs.forEach( el => {
        raceTrack.appendChild(el)
        el.removeEventListener("click", changeToRaceTrack)
    })
    let chosenIndex = Array.from(dogs).indexOf(e.target);
    chosenDogs[chosenIndex].chosen = true;
    e.target.style.outline="5px solid gold";
    raceStarter.classList.add("chosen")
}
 
// On the track
 
function startTheRace(e) {
    e.target.style.display="none";
    let interval = setInterval(() => {
        dogs.forEach( (el, index) => {
            chosenDogs[index].progress += Math.ceil(Math.random() * 10);
            el.style.transform = `translateX(${chosenDogs[index].progress}%)`
            if(chosenDogs[index].progress >= 1400) {
                alert(`Its over! Your dog ${chosenDogs[index].chosen ? "won" : "looses"}`)
                clearInterval(interval)
                pricePlacement();
            }
        })        
    }, 100);
}
 
raceStarter.addEventListener("click", startTheRace);
 
function pricePlacement() {
 
    const sortedDogs = [...chosenDogs].sort( (a,b) => b.progress - a.progress);
    sortedDogs.forEach((dog, index) => {
        dog.placement = index + 1
    })
 
    dogs.forEach( (el,index) => {
        const newDivElement = document.createElement("div");
        newDivElement.textContent = `${chosenDogs[index].placement}. Platz`
        el.appendChild(newDivElement);
 
    })
 
}
 