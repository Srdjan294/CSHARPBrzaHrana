import { Button, Container, Table } from "react-bootstrap";
import JelovnikService from "../../services/JelovnikService";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";



export default function JelovniciPregled(){

    const navigate = useNavigate();

    const[jelovnici,setJelovnici] = useState();

    async function dohvatiJelovnike(){
       
        await JelovnikService.get()
        .then((odgovor) => {
            //console.log(odgovor)
            setJelovnici(odgovor);
        })
        .catch((e) => console.log(e));

        
    }

    useEffect(() => {
        dohvatiJelovnike();
    },[]);


    async function obrisiAsync(sifra){
        const odgovor = await JelovnikService.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiJelovnike();
    }


    function obrisi(sifra){
        obrisiAsync(sifra);
    }


    return(
        <Container>
            <Link to={RoutesNames.JELOVNIK_NOVI}>Dodaj novo jelo</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv jela</th>
                        <th>Kategorija</th>
                        <th>Cijena</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {jelovnici && jelovnici.map((jelovnik,index) => (
                        <tr key={index}>
                            <td>{jelovnik.naziv_Jela}</td>
                            <td>{jelovnik.kategorija}</td>
                            <td className = {jelovnik.cijena == null ? 'sredina' : 'desno'}>

                                {jelovnik.cijena == null ? 'Nije definirano' : <NumericFormat 
                                value = {jelovnik.cijena}
                                displayType = {'text'}
                                thousandSeparator = '.'
                                decimalSeparator = ","
                                prefix = {"€"}
                                decimalScale={2}
                                fixedDecimalScale/>
                                }
                            </td>
                            <td>
                                <Button
                                variant="primary"
                                onClick={() => navigate(`/jelovnici/${jelovnik.sifra}`)}>
                                   Promjeni     
                                </Button>
                                &nbsp;&nbsp;
                                <Button
                                variant = "danger"
                                onClick={() => obrisi(jelovnik.sifra)}>
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