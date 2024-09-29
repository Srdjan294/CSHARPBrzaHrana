
import { Button, Col, Form, Row} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Service from '../../services/NarudzbaService';
import KorisnikService from '../../services/KorisnikService';
import { RoutesNames } from '../../constants';


export default function NarudzbePromjena() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const [jelovnici, setJelovnici] = useState([]);
  const [jelovnikSifra, setJelovnikSifra] = useState(0);

  const [narudzba, setNarudzba] = useState({});

  async function dohvatiKorisnike(){
    const odgovor = await KorisnikService.get();
    setKorisnici(odgovor);
  }

  async function dohvatiNarudzba() {
    const odgovor = await Service.getBySifra(routeParams.sifra);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
  }
    let narudzba = odgovor.poruka;
    setNarudzba(narudzba);
    setKorisnikSifra(narudzba.smjerSifra); 
  }

  async function dohvatiInicijalnePodatke() {
    await dohvatiKorisnike();
    await dohvatiNarudzba();
  }


  useEffect(()=>{
    dohvatiInicijalnePodatke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function promjena(e) {
    const odgovor = await Service.promjena(routeParams.sifra,e);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
    }
    navigate(RoutesNames.NARUDZBA_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    promjena({
      korisnikSifra: parseInt(korisnikSifra),   
      adresa: podaci.get('adresa'),
      datum: moment.utc(podaci.get('datum')),
      ukupna_Cijena: parseFloat(podaci.get('ukupna_Cijena'))
    });
  }

  return (
      <>
      Mjenjanje podataka narudžbe
      
      <Form onSubmit={obradiSubmit}>
      <Form.Group className='mb-3' controlId='korisnik'>
            <Form.Label>Korisnik</Form.Label>
            <Form.Select
            value={korisnikSifra}
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
              <Form.Control type="text" name="naziv" required defaultValue={narudzba.adresa}/>
          </Form.Group>

        

          <Form.Group controlId="datum">
              <Form.Label>Datum</Form.Label>
              <Form.Control type="date" name="datum" required defaultValue={narudzba.datum}/>
          </Form.Group>

          <Form.Group controlId="ukupna_Cijena">
              <Form.Label>Ukupna cijena</Form.Label>
              <Form.Control type="number" name="ukupna_Cijena" set={0.01} defaultValue={narudzba.ukupna_Cijena}/>
          </Form.Group>


          <hr />
          <Row>
              <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
              <Link to={RoutesNames.NARUDZBE_PREGLED}
              className="btn btn-danger siroko">
              Odustani
              </Link>
              </Col>
              <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
              <Button variant="primary" type="submit" className="siroko">
                  Promjeni grupu
              </Button>
              </Col>
          </Row>
      </Form>
  </>
  );
}