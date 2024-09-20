import { HttpService } from "./HttpService"


async function get(){

    return await HttpService.get('/Jelovnik')
    .then((odgovor) => {
        //console.table(odgovor.data);
        return odgovor.data;
    }) 
    .catch((e) => {console.error(e)})
}

async function getBySifra(sifra){

    return await HttpService.get('/Jelovnik/' + sifra)
    .then((odgovor) => {
        return {greska: false, poruka: odgovor.data}
    }) 
    .catch((e) => {
        return {greska: true, poruka: 'Ne postoji jelo!'}
    })
}

async function obrisi(sifra){
    return await HttpService.delete('/Jelovnik/' + sifra)
    .then((odgovor => {
        return {greska: false, poruka: odgovor.data.poruka}
    }))
    .catch((e) => {
        return {greska: true, poruka: 'Jelo se ne može obrisati'}
    })
}

async function dodaj(jelovnik){
    return await HttpService.post('/Jelovnik', jelovnik)
    .then((odgovor => {
        return {greska: false, poruka: odgovor.data}
    }))
    .catch((e) => {
        return {greska: true, poruka: 'Jelo se ne može dodati'}
    })
}

async function promjena(sifra,jelovnik){
    return await HttpService.put('/Jelovnik/' + sifra, jelovnik)
    .then((odgovor => {
        return {greska: false, poruka: odgovor.data}
    }))
    .catch((e) => {
        return {greska: true, poruka: 'Jelo se ne može promjeniti'}
    })
}

export default{
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena
}