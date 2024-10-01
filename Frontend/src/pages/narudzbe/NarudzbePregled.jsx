
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Service from "../../services/NarudzbaService"; // primjetite promjenu naziva
import { RoutesNames } from "../../constants";

export default function NarudzbePregled(){
    const [narudzbe,setNarudzbe] = useState();
    let navigate = useNavigate(); 

    async function dohvatiNarudzbe(){
        await Service.get()
        .then((odgovor)=>{
            //console.log(odgovor);
            setNarudzbe(odgovor);
        })
        .catch((e)=>{console.log(e)});
    }

    async function obrisiNarudzbu(sifra) {
        const odgovor = await Service.obrisi(sifra);
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiNarudzbe();
    }

    useEffect(()=>{
        dohvatiNarudzbe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return (

        <Container>
            <Link to={RoutesNames.NARUDZBA_NOVI} className="btn btn-success siroko">
                 Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Korisnik</th>
                        <th>Adresa</th>
                        <th>Datum</th>
                        <th>Ukupna cijena</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {narudzbe && narudzbe.map((entitet,index)=>(
                        <tr key={index}>
                            <td>{entitet.korisnikImePrezime}</td>
                            <td>{entitet.adresa}</td>
                            <td>{entitet.datum}</td>
                            <td>{entitet.ukupna_Cijena}</td>
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/narudzbe/${entitet.sifra}`)}}
                                        
                                    >
                                        Promjeni narudžbu
                                    </Button>
                               
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiNarudzbu(entitet.sifra)}
                                    >
                                        Obriši
                                    </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}