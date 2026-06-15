using Microsoft.AspNetCore.Http;
using OrbitNet.TDAs.Models;

namespace OrbitNet.Web.Models;

public sealed class XmlIngestionViewModel
{
    public string? XmlContent { get; set; }

    public IFormFile? XmlFile { get; set; }

    public SatelliteImportItem[] Results { get; set; } = [];

    public string[] Errors { get; set; } = [];

    public string? ErrorTag { get; set; }

    public int? ErrorLine { get; set; }

    public string? ErrorMessage { get; set; }
}