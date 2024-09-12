
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavbarBrzaHrana from './components/NavbarBrzaHrana'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'
import Pocetna from './pages/Pocetna'
import JelovniciPregled from './pages/Jelovnici/JelovniciPregled'



function App() {

  
  
  return (
    <>
      <NavbarBrzaHrana/>
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        <Route path={RoutesNames.JELOVNIK_PREGLED} element={<JelovniciPregled/>} />
      </Routes>
    </>
  )
}

export default App
