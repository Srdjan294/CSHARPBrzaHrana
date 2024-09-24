using AutoMapper;
using BrzaHrana.Data;
using BrzaHrana.Models;
using Microsoft.AspNetCore.Mvc;

namespace BrzaHrana.Controllers
{

    public abstract class BrzaHranaController : ControllerBase
    {

        // dependecy injection
        // 1. definiraš privatno svojstvo
        protected readonly BrzaHranaContext _context;

        protected readonly IMapper _mapper;


        // dependecy injection
        // 2. proslijediš instancu kroz konstruktor
        public BrzaHranaController(BrzaHranaContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }




    }
}