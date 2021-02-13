import './components.css';
import './indicator.css';

export default function DashboardGPO({ data }) {
  // make empty array to hold GPI Status
  let gpo = [];

  // initialize array with objects
  for (let i = 0; i < 8; i++) {
    const init = { gpoValue: '', gpoName: '' };
    gpo.push(init);
  }

  // populate array with data
  for (let d in data) {
    let regex = /\d+/g;
    let index = parseInt(d.match(regex)) - 1;

    if (d.includes('Value')) {
      gpo[index].gpoValue = data[d];
    } else {
      if (data[d] === '') gpo[index].gpoName = `GPO ${index}`;
      else gpo[index].gpoName = data[d];
    }
  }

  return (
    <div className='card card-gpo indicatorlist'>
      <h3 className='cardTitle'>GPO</h3>
      {gpo.map((g, index) => (
        <div
          className={g.gpoValue === 1 ? 'indicator active' : 'indicator'}
          key={index}
        >
          <span>{g.gpoName} / {g.gpoValue}</span>
        </div>
      ))}
    </div>
  );
}
