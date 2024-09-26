using BrzaHrana.Data.Models;
using BrzaHrana.Data;
using AutoMapper;
using BrzaHrana.Data.Models;
using BrzaHrana.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Contracts;

namespace BrzaHrana.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class JelovnikController(BrzaHranaContext context, IMapper mapper) : BrzaHranaController(context, mapper)
    {

        

        // RUTE

        [HttpGet]
        public ActionResult<List<JelovnikDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<JelovnikDTORead>>(_context.Jelovnici));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }



        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<JelovnikDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Jelovnik? e;
            try
            {
                e = _context.Jelovnici.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Jelo ne postoji u bazi" });
            }

            return Ok(_mapper.Map<JelovnikDTORead>(e));

        }


        [HttpPost]

        public IActionResult Post(JelovnikDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _mapper.Map<Jelovnik>(dto);
                _context.Jelovnici.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<JelovnikDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }



        }


        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]

        public IActionResult Put(int sifra, JelovnikDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Jelovnik? e;
                try
                {
                    e = _context.Jelovnici.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Jelo ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);

                _context.Jelovnici.Update(e);
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
                Jelovnik? e;
                try
                {
                    e = _context.Jelovnici.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Jelo ne postoji u bazi");
                }
                _context.Jelovnici.Remove(e);
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
