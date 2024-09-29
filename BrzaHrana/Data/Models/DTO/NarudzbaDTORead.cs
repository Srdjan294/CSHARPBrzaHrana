
namespace BrzaHrana.Models.DTO
{
    public record NarudzbaDTORead(
        int Sifra,
        string? KorisnikImePrezime,
        string? Adresa,
        DateTime? Datum,
        decimal? Ukupna_Cijena
        );


}