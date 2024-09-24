using System.ComponentModel.DataAnnotations;

namespace BrzaHrana.Data.Models
{
    public abstract class Entitet
    {
        [Key]
        public int Sifra { get; set; }
    }
}
