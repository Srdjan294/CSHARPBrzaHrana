using BrzaHrana.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace BrzaHrana.Data
{
    public class BrzaHranaContext : DbContext
    {
        public BrzaHranaContext(DbContextOptions<BrzaHranaContext> opcije) : base(opcije)
        {

        }

        public DbSet<Korisnik> Korisnici { get; set; }

        public DbSet<Jelovnik> Jelovnici { get; set; }
    }
}
