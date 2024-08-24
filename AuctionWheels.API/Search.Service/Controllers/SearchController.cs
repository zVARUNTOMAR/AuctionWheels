using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using Search.Service.Helpers;
using Search.Service.Models;

namespace Search.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Item>>> SearchItems([FromQuery] SearchParam searchParam)
        {
            var query = DB.PagedSearch<Item, Item>();

            query.Sort(x => x.Ascending(a => a.Make));

            if (!string.IsNullOrWhiteSpace(searchParam.SearchTerm))
            {
                query.Match(MongoDB.Entities.Search.Full, searchParam.SearchTerm).SortByTextScore();
            }

            query = searchParam.OrderBy switch
            {
                "make" => query.Sort(x => x.Ascending(a => a.Make)),
                "new" => query.Sort(x => x.Ascending(a => a.CreatedAt)),
                _ => query.Sort(x => x.Ascending(a => a.AuctionEnd))
            };

            query = searchParam.FilterBy switch
            {
                "finished" => query.Match(x => x.AuctionEnd < DateTime.UtcNow),
                "endingSoon" => query.Match(x => x.AuctionEnd < DateTime.UtcNow.AddHours(6) && x.AuctionEnd > DateTime.UtcNow),
                _ => query.Match(x => x.AuctionEnd > DateTime.UtcNow)
            };

            if (!string.IsNullOrWhiteSpace(searchParam.Seller))
            {
                query.Match(x => x.Seller == searchParam.Seller);
            }

            if (!string.IsNullOrWhiteSpace(searchParam.Winner))
            {
                query.Match(x => x.Winner == searchParam.Winner);
            }

            query.PageNumber(searchParam.PageNumber);
            query.PageSize(searchParam.PageSize);

            var result = await query.ExecuteAsync();

            return Ok(new { results = result.Results, pageCount = result.PageCount, totalCount = result.TotalCount });
        }
    }
}
