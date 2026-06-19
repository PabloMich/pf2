using System;
using OrbitNet.Data.Nodes;

namespace OrbitNet.Data.Structures
{
    public class ArbolSatelitesAvl
    {
        public object Raiz { get; private set; }

        public ArbolSatelitesAvl()
        {
            Raiz = null;
        }

        private int ObtenerAltura(object nodoObj)
        {
            if (nodoObj == null) return 0;
            return ((SateliteAvlNode)nodoObj).Altura;
        }

        private int ObtenerEquilibrio(object nodoObj)
        {
            if (nodoObj == null) return 0;
            SateliteAvlNode nodo = (SateliteAvlNode)nodoObj;
            return ObtenerAltura(nodo.Izquierdo) - ObtenerAltura(nodo.Derecho);
        }

        private object RotacionDerecha(object yObj)
        {
            SateliteAvlNode y = (SateliteAvlNode)yObj;
            SateliteAvlNode x = (SateliteAvlNode)y.Izquierdo;
            object T2 = x.Derecho;

            x.Derecho = y;
            y.Izquierdo = T2;

            y.Altura = Math.Max(ObtenerAltura(y.Izquierdo), ObtenerAltura(y.Derecho)) + 1;
            x.Altura = Math.Max(ObtenerAltura(x.Izquierdo), ObtenerAltura(x.Derecho)) + 1;

            return x;
        }

        private object RotacionIzquierda(object xObj)
        {
            SateliteAvlNode x = (SateliteAvlNode)xObj;
            SateliteAvlNode y = (SateliteAvlNode)x.Derecho;
            object T2 = y.Izquierdo;

            y.Izquierdo = x;
            x.Derecho = T2;

            x.Altura = Math.Max(ObtenerAltura(x.Izquierdo), ObtenerAltura(x.Derecho)) + 1;
            y.Altura = Math.Max(ObtenerAltura(y.Izquierdo), ObtenerAltura(y.Derecho)) + 1;

            return y;
        }

        public void Insertar(string id, string nombre)
        {
            Raiz = InsertarRecursivo(Raiz, id, nombre);
        }

        private object InsertarRecursivo(object nodoObj, string id, string nombre)
        {
            if (nodoObj == null)
                return new SateliteAvlNode(id, nombre);

            SateliteAvlNode nodo = (SateliteAvlNode)nodoObj;
            int comparacion = string.Compare(id, nodo.IdSatelite, StringComparison.Ordinal);

            if (comparacion < 0)
                nodo.Izquierdo = InsertarRecursivo(nodo.Izquierdo, id, nombre);
            else if (comparacion > 0)
                nodo.Derecho = InsertarRecursivo(nodo.Derecho, id, nombre);
            else
                return nodo; 

            nodo.Altura = 1 + Math.Max(ObtenerAltura(nodo.Izquierdo), ObtenerAltura(nodo.Derecho));
            int equilibrio = ObtenerEquilibrio(nodo);

            if (equilibrio > 1 && string.Compare(id, ((SateliteAvlNode)nodo.Izquierdo).IdSatelite, StringComparison.Ordinal) < 0)
                return RotacionDerecha(nodo);

            if (equilibrio < -1 && string.Compare(id, ((SateliteAvlNode)nodo.Derecho).IdSatelite, StringComparison.Ordinal) > 0)
                return RotacionIzquierda(nodo);

            if (equilibrio > 1 && string.Compare(id, ((SateliteAvlNode)nodo.Izquierdo).IdSatelite, StringComparison.Ordinal) > 0)
            {
                nodo.Izquierdo = RotacionIzquierda(nodo.Izquierdo);
                return RotacionDerecha(nodo);
            }

            if (equilibrio < -1 && string.Compare(id, ((SateliteAvlNode)nodo.Derecho).IdSatelite, StringComparison.Ordinal) < 0)
            {
                nodo.Derecho = RotacionDerecha(nodo.Derecho);
                return RotacionIzquierda(nodo);
            }

            return nodo;
        }

        public bool ExisteSatelite(string id)
        {
            return ExisteSateliteRecursivo(Raiz, id);
        }

        private bool ExisteSateliteRecursivo(object nodoObj, string id)
        {
            if (nodoObj == null) 
                return false;

            SateliteAvlNode nodo = (SateliteAvlNode)nodoObj;
            int comparacion = string.Compare(id, nodo.IdSatelite, StringComparison.Ordinal);

            if (comparacion == 0) 
                return true; 
                
            if (comparacion < 0) 
                return ExisteSateliteRecursivo(nodo.Izquierdo, id); 
                
            return ExisteSateliteRecursivo(nodo.Derecho, id); 
        }
    }
}