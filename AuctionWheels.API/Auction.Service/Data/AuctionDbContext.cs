using Microsoft.EntityFrameworkCore;

namespace Auction.Service.Data
{
    public class AuctionDbContext : DbContext
    {
        public AuctionDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Models.Auction> Auctions { get; set; }
    }
}
