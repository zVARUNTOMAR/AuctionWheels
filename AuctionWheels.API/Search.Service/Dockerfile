FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
EXPOSE 80

# Copy all .csproj files and restore as distinct layers. Use of a same COPY Commadn 

COPY AuctionWheels.API.sln AuctionWheels.API.sln

COPY Auction.Service/Auction.Service.csproj Auction.Service/Auction.Service.csproj
COPY Search.Service/Search.Service.csproj Search.Service/Search.Service.csproj
COPY Gateway.Service/Gateway.Service.csproj Gateway.Service/Gateway.Service.csproj
COPY Bidding.Service/Bidding.Service.csproj Bidding.Service/Bidding.Service.csproj
COPY Identity.Service/Identity.Service.csproj Identity.Service/Identity.Service.csproj
COPY Contracts/Contracts.csproj Contracts/Contracts.csproj
COPY Notification.Service/Notification.Service.csproj Notification.Service/Notification.Service.csproj

RUN dotnet restore AuctionWheels.API.sln

# Copy everything else and build

COPY Search.Service Search.Service
COPY Contracts Contracts

WORKDIR /app/Search.Service

RUN dotnet publish -c Release -o /app/out

# Build runtime image

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "Search.Service.dll"]


