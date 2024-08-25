using MongoDB.Entities;
using Search.Service.Models;

namespace Search.Service.Services
{
    public class AuctionSvcHttpClient
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        public AuctionSvcHttpClient(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<List<Item>> GetItemsForSearchDb()
        {
            var lastUpdated = await DB.Find<Item, string>()
                .Sort(x => x.Descending(x => x.UpdatedAt))
                .Project(x => x.UpdatedAt.Value.ToString())
                .ExecuteFirstAsync();

            var url = $"{_configuration["AuctionServiceUrl"]}/api/auction?date={lastUpdated}";

            return await _httpClient.GetFromJsonAsync<List<Item>>(url);
        }
    }
}
