using Contracts;
using MassTransit;

namespace Auction.Service.Consumers
{
    public class AuctionCreatedFaultConsumer : IConsumer<Fault<AuctionCreated>>
    {
        public async Task Consume(ConsumeContext<Fault<AuctionCreated>> context)
        {
            Console.WriteLine("Consming fault :");

            var exception = context.Message.Exceptions.FirstOrDefault();

            if (exception.ExceptionType == "System.ArgumentException")
            {
                context.Message.Message.Model = "Folder";
                await context.Publish(context.Message.Message);
            }
            else
            {
                Console.WriteLine("Not a argument Exception - updated error");
            }

        }
    }
}
