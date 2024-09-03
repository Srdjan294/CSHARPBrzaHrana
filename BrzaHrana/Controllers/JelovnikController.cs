using BrzaHrana.Data.Models;
using BrzaHrana.Data;
using BrzaHrana.Data.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Contracts;

namespace BrzaHrana.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class JelovnikController : ControllerBase
    {

        // dependency injection
        // 1. definiraš privatno svojstvo
        private readonly BrzaHranaContext _context;

        // dependency injection
        // 2. proslijediš instancu kroz konstruktor 

        public JelovnikController(BrzaHranaContext context)
        {
            _context = context;
        }

        // RUTE

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Jelovnici);
        }



        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            return Ok(_context.Jelovnici.Find(sifra));

        }


        [HttpPost]

        public IActionResult Post(Jelovnik jelovnik)
        {
            _context.Jelovnici.Add(jelovnik);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, jelovnik);
        }


        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]

        public IActionResult Put(int sifra, Jelovnik jelo)
        {
            var jeloIzBaze = _context.Jelovnici.Find(sifra);

            // za sada ručno, kasnije Mapper

            jeloIzBaze.Naziv_Jela = jelo.Naziv_Jela;
            jeloIzBaze.Kategorija = jelo.Kategorija;
            jeloIzBaze.Cijena = jelo.Cijena;


            _context.Jelovnici.Update(jeloIzBaze);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });
        }



        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]

        public IActionResult Delete(int sifra)
        {
            var jeloIzBaze = _context.Jelovnici.Find(sifra);
            _context.Jelovnici.Remove(jeloIzBaze);
            _context.SaveChanges();
            return Ok(new { poruka = "Uspješno obrisano" });
        }
    }
}
