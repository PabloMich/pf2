using Microsoft.AspNetCore.Mvc;
using OrbitNet.Web.Models;
using System;

namespace OrbitNet.Web.Controllers
{
    [Route("api/v1/space")]
    [ApiController]
    public class CargaController : ControllerBase
    {
        private readonly LectorXML _lector;

        public CargaController()
        {
            _lector = new LectorXML();
        }

        [HttpPost("config")]
        public IActionResult SubirArchivo([FromBody] DatosXML peticion)
        {
            // validación de archivo vacío
            if (peticion == null || string.IsNullOrWhiteSpace(peticion.Contenido))
            {
                return BadRequest(new { 
                    status = "Error", 
                    error_code = "INVALID_PAYLOAD", 
                    details = "El cuerpo de la petición no contiene datos XML." 
                });
            }

            try
            {
                // lee y guarda cuantos nodos se procesaron
                int cantidadNodos = _lector.ProcesarArchivo(peticion.Contenido);
                
                // la respuesta exitosa
                return Ok(new {
                    status = "Success",
                    message = $"Configuración cargada exitosamente en RAM. Nodos procesados: {cantidadNodos}.",
                    timestamp = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
                });
            }
            catch (Exception errorDetectado)
            {
                return BadRequest(new {
                    status = "Error",
                    error_code = "XML_SCHEMA_VIOLATION",
                    details = errorDetectado.Message
                });
            }
        }
    }
}