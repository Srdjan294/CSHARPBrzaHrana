using BrzaHrana.Data.Models;
using BrzaHrana.Data;
using BrzaHrana.Data.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Contracts;

namespace BrzaHrana.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class KorisnikController : ControllerBase
    {

        // dependency injection
        // 1. definiraš privatno svojstvo
        private readonly BrzaHranaContext _context;

        // dependency injection
        // 2. proslijediš instancu kroz konstruktor 

        public KorisnikController(BrzaHranaContext context)
        {
            _context = context;
        }

        // RUTE

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Korisnici);
        }



        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            return Ok(_context.Korisnici.Find(sifra));

        }


        [HttpPost]

        public IActionResult Post(Korisnik korisnik)
        {
            _context.Korisnici.Add(korisnik);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, korisnik);
        }


        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]

        public IActionResult Put(int sifra, Korisnik korisnik)
        {
            var korisnikIzBaze = _context.Korisnici.Find(sifra);

            // za sada ručno, kasnije Mapper

            korisnikIzBaze.Ime = korisnik.Ime;
            korisnikIzBaze.Prezime = korisnik.Prezime;
            korisnikIzBaze.Email = korisnik.Email;
            

            _context.Korisnici.Update(korisnikIzBaze);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });
        }



        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]

        public IActionResult Delete(int sifra)
        {
            var korisnikIzBaze = _context.Korisnici.Find(sifra);
            _context.Korisnici.Remove(korisnikIzBaze);
            _context.SaveChanges();
            return Ok(new { poruka = "Uspješno obrisano" });
        }
    }
}
