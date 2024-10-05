using BrzaHrana.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace BrzaHrana.Models
{
    public class Narudzba : Entitet
    {

        [ForeignKey("korisnik")]
        public required Korisnik Korisnik { get; set; }

        public string? Adresa { get; set; }

        public DateTime? Datum { get; set; }

        [Column("Ukupna_Cijena")]
        public decimal? UkupnaCijena { get; set; }

    }
}