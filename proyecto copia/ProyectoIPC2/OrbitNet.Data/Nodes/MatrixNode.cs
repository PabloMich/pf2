namespace OrbitNet.Data.Nodes
{
	public class MatrixNode
	{
		public int Row { get; set; }
		public int Col { get; set; }
		public string SatelliteId { get; set; }
		public object Data { get; set; }

		public MatrixNode Up { get; set; }
		public MatrixNode Down { get; set; }
		public MatrixNode Left { get; set; }
		public MatrixNode Right { get; set; }

		public MatrixNode(int row, int col, string satelliteId = null, object data = null)
		{
			Row = row;
			Col = col;
			SatelliteId = satelliteId;
			Data = data;
		}
	}
}
