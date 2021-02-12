export default function Heatmap( { heatmapData }) {

  return (
    <div className='heatmapgrid'>
      {heatmapData.map((d) => {
        const val = (d + 5) / 255.0;
        return (
          <div className='node' style={{ backgroundColor: `rgba(38, 218, 173, ${val})`}}>
          </div>
        );
      })}
    </div>
  );
}
