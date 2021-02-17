import './components.css';
import Indicator from './indicator';

export default function DashboardPlaybacks({ data }) {
  return (
    <div className='card card-playback'>
      <h3 className='cardTitle'>Playback Status</h3>
      <div className='cardContent indicatorlist'>
        {data.map((pb, index) => (
          <Indicator
          active={pb.state === 1}
          main={`${(Number.isInteger(pb.cue) ? pb.cue + 1 : pb.cue )} / ${pb.list}`}
          secondary={pb.label}
          key={index}
        />
        ))}
        </div>
    </div>
  );
}
