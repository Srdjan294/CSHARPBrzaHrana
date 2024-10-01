using BrzaHrana.Data.Models;
using BrzaHrana.Data;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using BrzaHrana.Models.DTO;
using System.Diagnostics.Contracts;
using BrzaHrana.Data.Models.DTO;

namespace BrzaHrana.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class KorisnikController(BrzaHranaContext context, IMapper mapper) : BrzaHranaController(context, mapper)
    {

        

        // RUTE

        [HttpGet]
        public ActionResult<List<KorisnikDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<KorisnikDTORead>>(_context.Korisnici));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }



        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<KorisnikDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Korisnik? e;
            try
            {
                e = _context.Korisnici.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Korisnik ne postoji u bazi" });
            }

            return Ok(_mapper.Map<KorisnikDTORead>(e));


        }


        [HttpPost]

        public IActionResult Post(KorisnikDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _mapper.Map<Korisnik>(dto);
                _context.Korisnici.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<KorisnikDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }


        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]

        public IActionResult Put(int sifra, KorisnikDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Korisnik? e;
                try
                {
                    e = _context.Korisnici.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Korisnik ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);

                _context.Korisnici.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }



        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]

        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Korisnik? e;
                try
                {
                    e = _context.Korisnici.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Korisnik ne postoji u bazi");
                }
                _context.Korisnici.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }
    }
}
