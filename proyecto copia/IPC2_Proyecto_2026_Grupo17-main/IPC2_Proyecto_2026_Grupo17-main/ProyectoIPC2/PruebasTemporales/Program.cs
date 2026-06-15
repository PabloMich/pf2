using System;
using OrbitNet.TDAs.Validaciones;

namespace OrbitNet.PruebasTemporales
{
    public class Prueba
    {
        public static void Main()
        {
            Console.WriteLine("=== INICIANDO PRUEBAS DE REGEX ===\n");

            // 1. Pruebas de ID de Satélite
            ProbarId("SAT-ECU-0001", true);
            ProbarId("SAT-99", false);

            // 2. Pruebas de IPv4
            ProbarIp("127.0.0.1", true);
            ProbarIp("300.300.300.300", false);

            // 3. Pruebas de Coordenadas
            ProbarCoordenada("14.5891,-90.5555", true);
            ProbarCoordenada("hola,mundo", false);

            Console.WriteLine("\n=== PRUEBA DEL MÉTODO COMPUESTO ValidarSatelite ===");

            var resultadoExito = ValidadorRegex.ValidarSatelite("SAT-POL-1001", "10.0.0.50");
            Console.WriteLine($"\nPrueba Satélite Correcto:\n- ¿Es válido?: {resultadoExito.EsValido}\n- Mensaje: {resultadoExito.MensajeError}");

            var resultadoFallo = ValidadorRegex.ValidarSatelite("SAT-99", "300.300.300.300");
            Console.WriteLine($"\nPrueba Satélite Incorrecto:\n- ¿Es válido?: {resultadoFallo.EsValido}\n- Mensaje: {resultadoFallo.MensajeError}");

            Console.WriteLine("\nPresiona cualquier tecla para salir...");
            Console.ReadLine();
        }

        private static void ProbarId(string id, bool valorEsperado)
        {
            bool resultado = ValidadorRegex.IdValido(id);
            string estado = resultado == valorEsperado ? "ÉXITO" : "FALLO";
            Console.WriteLine($"{estado} | ID '{id}' -> {(resultado ? "válido" : "inválido")}");
        }

        private static void ProbarIp(string ip, bool valorEsperado)
        {
            bool resultado = ValidadorRegex.IpValida(ip);
            string estado = resultado == valorEsperado ? "ÉXITO" : "FALLO";
            Console.WriteLine($"{estado} | IP '{ip}' -> {(resultado ? "válido" : "inválido")}");
        }

        private static void ProbarCoordenada(string coord, bool valorEsperado)
        {
            bool resultado = ValidadorRegex.CoordenadaValida(coord);
            string estado = resultado == valorEsperado ? "ÉXITO" : "FALLO";
            Console.WriteLine($"{estado} | Coord '{coord}' -> {(resultado ? "válido" : "inválido")}");
        }
    }
}