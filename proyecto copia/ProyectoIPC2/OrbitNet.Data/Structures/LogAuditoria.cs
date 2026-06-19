namespace OrbitNet.Data.Structures;

public sealed class LogAuditoria
{
    private sealed class Nodo
    {
        public required string Severity { get; init; }
        public required string Message { get; init; }
        public Nodo? Siguiente { get; set; }
    }

    private Nodo? mxHead;
    private Nodo? mxTail;

    public void WriteEvent(string severity, string msg)
    {
        var mxNodo = new Nodo
        {
            Severity = severity,
            Message = msg,
            Siguiente = null
        };

        if (mxHead is null)
        {
            mxHead = mxNodo;
            mxTail = mxNodo;
            return;
        }

        mxTail!.Siguiente = mxNodo;
        mxTail = mxNodo;
    }

    public (string Severity, string Message)[] GetEntries()
    {
        var mxEntries = Array.Empty<(string Severity, string Message)>();
        var mxNodo = mxHead;
        while (mxNodo is not null)
        {
            Array.Resize(ref mxEntries, mxEntries.Length + 1);
            mxEntries[^1] = (mxNodo.Severity, mxNodo.Message);
            mxNodo = mxNodo.Siguiente;
        }

        return mxEntries;
    }
}