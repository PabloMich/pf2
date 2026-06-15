namespace OrbitNet.TDAs.Models;

public sealed class XmlValidationError
{
    public string Tag { get; init; } = string.Empty;

    public string Message { get; init; } = string.Empty;

    public int? LineNumber { get; init; }
}