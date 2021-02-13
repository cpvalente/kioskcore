import './components.css';
import './indicator.css';

export default function DashboardGPI({ data }) {
  // make empty array to hold GPI Status
  let gpi = [];

  // initialize array with objects
  for (let i = 0; i < 8; i++) {
    const init = { gpiValue: '', gpiName: '' };
    gpi.push(init);
  }

  // populate array with data
  for (let d in data) {
    let regex = /\d+/g;
    let index = parseInt(d.match(regex)) - 1;

    if (d.includes('Value')) {
      gpi[index].gpiValue = data[d];
    } else {
      if (data[d] === '') gpi[index].gpiName = `GPI ${index}`;
      else gpi[index].gpiName = data[d];
    }
  }

  return (
    <div className='card card-gpi indicatorlist'>
      <h3 className='cardTitle'>GPI</h3>
      {gpi.map((g, index) => (
        <div
          className={g.gpiValue === 'Off' ? 'indicator' : 'indicator active'}
          key={index}
        >
          <span>{g.gpiName} / {g.gpiValue}</span>
        </div>
      ))}
    </div>
  );
}
