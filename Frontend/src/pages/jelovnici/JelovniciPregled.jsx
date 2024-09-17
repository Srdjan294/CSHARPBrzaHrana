import { Container, Table } from "react-bootstrap";
import JelovnikService from "../../services/JelovnikService";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";



export default function JelovniciPregled(){

    

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


    return(
        <Container>
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
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}