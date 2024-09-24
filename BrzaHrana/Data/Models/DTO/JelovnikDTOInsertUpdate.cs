using System.ComponentModel.DataAnnotations;

namespace BrzaHrana.Models.DTO
{
    public record JelovnikDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
        string? Naziv_Jela,
        [Required(ErrorMessage = "Kategorija obavezno")]
        string? Kategorija,
        [Range(0, 100, ErrorMessage = "Vrijednost {0} mora biti između {1} i {2}")]
        decimal? Cijena
        );
}