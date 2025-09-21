import { useState, useEffect } from "react";
import './App.css'

export default function App() {

    const [chosenDogs, setChosenDogs] = useState([]);
    const [favDog, setFavDog] = useState(0);
    const [favDogChosen, setFavDogChosen] = useState(false);

    useEffect( () => {
        fetch("https://dog.ceo/api/breeds/image/random/10")
        .then( res => res.json() )
        .then( data => {
            let temp = [];
            data.message.map( el => {
                 temp.push({name: el, progress: 0})
            })
            setChosenDogs(temp)
        });
    }, [])


    function favChosen(fav) {
        setFavDog(fav)
        setFavDogChosen(true)
    }

    setInterval(() => {
        
    }, 100);


    return (
        <>
        
            <section id="selection-area">
                <h2>Who will win the race</h2>
                <p>pick your favorite and the race may begin</p>
                <div id="selection" className={favDogChosen ? "race-paused" : "race-started"}>
                    {chosenDogs.map( (el) => {
                        return <div className="dog" style={{backgroundImage: "url(" + el.name + ")"}} onClick={() => favChosen(el)}></div>
                    })}
                </div>
            </section>

            <section id="track">
                <h2>Race Track</h2>

                <div id="race-track" className={favDogChosen ? "race-started" : "race-paused"}>
                    {chosenDogs.map( el => {
                        return (
                            <div className="track-bar">
                                <div className={ el === favDog ? "dog fav" : "dog"} style={{backgroundImage: "url(" + el.name + ")"}}></div>
                            </div>
                        )
                    })}
                </div>
            </section>
        
        </>
    )
}