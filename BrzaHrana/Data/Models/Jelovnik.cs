

using BrzaHrana.Data.Models;
using BrzaHrana.Models;
using System.Text.RegularExpressions;

namespace BrzaHrana.Data.Models
{
    public class Jelovnik : Entitet
    {
        public string? Naziv_Jela { get; set; }
        public string? Kategorija { get; set; }
        public decimal? Cijena { get; set; }
        public ICollection<Narudzba>? Narudzbe { get; } = [];
    }
}
