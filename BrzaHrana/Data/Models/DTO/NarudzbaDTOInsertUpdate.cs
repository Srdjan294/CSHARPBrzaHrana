using System.ComponentModel.DataAnnotations;

namespace BrzaHrana.Models.DTO
{
    public record NarudzbaDTOInsertUpdate(

        int? KorisnikSifra,
        [Required(ErrorMessage = "Adresa obavezno")]
        string? Adresa,
        [Required(ErrorMessage = "Datum obavezno")]
        DateTime? Datum,
        [Required(ErrorMessage = "Ukupna cijena obavezno")]
        decimal? UkupnaCijena
        );


}