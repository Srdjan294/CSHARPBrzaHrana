using System.ComponentModel.DataAnnotations;

namespace BrzaHrana.Data.Models.DTO
{
    
        public record KorisnikDTOInsertUpdate(
        [Required(ErrorMessage = "Ime obavezno")]
        string Ime,
        [Required(ErrorMessage = "Prezime obavezno")]
        string Prezime,
        [Required(ErrorMessage = "Email obavezno")]
        string Email


        );
    }

