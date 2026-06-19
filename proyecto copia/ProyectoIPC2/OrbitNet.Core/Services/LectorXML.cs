using System;
using OrbitNet.Core.Models;

namespace OrbitNet.Core.Services
{
    public class LectorXML
    {
        private readonly XmlXPathIngestionService _ingestionService;

        public LectorXML()
        {
            _ingestionService = new XmlXPathIngestionService();
        }

        public int ProcesarArchivo(string contenidoXml)
        {
            // toda la lectura va al xmlimport
            XmlImportResult resultado = _ingestionService.Parse(contenidoXml);

            // Si hubo al menos un error en la carga masiva, dara error.
            if (!resultado.Success && resultado.Errors.Length > 0)
            {
                throw new Exception(resultado.Errors[0]);
            }

            // Inserción Segura. solo si el 100% está correcta
            int nodosProcesados = 0;

            for (int i = 0; i < resultado.Satellites.Length; i++)
            {
                var elemento = resultado.Satellites[i];
                if (elemento == null) break;

                nodosProcesados++;
            }

            return nodosProcesados;
        }
    }
}