using Duende.IdentityServer.Models;

namespace Service.Identity
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("auctionWheels", "Auction Wheels Full Access"),

            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                new Client
                {
                    ClientId = "postman",
                    ClientName = "Postman",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    ClientSecrets = { new Secret("secret".Sha256()) },
                    AllowedScopes = { "openid","profile", "auctionWheels"},
                    RedirectUris = {"https://www.getpost.com/what"}
                }
            };
    }
}
