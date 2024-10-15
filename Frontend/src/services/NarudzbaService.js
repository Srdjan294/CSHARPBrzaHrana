
import { HttpService } from "./HttpService"


async function get(){
    return await HttpService.get('/Narudzba')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getBySifra(sifra){
    return await HttpService.get('/Narudzba/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Ne postoji narudžba!'}
    })
}

async function obrisi(sifra) {
    return await HttpService.delete('/Narudzba/' + sifra)
    .then((odgovor)=>{
        //console.log(odgovor);
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Narudžba se ne može obrisati!'}
    })
}

async function dodaj(Narudzba) {
    return await HttpService.post('/Narudzba',Narudzba)
    .then((odgovor)=>{
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
                return {greska: true, poruka: 'Narudžba se ne može dodati!'}
        }
    })
}

async function promjena(sifra,Narudzba) {
    return await HttpService.put('/Narudzba/' + sifra,Narudzba)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
                }
                console.log(poruke)
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Narudžba se ne može promjeniti!'}
        }
    })
}
// ovo tine treba
async function getJelovnici(sifra){
    return await HttpService.get('/Narudzba/Jelovnici/'+ sifra)
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{return {greska: true, poruka: 'Problem kod dohvaćanja jelovnika'}})
}

export default{
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena,
    getJelovnici
}