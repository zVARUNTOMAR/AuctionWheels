using AutoMapper;
using Contracts;
using Search.Service.Models;

namespace Search.Service.Helpers
{
    public class SearchProfile : Profile
    {
        public SearchProfile()
        {
            CreateMap<AuctionCreated, Item>();
        }
    }
}
