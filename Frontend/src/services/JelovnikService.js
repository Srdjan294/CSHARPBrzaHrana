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
    .then((odgovor) => {
        return {greska: false, poruka: odgovor.data.poruka}
    })
    .catch((e) => {
        return {greska: true, poruka: 'Jelo se ne može obrisati'}
    })
}

async function dodaj(Jelovnik){
    return await HttpService.post('/Jelovnik', Jelovnik)
    .then((odgovor) => {
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
                }
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Jelo se ne može dodati!'}
        }
    
    
    })
}

async function promjena(sifra,Jelovnik){
    return await HttpService.put('/Jelovnik/' + sifra, Jelovnik)
    .then((odgovor) => {
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e) => {
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
                }
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Jelo se ne može promjeniti!'}
        }
    })
}

export default{
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena
}