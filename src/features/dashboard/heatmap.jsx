export default function Heatmap() {

  let data = []
  for (let i = 0; i < 512; i++ ) {
    let random = Math.floor(Math.random() * 255);
    data.push(random)
  }

  return (
    <div className='heatmapgrid'>
      {data.map((d) => {
        const val = d / 255.0;
        return (
          <div className='node' style={{ backgroundColor: `rgba(38, 218, 173, ${val})`}}>
          </div>
        );
      })}
    </div>
  );
}
