import { Button, Container, Table } from "react-bootstrap";
import KorisnikService from "../../services/KorisnikService";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";

export default function KorisniciPregled(){


    const[korisnici,setKorisnici] = useState();

    const navigate = useNavigate();


    async function dohvatiKorisnike(){
        
        await KorisnikService.get()
        .then((odgovor) => {
            console.log('Vratio se')
            console.log(odgovor);
            setKorisnici(odgovor);
            
        })
        .catch((e) => {console.log(e)});

        
    }

    useEffect(() => {
        dohvatiKorisnike();
    },[]);

    async function obrisiAsync(sifra){
        const odgovor = await KorisnikService.obrisi(sifra);
        if(odgovor.greska){
            alert (odgovor.poruka);
            return;
        }
        dohvatiKorisnike();
    }


    function obrisi(sifra){
        obrisiAsync(sifra);
    }

   


    return(
        <Container>
            <Link to={RoutesNames.KORISNIK_NOVI} >
                Dodaj novog korisnika
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Email</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {korisnici && korisnici.map((korisnik,index) => (
                        <tr key = {index}>
                            <td>{korisnik.ime}</td>
                            <td>{korisnik.prezime}</td>
                            <td>{korisnik.email}</td>
                            <td>
                                <Button variant="primary"
                                    onClick={() => navigate(`/korisnici/${korisnik.sifra}`)}>
                                    Promjeni
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger"
                                    onClick={() => obrisi(korisnik.sifra)}>
                                    Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}