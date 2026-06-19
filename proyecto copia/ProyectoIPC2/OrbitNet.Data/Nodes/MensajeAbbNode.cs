namespace OrbitNet.Data.Nodes
{
    public class MensajeAbbNode
    {
        public int Prioridad { get; set; } 
        public string Emisor { get; set; }
        public string Receptor { get; set; }
        public string Contenido { get; set; }

        public object Izquierdo { get; set; }
        public object Derecho { get; set; }

        public MensajeAbbNode(int prioridad, string emisor, string receptor, string contenido)
        {
            Prioridad = prioridad;
            Emisor = emisor;
            Receptor = receptor;
            Contenido = contenido;
            Izquierdo = null;
            Derecho = null;
        }
    }
}