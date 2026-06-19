using System.Diagnostics;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using OrbitNet.Core.Services;
using OrbitNet.Web.Models;

namespace OrbitNet.Web.Controllers;

public class HomeController : Controller
{
    private readonly XmlXPathIngestionService xmlIngestionService = new();

    public IActionResult Index()
    {
        return View(new XmlIngestionViewModel());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Index(XmlIngestionViewModel model)
    {
        string xmlContent = model.XmlContent ?? string.Empty;

        if (model.XmlFile is not null && model.XmlFile.Length > 0)
        {
            await using var stream = model.XmlFile.OpenReadStream();
            using var reader = new StreamReader(stream, Encoding.UTF8);
            xmlContent = await reader.ReadToEndAsync();
        }

        var result = xmlIngestionService.Parse(xmlContent);

        model.Results = result.Satellites;
        model.Errors = result.Errors;
        model.ErrorTag = result.ValidationError?.Tag;
        model.ErrorLine = result.ValidationError?.LineNumber;
        model.ErrorMessage = result.ValidationError?.Message;
        model.XmlContent = xmlContent;

        return View(model);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
