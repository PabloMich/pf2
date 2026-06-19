using OrbitNet.Data.Nodes;

namespace OrbitNet.Data.Structures
{
    public class BufferMensajesAbb
    {
        public object Raiz { get; private set; }

        public BufferMensajesAbb()
        {
            Raiz = null;
        }

        public void Insertar(int prioridad, string emisor, string receptor, string contenido)
        {
            Raiz = InsertarRecursivo(Raiz, prioridad, emisor, receptor, contenido);
        }

        private object InsertarRecursivo(object nodoObj, int prioridad, string emisor, string receptor, string contenido)
        {
            if (nodoObj == null)
            {
                return new MensajeAbbNode(prioridad, emisor, receptor, contenido);
            }

            MensajeAbbNode nodo = (MensajeAbbNode)nodoObj;

            // prioridades mayores (5) se van a la derecha
            if (prioridad <= nodo.Prioridad)
                nodo.Izquierdo = InsertarRecursivo(nodo.Izquierdo, prioridad, emisor, receptor, contenido);
            else
                nodo.Derecho = InsertarRecursivo(nodo.Derecho, prioridad, emisor, receptor, contenido);

            return nodo;
        }

        // el metodo atomico
        public MensajeAbbNode Dequeue()
        {
            if (Raiz == null) return null; 

            MensajeAbbNode nodoExtraido = null;
            Raiz = ExtraerExtremoDerecho(Raiz, ref nodoExtraido);
            return nodoExtraido;
        }

        private object ExtraerExtremoDerecho(object nodoObj, ref MensajeAbbNode extraido)
        {
            MensajeAbbNode nodo = (MensajeAbbNode)nodoObj;

            if (nodo.Derecho != null)
            {
                nodo.Derecho = ExtraerExtremoDerecho(nodo.Derecho, ref extraido);
                return nodo; 
            }

            extraido = nodo;
            return nodo.Izquierdo; 
        }
    }
}