using AutoMapper;
using Bidding.Service.DTOs;
using Bidding.Service.Models;
using Contracts;

namespace Bidding.Service.Helpers
{
    public class BiddingProfile : Profile
    {
        public BiddingProfile()
        {
            CreateMap<Bid, BidDto>();
            CreateMap<Bid, BidPlaced>();
        }
    }
}
