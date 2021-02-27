import { intRegex } from '../../data/utils';
import './components.css';
import Indicator from './indicator';
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
  for (const d in data) {
    const index = parseInt(d.match(intRegex)) - 1;
    const val = data[d];

    if (d.includes('Value')) {
      gpo[index].gpoValue = val;
    } else {
      // make sure it has a name
      if (val === '') gpo[index].gpoName = `GPO ${index + 1}`;
      else gpo[index].gpoName = val;
    }
  }

  return (
    <div className='card card-gpo'>
      <h3 className='cardTitle'>GPO</h3>
      <div className='cardContent indicatorlist'>
        {gpo.map((g, index) => (
          <Indicator
            active={
              g.gpoValue !== 'Off' &&
              g.gpoValue !== '0%' &&
              g.gpoValue !== 0 &&
              g.gpoValue !== ''
            }
            main={g.gpoValue}
            secondary={g.gpoName}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
