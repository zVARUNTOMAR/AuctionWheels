using Contracts;
using MassTransit;
using MongoDB.Entities;
using Search.Service.Models;

namespace Search.Service.Consumer
{
    public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
    {
        public async Task Consume(ConsumeContext<AuctionFinished> context)
        {
            var auction = await DB.Find<Item>().OneAsync(context.Message.AuctionId);

            if (context.Message.ItemSold)
            {
                auction.Winner = context.Message.Winner;
                auction.SoldAmount = context.Message.Amount;
            }

            auction.Status = "Finished";

            await auction.SaveAsync();

        }

    }
}
