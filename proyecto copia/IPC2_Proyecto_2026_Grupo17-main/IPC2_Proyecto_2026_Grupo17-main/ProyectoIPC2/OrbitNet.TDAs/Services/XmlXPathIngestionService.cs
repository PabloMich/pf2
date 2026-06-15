using System.IO;
using System.Xml;
using OrbitNet.TDAs.Models;
using OrbitNet.TDAs.Validaciones;

namespace OrbitNet.TDAs.Services;

public sealed class XmlXPathIngestionService
{
    public XmlImportResult Parse(string xmlContent)
    {
        var result = new XmlImportResult();

        if (string.IsNullOrWhiteSpace(xmlContent))
        {
            LogError(result, "El XML está vacío.", "XML");
            return result;
        }

        var settings = new XmlReaderSettings
        {
            DtdProcessing = DtdProcessing.Prohibit,
            XmlResolver = null
        };

        var document = new XmlDocument();

        try
        {
            using var mxReader = XmlReader.Create(new StringReader(xmlContent), settings);
            document.Load(mxReader);
        }
        catch (XmlException mxParseError)
        {
            var message = $"El XML no es válido: {mxParseError.Message}";
            result.ValidationError = new XmlValidationError
            {
                Tag = "XML",
                Message = message,
                LineNumber = mxParseError.LineNumber
            };

            result.Auditoria.WriteEvent("ERROR", message);
            result.AddError(message);
            return result;
        }

        var mxSatelliteNodes = document.SelectNodes("//constelaciones_ecuatoriales/satelite | //constelaciones_polares/satelite | //orbitas_polares/polar/satelite | //antenas_terrestres/antena | //constelaciones/satelite");

        if (mxSatelliteNodes is null || mxSatelliteNodes.Count == 0)
        {
            LogError(result, "No se encontraron nodos <satelite> en el XML.", "satelite");
            return result;
        }

        foreach (XmlNode mxSatelliteNode in mxSatelliteNodes)
        {
            var mxId = mxSatelliteNode.Attributes?["id"]?.Value?.Trim() ?? string.Empty;
            var mxName = mxSatelliteNode.SelectSingleNode("nombre")?.InnerText.Trim() ?? string.Empty;
            var mxIpAddress = mxSatelliteNode.SelectSingleNode("enlace_ip")?.InnerText.Trim() ?? string.Empty;
            var mxCoordinates = mxSatelliteNode.SelectSingleNode("coordenadas")?.InnerText.Trim() ?? string.Empty;
            var mxOrbitType = mxSatelliteNode.ParentNode?.Name ?? "desconocido";

            if (string.IsNullOrWhiteSpace(mxId))
            {
                LogError(result, "Se encontró un satélite sin atributo id.", "satelite");
                return result;
            }

            if (!ValidadorRegex.IdValido(mxId))
            {
                var message = $"El id '{mxId}' no cumple el formato SAT-ECU-0000 o SAT-POL-0000.";
                result.ValidationError = new XmlValidationError { Tag = "id", Message = message };
                result.Auditoria.WriteEvent("ERROR", message);
                result.AddError(message);
                return result;
            }

            if (string.IsNullOrWhiteSpace(mxName))
            {
                var message = $"El satélite '{mxId}' no tiene un nombre válido.";
                result.ValidationError = new XmlValidationError { Tag = "nombre", Message = message };
                result.Auditoria.WriteEvent("ERROR", message);
                result.AddError(message);
                return result;
            }

            if (!ValidadorRegex.IpValida(mxIpAddress))
            {
                var message = $"La IP '{mxIpAddress}' del satélite '{mxId}' no es válida.";
                result.ValidationError = new XmlValidationError { Tag = "enlace_ip", Message = message };
                result.Auditoria.WriteEvent("ERROR", message);
                result.AddError(message);
                return result;
            }

            if (!ValidadorRegex.CoordenadaValida(mxCoordinates))
            {
                var message = $"Las coordenadas '{mxCoordinates}' del satélite '{mxId}' no son válidas.";
                result.ValidationError = new XmlValidationError { Tag = "coordenadas", Message = message };
                result.Auditoria.WriteEvent("ERROR", message);
                result.AddError(message);
                return result;
            }

            result.AddSatellite(new SatelliteImportItem(mxId, mxName, mxIpAddress, mxCoordinates, mxOrbitType));
        }

        return result;
    }

    private static void LogError(XmlImportResult result, string errorMessage, string tag)
    {
        result.ValidationError = new XmlValidationError { Tag = tag, Message = errorMessage };
        result.Auditoria.WriteEvent("ERROR", errorMessage);
        result.AddError(errorMessage);
    }
}