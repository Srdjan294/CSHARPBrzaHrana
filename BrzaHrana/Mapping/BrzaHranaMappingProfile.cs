using AutoMapper;
using BrzaHrana.Models;
using BrzaHrana.Models.DTO;

namespace BrzaHrana.Mapping
{
    public class BrzaHranaMappingProfile : Profile
    {
        public BrzaHranaMappingProfile()
        {
            // kreiramo mapiranja: izvor, odredište
            CreateMap<Jelovnik, JelovnikDTORead>();
            CreateMap<JelovnikDTORead, Jelovnik>();
            CreateMap<JelovnikDTOInsertUpdate, Jelovnik>();
        }
    }
}