using Auction.Service.Data;
using Auction.Service.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Auction.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly AuctionDbContext _dbContext;
        private IPublishEndpoint _publishEndpoint;

        public AuctionController(IMapper mapper, AuctionDbContext dbContext, IPublishEndpoint publishEndpoint)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _publishEndpoint = publishEndpoint;
        }

        [HttpGet]
        public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions(string? date)
        {

            var query = _dbContext.Auctions.OrderBy(x => x.Item.Make).AsQueryable();

            if (!string.IsNullOrWhiteSpace(date))
            {
                query = query.Where(x => x.UpdatedAt.Value.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
            }

            return await query.ProjectTo<AuctionDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
        {
            var auction = await _dbContext.Auctions
                .Include(x => x.Item)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);

            if (auction == null)
            {
                return NotFound();
            }

            return _mapper.Map<AuctionDto>(auction);
        }

        [HttpPost]
        public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto auctionDto)
        {
            var auction = _mapper.Map<Models.Auction>(auctionDto);
            auction.Seller = "test";

            await _dbContext.Auctions.AddAsync(auction);

            var item = _mapper.Map<AuctionCreated>(auction);

            await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(item));

            var result = await _dbContext.SaveChangesAsync() > 0;

            if (!result)
            {
                return BadRequest("Error Occurred while adding Auction");
            }

            return CreatedAtAction(nameof(GetAuctionById), new { auction.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDto updateAuctionDto)
        {
            var auction = await _dbContext.Auctions.Include(x => x.Item).FirstOrDefaultAsync(x => x.Id == id);

            if (auction == null)
            {
                return NotFound();
            }

            auction.Item.Make = updateAuctionDto.Make ?? auction.Item.Make;
            auction.Item.Color = updateAuctionDto.Color ?? auction.Item.Color;
            auction.Item.Year = updateAuctionDto.Year;
            auction.Item.Mileage = updateAuctionDto.Mileage;
            auction.Item.Model = updateAuctionDto.Model ?? auction.Item.Model;

            await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auction));

            var result = await _dbContext.SaveChangesAsync() > 0;

            if (result) return Ok(result);

            return BadRequest("Error occurred while updating Auction");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAction(Guid id)
        {
            var auction = await _dbContext.Auctions.FindAsync(id);

            if (auction == null)
            {
                return NotFound();
            }

            _dbContext.Remove(auction);

            await _publishEndpoint.Publish(new { Id = auction.Id.ToString() });

            var result = await _dbContext.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Error occurred while deleting auction");

            return Ok();
        }
    }
}
