import { intRegex } from '../../data/utils';
import './components.css';
import Indicator from './indicator';
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
  for (const d in data) {
    const index = parseInt(d.match(intRegex)) - 1;
    const val = data[d];

    if (d.includes('Value')) {
      gpi[index].gpiValue = val;
    } else {
      // make sure it has a name
      if (val === '') gpi[index].gpiName = `GPI ${index + 1}`;
      else gpi[index].gpiName = val;
    }
  }

  return (
    <div className='card card-gpi '>
      <h3 className='cardTitle'>GPI</h3>
      <div className='cardContent indicatorlist'>
        {gpi.map((g, index) => (
          <Indicator
            active={
              g.gpiValue !== 'Off' &&
              g.gpiValue !== '0%' &&
              g.gpiValue !== 0 &&
              g.gpiValue !== ''
            }
            main={g.gpiValue}
            secondary={g.gpiName}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
