
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavbarBrzaHrana from './components/NavbarBrzaHrana'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'
import Pocetna from './pages/Pocetna'
import JelovniciPregled from './pages/jelovnici/JelovniciPregled'
import KorisniciPregled from './pages/korisnici/KorisniciPregled'
import JelovniciDodaj from './pages/jelovnici/JelovniciDodaj'
import JelovniciPromjena from './pages/jelovnici/JelovniciPromjena'
import KorisniciDodaj from './pages/korisnici/KorisniciDodaj'
import KorisniciPromjena from './pages/korisnici/KorisniciPromjena'
import NarudzbePregled from './pages/narudzbe/NarudzbePregled'
import NarudzbeDodaj from './pages/narudzbe/NarudzbeDodaj'
import NarudzbePromjena from './pages/narudzbe/NarudzbePromjena'



function App() {

  
  
  return (
    <>
      <NavbarBrzaHrana/>
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        <Route path={RoutesNames.JELOVNIK_PREGLED} element={<JelovniciPregled/>} />
        <Route path={RoutesNames.JELOVNIK_NOVI} element={<JelovniciDodaj/>} />
        <Route path={RoutesNames.JELOVNIK_PROMJENA} element={<JelovniciPromjena/>} />

        <Route path={RoutesNames.KORISNIK_PREGLED} element={<KorisniciPregled/>} />
        <Route path={RoutesNames.KORISNIK_NOVI} element={<KorisniciDodaj/>} />
        <Route path={RoutesNames.KORISNIK_PROMJENA} element={<KorisniciPromjena/>} />

        <Route path={RoutesNames.NARUDZBA_PREGLED} element={<NarudzbePregled/>} />
        <Route path={RoutesNames.NARUDZBA_NOVI} element={<NarudzbeDodaj/>} />
        <Route path={RoutesNames.NARUDZBA_PROMJENA} element={<NarudzbePromjena/>} />
        
      </Routes>
    </>
  )
}

export default App
