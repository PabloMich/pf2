namespace OrbitNet.Data.Nodes
{
    public class SateliteAvlNode
    {
        public string IdSatelite { get; set; }
        public string Nombre { get; set; }
        
        public object Izquierdo { get; set; }
        public object Derecho { get; set; }
        public int Altura { get; set; }

        public SateliteAvlNode(string idSatelite, string nombre)
        {
            IdSatelite = idSatelite;
            Nombre = nombre;
            Izquierdo = null;
            Derecho = null;
            Altura = 1;
        }
    }
}