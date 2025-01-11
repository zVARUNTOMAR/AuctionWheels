using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using Notification.Service.Hubs;

namespace Notification.Service.Consumers
{
    public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public AuctionCreatedConsumer(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task Consume(ConsumeContext<AuctionCreated> context)
        {
            Console.WriteLine("Consume -> auction created message reciever");

            await _hubContext.Clients.All.SendAsync("AuctionCreated", context.Message);
        }
    }
}
