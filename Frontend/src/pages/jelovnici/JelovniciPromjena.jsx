import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import JelovnikService from "../../services/JelovnikService";
import { useEffect, useState } from "react";



export default function JelovniciPromjena(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [jelovnik,setJelovnik] = useState({});
 
    async function dohvatiJelovnik(){
        const odgovor = await JelovnikService.getBySifra(routeParams.sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        setJelovnik(odgovor.poruka);
    };

    useEffect(() => {
        dohvatiJelovnik();
    });

    async function promjena(jelovnik){
        //console.log(JSON.stringify(jelovnik));
        const odgovor = await JelovnikService.promjena(routeParams.sifra, jelovnik);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }

        navigate(RoutesNames.JELOVNIK_PREGLED);

        

    }
    
    function obradiSubmit(e){
   
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjena({
            naziv_Jela: podaci.get('naziv_Jela'),
            kategorija: podaci.get('kategorija'),
            cijena: parseFloat(podaci.get('cijena'))
        })

    }

    return(
        <Container>
            Promjena jela
            
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="naziv_Jela">
                    <Form.Label>Naziv jela</Form.Label>
                    <Form.Control type="text" name="naziv_Jela" required defaultValue={jelovnik.naziv_Jela} />
                </Form.Group>

                <Form.Group controlId="kategorija">
                    <Form.Label>Kategorija</Form.Label>
                    <Form.Control type="text" name="kategorija" defaultValue={jelovnik.kategorija}/>
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" name="cijena" step={0.01} defaultValue={jelovnik.cijena} />
                </Form.Group>
                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RoutesNames.JELOVNIK_PREGLED}
                    className="btn btn-danger siroko">
                    Odustani
                    </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="primary" type="submit" className="siroko">
                        Promjeni jelo
                    </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}