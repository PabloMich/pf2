using System.Text.RegularExpressions;

namespace OrbitNet.TDAs.Validaciones
{
    public static class ValidadorRegex
    {
        // instancias Regex reutilizables nombradas como mx
        private static readonly Regex mxId = new(@"^SAT-(ECU|POL)-\d{4}$", RegexOptions.Compiled | RegexOptions.CultureInvariant);
        private static readonly Regex mxIp = new(@"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$", RegexOptions.Compiled | RegexOptions.CultureInvariant);
        private static readonly Regex mxCoord = new(@"^-?\d{1,2}\.\d{4,6},-?\d{1,3}\.\d{4,6}$", RegexOptions.Compiled | RegexOptions.CultureInvariant);

        // Valida un identificador de satélite con el patrón exacto SAT-(ECU|POL)-####
        public static bool IdValido(string id)
        {
            if (string.IsNullOrWhiteSpace(id)) return false;
            return mxId.IsMatch(id);
        }

        // Valida una dirección IPv4 completa en notación decimal punteada
        public static bool IpValida(string ip)
        {
            if (string.IsNullOrWhiteSpace(ip)) return false;
            return mxIp.IsMatch(ip);
        }

        // Valida coordenadas en formato latitud,longitud con decimales fijos
        public static bool CoordenadaValida(string coord)
        {
            if (string.IsNullOrWhiteSpace(coord)) return false;
            return mxCoord.IsMatch(coord);
        }

        // Validación compuesta con mensaje de error claro
        public static (bool EsValido, string MensajeError) ValidarSatelite(string id, string ip)
        {
            if (!IdValido(id))
            {
                return (false, $"El ID de Satélite '{id}' no cumple con el formato RegEx exigido.");
            }

            if (!IpValida(ip))
            {
                return (false, $"La dirección IPv4 '{ip}' es inválida.");
            }

            return (true, "Satélite válido");
        }
    }
}