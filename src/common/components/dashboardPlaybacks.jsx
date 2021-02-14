import './components.css';

export default function DashboardPlaybacks({ data }) {
  return (
    <div className='card card-playback'>
      <h3 className='cardTitle'>Playback Status</h3>
      <div className='cardContent indicatorlist'>
        {data.map((pb, index) => (
          <div
            className={pb.state === 1 ? 'indicator active' : 'indicator'}
            key={index}
          >
            <span>
              {Number.isInteger(pb.cue) ? pb.cue + 1 : pb.cue}/{pb.list}
            </span>
          </div>
        ))}
        </div>
    </div>
  );
}
