using System.Text.Json.Serialization;

namespace OrbitNet.Web.Models
{
    public class DatosXML
    {
        [JsonPropertyName("xml_data")]
        public string? Contenido { get; set; } 
    }
}
