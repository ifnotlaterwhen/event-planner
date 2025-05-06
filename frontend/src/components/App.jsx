import { useState } from 'react'
import '../App.css'
import {Routes, Route} from 'react-router-dom'
import Header from './header'
import Home from './home'

function App() {

  const [signedInAs, setSignedInAs] = useState("admin")

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={< Home/>}/>

    </Routes>
    </>
  )

}

export default App
