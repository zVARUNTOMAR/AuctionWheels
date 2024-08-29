using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using Search.Service.Models;

namespace Search.Service.Consumer
{
    public class AuctionDeletedConsumer : IConsumer
    {
        private readonly IMapper _mapper;

        public AuctionDeletedConsumer(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task Consume(ConsumeContext<AuctionCreated> context)
        {
            Console.WriteLine("==> Consuming auction created : " + context.Message.Id);

            var result = await DB.DeleteAsync<Item>(context.Message.Id);

            if (!result.IsAcknowledged)
            {
                throw new MessageException(typeof(AuctionUpdated), "Problem updating mongodb");
            }
        }
    }
}
