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
    ArtNet: 'Art-Net',
    a: 'Art-Net',
    sACN: 'sACN',
    s: 'sACN',
    TCP: 'TCP',
    t: 'TCP',
    UDP: 'UDP',
    u: 'UDP',
    OSC: 'OSC',
    o: 'OSC',
    rs232: 'RS-232',
  };

  let hasDMX = false;
  let isDMXActive = false;
  let rx = {};

  // go through all rx
  // merge all DMX Inputs into one indicator
  for (let d in data) {
    // check if there is a DMX definition
    if (d === 'd1' || d === 'd2' || d === 'd3' || d === 'd4') {
      hasDMX = true;

      // if any of the DMX definitions is not active
      if (isDMXActive !== true) {
        // set flag to true if current dmx is active
        if (data[d] === 'yes') {
          isDMXActive = true;
        }
      }

      // if definition is not dmx, map to readable name
    } else {
      rx[reader[d]] = data[d];
    }
  }

  // dmx exists and it is not active
  if (hasDMX && !isDMXActive) {
    rx[reader['dd']] = 'no';
  }

  // dmx exists and it is active
  else if (hasDMX && isDMXActive) {
    rx[reader['dd']] = 'yes';
  }

  return (
    <div className='card card-inputs'>
      <h3 className='cardTitle'>Inputs</h3>
      <div className='cardContent indicatorlist'>
        {Object.entries(rx).map(([key, value]) => (
          <div
            className={value === 'yes' ? 'indicator active' : 'indicator'}
            key={key}
          >
            <span className='indicator-single'>{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
