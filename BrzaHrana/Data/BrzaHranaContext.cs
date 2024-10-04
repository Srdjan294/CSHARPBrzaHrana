using BrzaHrana.Data.Models;
using BrzaHrana.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace BrzaHrana.Data
{
    public class BrzaHranaContext : DbContext
    {
        public BrzaHranaContext(DbContextOptions<BrzaHranaContext> opcije) : base(opcije)
        {

        }

        public DbSet<Korisnik> Korisnici { get; set; }

        public DbSet<Jelovnik> Jelovnici { get; set; }

        public DbSet<Narudzba> Narudzbe { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            // implementacija veze 1:n
            modelBuilder.Entity<Narudzba>().HasOne(n => n.Korisnik);

            // implementacija veze n:n
            modelBuilder.Entity<Narudzba>()
                .HasMany(n => n.Jelovnici)
                .WithMany(j => j.Narudzbe)
                .UsingEntity<Dictionary<string, object>>("stavke",
                s => s.HasOne<Jelovnik>().WithMany().HasForeignKey("jelovnik"),
                s => s.HasOne<Narudzba>().WithMany().HasForeignKey("narudzba"),
                s => s.ToTable("stavke")
                );

        }
    }
}
