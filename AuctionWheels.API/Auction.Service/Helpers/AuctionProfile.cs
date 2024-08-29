using Auction.Service.DTOs;
using AutoMapper;
using Contracts;

namespace Auction.Service.Helpers
{
    public class AuctionProfile : Profile
    {
        public AuctionProfile()
        {
            CreateMap<Models.Auction, AuctionDto>().IncludeMembers(x => x.Item);
            CreateMap<Models.Item, AuctionDto>();
            CreateMap<CreateAuctionDto, Models.Auction>()
                .ForMember(dest => dest.Item, opt => opt.MapFrom(src => src));
            CreateMap<CreateAuctionDto, Models.Item>();
            CreateMap<AuctionDto, AuctionCreated>();
            CreateMap<Models.Auction, AuctionCreated>();
            CreateMap<Models.Auction, AuctionUpdated>().IncludeMembers(x => x.Item);
        }
    }
}
