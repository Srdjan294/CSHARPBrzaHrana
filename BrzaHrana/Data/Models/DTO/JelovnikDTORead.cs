
namespace BrzaHrana.Models.DTO
{
    public record JelovnikDTORead(
        int Sifra,
        string? Naziv_Jela,
        string? Kategorija,
        decimal? Cijena
        );


}