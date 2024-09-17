import { Container, Table } from "react-bootstrap";
import KorisnikService from "../../services/KorisnikService";
import { useEffect, useState } from "react";

export default function KorisniciPregled(){


    const[korisnici,setKorisnici] = useState();


    async function dohvatiKorisnike(){
        
        const podaci = await KorisnikService.get()
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



    return(
        <Container>
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
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}