import { Button, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import KorisnikService from "../../services/KorisnikService";



export default function KorisniciDodaj(){

    const navigate = useNavigate();

    async function dodaj(korisnik){
        const odgovor = await KorisnikService.dodaj(korisnik);
        if(odgovor.greska){
            alert (odgovor.poruka);
            return;
        }
        navigate(RoutesNames.KORISNIK_PREGLED);
    }

    function obradiSubmit(e){
        e.preventDefault();

        const podaci = new FormData(e.target);

        dodaj({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email')
        })
    }

    return(
        <Container>
           
            <Form onSubmit={obradiSubmit} >
                <FormGroup controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <FormControl type="text" name="ime" required />
                </FormGroup>

                <FormGroup controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <FormControl type="text" name="prezime" required />
                </FormGroup>

                <FormGroup controlId="email">
                    <Form.Label>Email</Form.Label>
                    <FormControl type="text" name="email" required />
                </FormGroup>

                <hr />
            <Row>
                <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                <Link to={RoutesNames.KORISNIK_PREGLED}
                className="btn btn-danger siroko">
                Odustani
                </Link>
                </Col>
                <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                <Button variant="primary" type="submit" className="siroko">
                    Dodaj novog korisnika
                </Button>
                </Col>
            </Row>
            </Form>
        </Container>
    )
}