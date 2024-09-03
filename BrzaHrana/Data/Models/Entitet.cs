using System.ComponentModel.DataAnnotations;

namespace EdunovaAPP.Data.Models
{
    public abstract class Entitet
    {
        [Key]
        public int Sifra { get; set; }
    }
}
