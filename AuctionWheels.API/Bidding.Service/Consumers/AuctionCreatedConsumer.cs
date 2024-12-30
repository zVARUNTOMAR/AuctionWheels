using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace Bidding.Service.Consumers
{
    public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
    {
        public async Task Consume(ConsumeContext<AuctionCreated> context)
        {
            var auction = new Models.Auction
            {
                ID = context.Message.Id.ToString(),
                Seller = context.Message.Seller,
                AuctionEnd = (DateTime)context.Message.AuctionEnd,
                ReservePrice = context.Message.ReservePrice
            };

            await auction.SaveAsync();
        }
    }
}
