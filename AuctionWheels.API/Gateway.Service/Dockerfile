FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
EXPOSE 80

# Copy all .csproj files and restore as distinct layers. Use of a same COPY Commadn 

COPY AuctionWheels.API/AuctionWheels.API.sln AuctionWheels.API/AuctionWheels.API.sln

COPY AuctionWheels.API/Auction.Service/Auction.Service.csproj AuctionWheels.API/Auction.Service/Auction.Service.csproj
COPY AuctionWheels.API/Search.Service/Search.Service.csproj AuctionWheels.API/Search.Service/Search.Service.csproj
COPY AuctionWheels.API/Gateway.Service/Gateway.Service.csproj AuctionWheels.API/Gateway.Service/Gateway.Service.csproj
COPY AuctionWheels.API/Bidding.Service/Bidding.Service.csproj AuctionWheels.API/Bidding.Service/Bidding.Service.csproj
COPY AuctionWheels.API/Identity.Service/Identity.Service.csproj AuctionWheels.API/Identity.Service/Identity.Service.csproj
COPY AuctionWheels.API/Contracts/Contracts.csproj AuctionWheels.API/Contracts/Contracts.csproj
COPY AuctionWheels.API/Notification.Service/Notification.Service.csproj AuctionWheels.API/Notification.Service/Notification.Service.csproj

RUN dotnet restore AuctionWheels.API/AuctionWheels.API.sln

# Copy everything else and build

COPY AuctionWheels.API/Gateway.Service AuctionWheels.API/Gateway.Service
COPY AuctionWheels.API/Contracts AuctionWheels.API/Contracts

WORKDIR /app/AuctionWheels.API/Gateway.Service

RUN dotnet publish -c Release -o /app/out

# Build runtime image

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "Gateway.Service.dll"]


