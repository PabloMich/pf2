using System;
using System.Collections.Generic;
using OrbitNet.Data.Nodes;

namespace OrbitNet.Data.Interfaces
{
    public interface IAbstractCollection
    {
        void Insert(int row, int col, string satelliteId, object? data = null);

        MatrixNode? Search(int row, int col);

        MatrixNode? SearchBySatelliteId(string satelliteId);

        IEnumerable<MatrixNode> GetNodes();

        IReadOnlyList<MatrixNode> BuscarRuta(string origen, string destino, Func<string, bool> validarDestino);
    }
}
