import Heatmap from '../../features/dashboard/heatmap';

export default function DashboardHeatmap({ data }) {
  return (
    <div className='card card-heatmap'>
      <h3 className='cardTitle'>DMX Output A</h3>
      <Heatmap heatmapData={data} />
    </div>
  );
}
