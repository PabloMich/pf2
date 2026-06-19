namespace OrbitNet.Core.Models;

public sealed record SatelliteImportItem(
    string Id,
    string Name,
    string IpAddress,
    string Coordinates,
    string OrbitType);