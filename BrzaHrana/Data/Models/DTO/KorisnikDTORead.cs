namespace BrzaHrana.Data.Models.DTO
{
    public record KorisnikDTORead(
        
        int Sifra,
        string? Ime,
        string? Prezime,
        string? Email
        
        );
}
