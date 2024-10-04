
namespace BrzaHrana.Models.DTO
{
    public record NarudzbaDTORead(
        int Sifra,
        string KorisnikNaziv,
        string Adresa,
        DateTime Datum,
        decimal UkupnaCijena
        );


}