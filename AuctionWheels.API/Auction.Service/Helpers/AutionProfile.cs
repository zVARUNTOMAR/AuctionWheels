using Auction.Service.DTOs;
using AutoMapper;

namespace Auction.Service.Helpers
{
    public class AutionProfile : Profile
    {
        public AutionProfile()
        {
            CreateMap<Models.Auction, AuctionDto>().IncludeMembers(x => x.Item);
            CreateMap<Models.Item, AuctionDto>();
            CreateMap<CreateAuctionDto, Models.Auction>()
                .ForMember(dest => dest.Item, opt => opt.MapFrom(src => src));
            CreateMap<CreateAuctionDto, Models.Item>();
        }
    }
}
