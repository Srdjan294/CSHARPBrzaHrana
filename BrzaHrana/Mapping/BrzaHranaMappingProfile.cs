using AutoMapper;
using BrzaHrana.Data.Models;
using BrzaHrana.Data.Models.DTO;
using BrzaHrana.Models;
using BrzaHrana.Models.DTO;
using System.Text.RegularExpressions;

namespace BrzaHrana.Mapping
{
    public class BrzaHranaMappingProfile : Profile
    {
        public BrzaHranaMappingProfile()
        {
            // kreiramo mapiranja: izvor, odredište
            CreateMap<Jelovnik, JelovnikDTORead>();
            //CreateMap<JelovnikDTORead, Jelovnik>();
            CreateMap<JelovnikDTOInsertUpdate, Jelovnik>();

            CreateMap<Korisnik, KorisnikDTORead>();
            //CreateMap<KorisnikDTORead, Korisnik>();
            CreateMap<KorisnikDTOInsertUpdate, Korisnik>();

            CreateMap<Narudzba, NarudzbaDTORead>()
                .ForCtorParam(
                    "KorisnikNaziv",
                    opt => opt.MapFrom(src => src.Korisnik.Ime + " " +  src.Korisnik.Prezime)
                )
                ;
            /*
            CreateMap<Narudzba, NarudzbaDTOInsertUpdate>().ForMember(
                   dest => dest.KorisnikSifra,
                   opt => opt.MapFrom(src => src.Korisnik.Sifra)
               );
            CreateMap<NarudzbaDTOInsertUpdate, Narudzba>();
            */

        }
    }
}