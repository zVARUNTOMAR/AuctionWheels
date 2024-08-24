using MongoDB.Driver;
using MongoDB.Entities;
using Search.Service.Models;
using System.Text.Json;

namespace Search.Service.Data
{
    public class DbInitializer
    {
        public static async Task InitDb(WebApplication app)
        {
            await DB.InitAsync("SearchDb", MongoClientSettings.FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnectionString")));

            await DB.Index<Item>()
                .Key(x => x.Make, KeyType.Text)
                .Key(x => x.Model, KeyType.Text)
                .Key(x => x.Color, KeyType.Text)
                .CreateAsync();

            var count = await DB.CountAsync<Item>();

            if (count == 0)
            {
                Console.WriteLine("Data already present!");
                var itemData = await File.ReadAllTextAsync("Data/Auction.json");

                JsonSerializerOptions options = new()
                {
                    PropertyNameCaseInsensitive = true,
                };

                var items = JsonSerializer.Deserialize<List<Item>>(itemData, options);

                await DB.SaveAsync(items!);
            }
        }
    }
}
