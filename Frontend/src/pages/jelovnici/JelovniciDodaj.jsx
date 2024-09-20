import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import JelovnikService from "../../services/JelovnikService";



export default function JelovniciDodaj(){

    const navigate = useNavigate();

    async function dodaj(jelovnik){
        //console.log(JSON.stringify(jelovnik));
        const odgovor = await JelovnikService.dodaj(jelovnik);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }

        navigate(RoutesNames.JELOVNIK_PREGLED);

        

    }
    
    function obradiSubmit(e){
   
        e.preventDefault();

        const podaci = new FormData(e.target);

        dodaj({
            naziv_Jela: podaci.get('naziv_Jela'),
            kategorija: podaci.get('kategorija'),
            cijena: parseFloat(podaci.get('cijena'))
        })

    }

    return(
        <Container>
            Dodavanje novog jela
            
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="naziv_Jela">
                    <Form.Label>Naziv jela</Form.Label>
                    <Form.Control type="text" name="naziv_Jela" required />
                </Form.Group>

                <Form.Group controlId="kategorija">
                    <Form.Label>Kategorija</Form.Label>
                    <Form.Control type="text" name="kategorija" />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" name="cijena" step={0.01} />
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
                        Dodaj novo jelo
                    </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}