﻿using AutoMapper;
using BrzaHrana.Data;
using BrzaHrana.Data.Models;
using BrzaHrana.Models;
using BrzaHrana.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace BrzaHrana.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class NaruzdbaController(BrzaHranaContext context, IMapper mapper) : BrzaHranaController(context, mapper)
    {


        // RUTE
        [HttpGet]
        public ActionResult<List<NarudzbaDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<NarudzbaDTORead>>(_context.Narudzbe.Include(n => n.Korisnik)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }


        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<NarudzbaDTOInsertUpdate> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Narudzba? e;
            try
            {
                e = _context.Narudzbe.Include(n => n.Korisnik).FirstOrDefault(x => x.Sifra == sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Narudžba ne postoji u bazi" });
            }

            return Ok(_mapper.Map<NarudzbaDTOInsertUpdate>(e));
        }

        [HttpPost]
        public IActionResult Post(NarudzbaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            Korisnik? es;
            try
            {
                es = _context.Korisnici.Find(dto.KorisnikSifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (es == null)
            {
                return NotFound(new { poruka = "Korisnik na narudžbi ne postoji u bazi" });
            }

            try
            {
                var e = _mapper.Map<Narudzba>(dto);
                e.Korisnik = es;
                _context.Narudzbe.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<NarudzbaDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }



        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, NarudzbaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Narudzba? e;
                try
                {
                    e = _context.Narudzbe.Include(n => n.Korisnik).FirstOrDefault(n => n.Sifra == sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Narudžba ne postoji u bazi" });
                }

                Korisnik? es;
                try
                {
                    es = _context.Korisnici.Find(dto.KorisnikSifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (es == null)
                {
                    return NotFound(new { poruka = "Korisnik na narudžbi ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);
                e.Korisnik = es;
                _context.Narudzbe.Update(e);
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
                Narudzba? e;
                try
                {
                    e = _context.Narudzbe.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Narudžba ne postoji u bazi");
                }
                _context.Narudzbe.Remove(e);
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