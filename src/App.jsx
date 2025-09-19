import { useState, useEffect } from 'react'

import Header from './Header.jsx'
import Chooser from './ChooseDog.jsx'
import Track from './Track.jsx'

export default function App() {

  // Get a random list of 10 dogs from API and save it in state
  const [chooseableDogs, setChoosableDogs] = useState([])

  useEffect( () => {
      fetch("https://dog.ceo/api/breeds/image/random")
      .then( res => res.json())
      .then( data => {
          if (chooseableDogs.length < 10) {
              setChoosableDogs( prev => [...prev, data.message])
          }
      })
  }, [chooseableDogs])


  return (
    <>
    <Header />
    <main>
      <Chooser dogs={chooseableDogs}/>
      <Track dogs={chooseableDogs}/>
    </main>
    </>
  )
}