import './components.css';
import './indicator.css';

export default function DashboardInputs({ data }) {

  const reader = {
    dd: 'DMX',
    d1: 'DMX A',
    d2: 'DMX B',
    d3: 'DMX C',
    d4: 'DMX D',
    midi: 'MIDI',
    m: 'MIDI',
    a: 'Art-Net',
    s: 'sACN',
    t: 'TCP',
    u: 'UDP',
    o: 'OSC',
    rs232: 'RS-232',
  };

  let hasDMX = false;
  let isDMXActive = false;
  let rx = {};

  for (let d in data) {
    // merge all DMX Inputs into one indicator
    if (d === 'd1' || d === 'd2' || d === 'd3' || d === 'd4') {
      hasDMX = true;

      if (isDMXActive !== true) {
        if (data[d] === 'yes') {
          isDMXActive = true;
        }
      }
    } else {
      rx[reader[d]] = data[d];
    }
  }
  if (hasDMX && !isDMXActive) {
    rx[reader['dd']] = 'no';
  }
  if (hasDMX && isDMXActive) {
    rx[reader['dd']] = 'yes';
  }

  return (
    <div className='card card-inputs indicatorlist'>
      <h3 className='cardTitle'>Inputs</h3>

      {Object.entries(rx).map(([key, value]) => (
        <div
          className={value === 'yes' ? 'indicator active' : 'indicator'}
          key={key}
        >
          <span>{key}</span>
        </div>
      ))}
    </div>
  );
}
