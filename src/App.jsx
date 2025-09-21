import { useState, useEffect } from "react";
import './App.css'

export default function App() {

    const [chosenDogs, setChosenDogs] = useState([]);
    const [favDog, setFavDog] = useState(0);

    useEffect( () => {
        fetch("https://dog.ceo/api/breeds/image/random/10")
        .then( res => res.json() )
        .then( data => {
            setChosenDogs(data.message)
        })
    }, [])

    function favChosen(fav) {
        setFavDog(fav)
        setFavDogChosen(true)
        console.log(favDog)
    }


    return (
        <>
        
            <section id="selection-area">
                <h2>Who will win the race</h2>
                <p>pick your favorite and the race may begin</p>
                <div id="selection">
                    {chosenDogs.map( (el) => {
                        return <div className="dog" style={{backgroundImage: "url(" + el + ")"}} onClick={() => favChosen(el)}></div>
                    })}
                </div>
            </section>

            <section id="track">
                <h2>Race Track</h2>

                <div id="race-track">
                    {chosenDogs.map( el => {
                        return (
                            <div className="track-bar">
                                <div className={ el === favDog ? "dog fav" : "dog"} style={{backgroundImage: "url(" + el + ")"}}></div>
                            </div>
                        )
                    })}
                </div>
            </section>
        
        </>
    )
}