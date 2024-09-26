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

async function dodaj(Korisnik){
    return await HttpService.post('/Korisnik', Korisnik)
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
                return {greska: true, poruka: 'Korisnika se ne može dodati!'}
        }
    })
}

async function promjena(sifra, Korisnik){
    return await HttpService.put('/Korisnik/' + sifra, Korisnik)
    .then((odgovor => {
        return {greska: false, poruka: odgovor.data}
    }))
    .catch((e) =>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
                }
                console.log(poruke)
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Korisnika se ne može promjeniti!'}
        }
    })
}

export default {
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena
}