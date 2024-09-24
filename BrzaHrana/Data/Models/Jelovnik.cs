

using EdunovaAPP.Data.Models;

namespace BrzaHrana.Data.Models
{
    public class Jelovnik : Entitet
    {
        public string? Naziv_Jela { get; set; }
        public string? Kategorija { get; set; }
        public decimal? Cijena { get; set; }
    }
}
