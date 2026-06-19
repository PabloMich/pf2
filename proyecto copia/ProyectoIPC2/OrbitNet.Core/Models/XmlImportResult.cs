using OrbitNet.Data.Structures;

namespace OrbitNet.Core.Models;

public sealed class XmlImportResult
{
    private SatelliteImportItem[] mxSatellites = [];

    private string[] mxErrors = [];

    public SatelliteImportItem[] Satellites => mxSatellites;

    public string[] Errors => mxErrors;

    public LogAuditoria Auditoria { get; } = new();

    public XmlValidationError? ValidationError { get; set; }

    public bool Success => Errors.Length == 0;

    public void AddSatellite(SatelliteImportItem satellite)
    {
        Array.Resize(ref mxSatellites, mxSatellites.Length + 1);
        mxSatellites[^1] = satellite;
    }

    public void AddError(string errorMessage)
    {
        Array.Resize(ref mxErrors, mxErrors.Length + 1);
        mxErrors[^1] = errorMessage;
    }
}