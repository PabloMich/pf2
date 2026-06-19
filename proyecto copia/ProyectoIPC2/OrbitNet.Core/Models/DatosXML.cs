using System.Text.Json.Serialization;

namespace OrbitNet.Core.Models
{
    public class DatosXML
    {
        [JsonPropertyName("xml_data")]
        public string? Contenido { get; set; } 
    }
}
