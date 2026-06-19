using OrbitNet.TDAs.Services;

namespace OrbitNet.Tests;

public class XmlXPathIngestionServiceTests
{
    [Fact]
    public void Parse_ReturnsSatellites_WhenXmlIsValid()
    {
        const string xml = """
        <root>
            <constelaciones_ecuatoriales>
                <satelite id="SAT-ECU-0012">
                    <nombre>Orbita Uno</nombre>
                    <enlace_ip>10.0.0.50</enlace_ip>
                    <coordenadas>14.5891,-90.5555</coordenadas>
                </satelite>
            </constelaciones_ecuatoriales>
        </root>
        """;

        var service = new XmlXPathIngestionService();

        var result = service.Parse(xml);

        Assert.True(result.Success);
        Assert.Single(result.Satellites);
        Assert.Empty(result.Errors);
        Assert.Equal("SAT-ECU-0012", result.Satellites[0].Id);
        Assert.Equal("Orbita Uno", result.Satellites[0].Name);
        Assert.Equal("10.0.0.50", result.Satellites[0].IpAddress);
        Assert.Equal("14.5891,-90.5555", result.Satellites[0].Coordinates);
    }

    [Fact]
    public void Parse_ReturnsErrors_WhenXmlHasInvalidData()
    {
        const string xml = """
        <root>
            <constelaciones_polares>
                <satelite id="BAD-ID">
                    <nombre>Satélite Inválido</nombre>
                    <enlace_ip>999.0.0.1</enlace_ip>
                    <coordenadas>hola,mundo</coordenadas>
                </satelite>
            </constelaciones_polares>
        </root>
        """;

        var service = new XmlXPathIngestionService();

        var result = service.Parse(xml);

        Assert.False(result.Success);
        Assert.Empty(result.Satellites);
        Assert.NotEmpty(result.Errors);
        Assert.Equal("id", result.ValidationError?.Tag);
        Assert.Equal("El id 'BAD-ID' no cumple el formato SAT-ECU-0000 o SAT-POL-0000.", result.ValidationError?.Message);
        Assert.Contains("no cumple el formato", result.Errors[0]);
        Assert.NotEmpty(result.Auditoria.GetEntries());
    }

    [Fact]
    public void Parse_ReturnsXmlSyntaxErrorLine_WhenXmlIsMalformed()
    {
        const string xml = "<root><constelaciones_ecuatoriales><satelite id=\"SAT-ECU-0001\"></constelaciones_ecuatoriales>";

        var service = new XmlXPathIngestionService();

        var result = service.Parse(xml);

        Assert.False(result.Success);
        Assert.Empty(result.Satellites);
        Assert.NotNull(result.ValidationError);
        Assert.Equal("XML", result.ValidationError?.Tag);
        Assert.Contains("El XML no es válido", result.ValidationError?.Message);
        Assert.True(result.ValidationError?.LineNumber >= 1);
        Assert.NotEmpty(result.Auditoria.GetEntries());
    }

    [Fact]
    public void Parse_StopsOnFirstInvalidSatellite_WithoutPartialResults()
    {
        const string xml = """
        <root>
            <constelaciones_ecuatoriales>
                <satelite id="SAT-ECU-0001">
                    <nombre>Satélite Valido</nombre>
                    <enlace_ip>10.0.0.10</enlace_ip>
                    <coordenadas>10.1234,-20.5678</coordenadas>
                </satelite>
                <satelite id="SAT-ECU-0002">
                    <nombre>Satélite Inválido</nombre>
                    <enlace_ip>999.999.999.999</enlace_ip>
                    <coordenadas>14.5891,-90.5555</coordenadas>
                </satelite>
            </constelaciones_ecuatoriales>
        </root>
        """;

        var service = new XmlXPathIngestionService();

        var result = service.Parse(xml);

        Assert.False(result.Success);
        Assert.Empty(result.Satellites);
        Assert.Single(result.Errors);
        Assert.Contains("999.999.999.999", result.Errors[0]);
    }
}