import { HttpService } from "./HttpService"


async function get(){
   
    return await HttpService.get('/Korisnik')
    .then((odgovor) => {
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e) => {console.error(e)}) 

}


async function getBySifra(sifra){
   
    return await HttpService.get('/Korisnik/' + sifra)
    .then((odgovor) => {
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e) =>{
        return {greska: true, poruka: 'Ne postoji korisnik!'}
    })

}

async function obrisi(sifra){
    return await HttpService.delete('/Korisnik/' + sifra)
    .then((odgovor => {
        return {greska: false, poruka: odgovor.data.poruka}
    }))
    .catch((e) =>{
        return {greska: true, poruka: 'Korisnik se ne može obrisati!'}
    })
}

async function dodaj(korisnik){
    return await HttpService.post('/Korisnik', korisnik)
    .then((odgovor => {
        return {greska: false, poruka: odgovor.data}
    }))
    .catch((e) =>{
        return {greska: true, poruka: 'Korisnik se ne može dodati!'}
    })
}

async function promjena(sifra, korisnik){
    return await HttpService.put('/Korisnik/' + sifra, korisnik)
    .then((odgovor => {
        return {greska: false, poruka: odgovor.data}
    }))
    .catch((e) =>{
        return {greska: true, poruka: 'Korisnik se ne može promjeniti!'}
    })
}

export default {
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena
}