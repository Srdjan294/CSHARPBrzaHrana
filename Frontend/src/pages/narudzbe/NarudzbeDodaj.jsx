
import { Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Service from '../../services/NarudzbaService';
import KorisnikService from '../../services/KorisnikService';
import { RoutesNames } from '../../constants';
import moment from 'moment';



export default function NarudzbeDodaj() {
  const navigate = useNavigate();

  const [korisnici, setKorisnici] = useState([]);
  const [korisnikSifra, setKorisnikSifra] = useState(0);

  async function dohvatiKorisnike(){
    const odgovor = await KorisnikService.get();
    setKorisnici(odgovor);
    setKorisnikSifra(odgovor[0].sifra);
  }



  useEffect(()=>{
    dohvatiKorisnike();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function dodaj(e) {
    const odgovor = await Service.dodaj(e);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
    }
    navigate(RoutesNames.NARUDZBA_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    dodaj({
      korisnikSifra: parseInt(korisnikSifra),
      adresa: podaci.get('adresa'),
      datum: moment.utc(podaci.get('datum')),
      ukupnaCijena: parseFloat(podaci.get('ukupnaCijena'))
    });
  }

  return (
      <>
      Dodavanje nove narudžbe
      
      <Form onSubmit={obradiSubmit}>
          <Form.Group className='mb-3' controlId="korisnik">
              <Form.Label>Korisnik</Form.Label>
              <Form.Select 
                onChange={(e)=>{setKorisnikSifra(e.target.value)}}
            >
                {korisnici && korisnici.map((k,index)=>(
                  <option key={index} value={k.sifra}>
                    {k.ime} {k.prezime}
               </option>
                ))}
            </Form.Select>
          </Form.Group>

          

          <Form.Group controlId="adresa">
              <Form.Label>Adresa</Form.Label>
              <Form.Control type="text" name="adresa" required />
          </Form.Group>


          <Form.Group controlId="datum">
              <Form.Label>Datum</Form.Label>
              <Form.Control type="date" name="datum"/>
          </Form.Group>


          <Form.Group controlId="ukupnaCijena">
              <Form.Label>Ukupna cijena</Form.Label>
              <Form.Control type="number" name="ukupnaCijena" step={0.0100}/>
          </Form.Group>


          <hr />
          <Row>
              <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
              <Link to={RoutesNames.NARUDZBA_PREGLED}
              className="btn btn-danger siroko">
              Odustani
              </Link>
              </Col>
              <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
              <Button variant="primary" type="submit" className="siroko">
                  Dodaj novu narudžbu
              </Button>
              </Col>
          </Row>
      </Form>
  </>
  );
}