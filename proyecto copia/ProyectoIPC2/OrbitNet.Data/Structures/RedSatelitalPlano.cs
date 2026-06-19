using System;
using System.Collections.Generic;
using OrbitNet.Data.Interfaces;
using OrbitNet.Data.Nodes;

namespace OrbitNet.Data.Structures
{
    public class RedSatelitalPlano : IAbstractCollection
    {
        private HeaderNode? rowHeaders;
        private HeaderNode? colHeaders;

        public void Insert(int row, int col, string satelliteId, object? data = null)
        {
            if (row < 0)
                throw new ArgumentOutOfRangeException(nameof(row), "El índice de fila no puede ser negativo.");

            if (col < 0)
                throw new ArgumentOutOfRangeException(nameof(col), "El índice de columna no puede ser negativo.");

            if (string.IsNullOrWhiteSpace(satelliteId))
                throw new ArgumentException("El identificador de satélite no puede ser vacío.", nameof(satelliteId));

            var newNode = new MatrixNode(row, col, satelliteId.Trim(), data);
            var rowHeader = GetOrCreateRowHeader(row);
            var colHeader = GetOrCreateColHeader(col);

            InsertIntoRow(rowHeader, newNode);
            InsertIntoColumn(colHeader, newNode);
        }

        public MatrixNode? Search(int row, int col)
        {
            var rowHeader = FindHeader(rowHeaders, row);
            if (rowHeader == null)
                return null;

            var current = rowHeader.Access;
            while (current != null && current.Col < col)
            {
                current = current.Right;
            }

            return current != null && current.Col == col ? current : null;
        }

        public MatrixNode? SearchBySatelliteId(string satelliteId)
        {
            if (string.IsNullOrWhiteSpace(satelliteId))
                return null;

            foreach (var node in GetNodes())
            {
                if (string.Equals(node.SatelliteId, satelliteId.Trim(), StringComparison.OrdinalIgnoreCase))
                    return node;
            }

            return null;
        }

        public IEnumerable<MatrixNode> GetNodes()
        {
            var currentHeader = rowHeaders;
            while (currentHeader != null)
            {
                var current = currentHeader.Access;
                while (current != null)
                {
                    yield return current;
                    current = current.Right;
                }

                currentHeader = currentHeader.Next;
            }
        }

        public IReadOnlyList<MatrixNode> BuscarRuta(string origen, string destino, Func<string, bool> validarDestino)
        {
            if (validarDestino == null)
                throw new ArgumentNullException(nameof(validarDestino));

            if (string.IsNullOrWhiteSpace(origen) || string.IsNullOrWhiteSpace(destino))
                return Array.Empty<MatrixNode>();

            if (!validarDestino(destino.Trim()))
                return Array.Empty<MatrixNode>();

            var start = SearchBySatelliteId(origen.Trim());
            var end = SearchBySatelliteId(destino.Trim());

            if (start == null || end == null)
                return Array.Empty<MatrixNode>();

            return FindRoute(start, end);
        }

        private IReadOnlyList<MatrixNode> FindRoute(MatrixNode start, MatrixNode end)
        {
            if (ReferenceEquals(start, end))
                return new List<MatrixNode> { start };

            var queue = new Queue<MatrixNode>();
            var visited = new HashSet<MatrixNode>();
            var parent = new Dictionary<MatrixNode, MatrixNode>();

            queue.Enqueue(start);
            visited.Add(start);

            while (queue.Count > 0)
            {
                var current = queue.Dequeue();
                foreach (var neighbor in GetNeighbors(current))
                {
                    if (neighbor == null || visited.Contains(neighbor))
                        continue;

                    visited.Add(neighbor);
                    parent[neighbor] = current;
                    if (ReferenceEquals(neighbor, end))
                        return BuildPath(start, end, parent);

                    queue.Enqueue(neighbor);
                }
            }

            return Array.Empty<MatrixNode>();
        }

        private static IReadOnlyList<MatrixNode> BuildPath(MatrixNode start, MatrixNode end, Dictionary<MatrixNode, MatrixNode> parent)
        {
            var path = new List<MatrixNode>();
            var current = end;
            while (current != null)
            {
                path.Insert(0, current);
                if (ReferenceEquals(current, start))
                    break;

                parent.TryGetValue(current, out current);
            }

            return path;
        }

        private IEnumerable<MatrixNode?> GetNeighbors(MatrixNode node)
        {
            yield return node.Up;
            yield return node.Down;
            yield return node.Left;
            yield return node.Right;
        }

        private HeaderNode GetOrCreateRowHeader(int row)
        {
            if (rowHeaders == null)
            {
                rowHeaders = new HeaderNode(row);
                return rowHeaders;
            }

            if (rowHeaders.Index > row)
            {
                var newHeader = new HeaderNode(row) { Next = rowHeaders };
                rowHeaders = newHeader;
                return newHeader;
            }

            var current = rowHeaders;
            while (current.Next != null && current.Next.Index < row)
            {
                current = current.Next;
            }

            if (current.Index == row)
                return current;

            if (current.Next != null && current.Next.Index == row)
                return current.Next;

            var header = new HeaderNode(row) { Next = current.Next };
            current.Next = header;
            return header;
        }

        private HeaderNode GetOrCreateColHeader(int col)
        {
            if (colHeaders == null)
            {
                colHeaders = new HeaderNode(col);
                return colHeaders;
            }

            if (colHeaders.Index > col)
            {
                var newHeader = new HeaderNode(col) { Next = colHeaders };
                colHeaders = newHeader;
                return newHeader;
            }

            var current = colHeaders;
            while (current.Next != null && current.Next.Index < col)
            {
                current = current.Next;
            }

            if (current.Index == col)
                return current;

            if (current.Next != null && current.Next.Index == col)
                return current.Next;

            var header = new HeaderNode(col) { Next = current.Next };
            current.Next = header;
            return header;
        }

        private void InsertIntoRow(HeaderNode rowHeader, MatrixNode node)
        {
            if (rowHeader.Access == null)
            {
                rowHeader.Access = node;
                return;
            }

            if (rowHeader.Access.Col > node.Col)
            {
                node.Right = rowHeader.Access;
                rowHeader.Access.Left = node;
                rowHeader.Access = node;
                return;
            }

            var current = rowHeader.Access;
            while (current.Right != null && current.Right.Col < node.Col)
            {
                current = current.Right;
            }

            if (current.Col == node.Col)
            {
                current.SatelliteId = node.SatelliteId;
                current.Data = node.Data;
                return;
            }

            node.Right = current.Right;
            if (current.Right != null)
                current.Right.Left = node;

            current.Right = node;
            node.Left = current;
        }

        private void InsertIntoColumn(HeaderNode colHeader, MatrixNode node)
        {
            if (colHeader.Access == null)
            {
                colHeader.Access = node;
                return;
            }

            if (colHeader.Access.Row > node.Row)
            {
                node.Down = colHeader.Access;
                colHeader.Access.Up = node;
                colHeader.Access = node;
                return;
            }

            var current = colHeader.Access;
            while (current.Down != null && current.Down.Row < node.Row)
            {
                current = current.Down;
            }

            if (current.Row == node.Row)
            {
                current.SatelliteId = node.SatelliteId;
                current.Data = node.Data;
                return;
            }

            node.Down = current.Down;
            if (current.Down != null)
                current.Down.Up = node;

            current.Down = node;
            node.Up = current;
        }

        private static HeaderNode? FindHeader(HeaderNode? first, int index)
        {
            var current = first;
            while (current != null)
            {
                if (current.Index == index)
                    return current;

                if (current.Index > index)
                    return null;

                current = current.Next;
            }

            return null;
        }
    }
}
