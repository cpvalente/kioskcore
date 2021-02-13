export default function DashboardPlaybacks({ data }) {
  return (
    <div className='card card-playback indicatorlist'>
      <h3 className='cardTitle'>Playback Status</h3>
      {data.playbacks.map((pb, index) => (
        <div className={pb.state === 1 ? 'indicator active' : 'indicator'} key={index}>
          <span>
            {pb.cue}/{pb.list}
          </span>
        </div>
      ))}
    </div>
  );
}
