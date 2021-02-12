export default function Dashboard() {
  const lastSeen = '11.02.2021 19:59:23';
  const data = {
    general: {
      label: 'MyCueCore',
      uptime: '7d 4h 26m',
      firmwareversion: '1.38',
    },
    network: {
      ipaddress: '192.168.1.14',
      subnetmask: '255.255.255.0',
    },
    time: {
      date: '2020-01-13',
      time: '23:51:29',
    },
    playbacks: {
      playback1: {
        name: 'Playback 1',
        status: 0,
      },
      playback2: {
        name: 'Playback 2',
        status: 0,
      },
      playback3: {
        name: 'Playback 3',
        status: 0,
      },
      playback4: {
        name: 'Playback 4',
        status: 0,
      },
      playback5: {
        name: 'Playback 5',
        status: 0,
      },
      playback6: {
        name: 'Playback 6',
        status: 0,
      },
    },
    receiving: {
      dmxA: {
        status: 0,
      },
      dmxB: {
        status: 0,
      },
      MIDI: {
        status: 0,
      },
      ArtNet: {
        status: 0,
      },
      sACN: {
        status: 0,
      },
      TCP: {
        status: 0,
      },
      UDP: {
        status: 0,
      },
      OSC: {
        status: 0,
      },
    },
  };

  return (
    <div className='dashboard'>
      <div className='card card-general'>
        <h3 className='cardTitle'>{data.general.label}</h3>
        <table>
          <tbody>
          <tr>
            <td className='field'>Last seen:</td>
            <td>{lastSeen}</td>
          </tr>
          <tr>
            <td className='field'>Uptime:</td>
            <td>{data.general.uptime}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className ='card card-network'>
        <h3 className='cardTitle'>Network</h3>
        <table>
          <tbody>
          <tr>
            <td className='field'>Date:</td>
            <td>{data.time.date}</td>
          </tr>
          <tr>
            <td className='field'>Time:</td>
            <td>{data.time.time}</td>
          </tr>
          <tr>
            <td className='field'>Firmware:</td>
            <td>{data.general.firmwareversion}</td>
          </tr>
          <tr>
            <td className='field'>IP Address:</td>
            <td>{data.network.ipaddress}</td>
          </tr>
          <tr>
            <td className='field'>Subnet:</td>
            <td>{data.network.subnetmask}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className='card card-inputs indicatorlist'>
        <h3 className='cardTitle'>Inputs</h3>
        <div className='indicator'>DMX A</div>
        <div className='indicator'>DMX B</div>
        <div className='indicator'>MIDI</div>
        <div className='indicator'>Art-Net</div>
        <div className='indicator active'>sACN</div>
        <div className='indicator'>TCP</div>
        <div className='indicator'>UDP</div>
        <div className='indicator'>OSC</div>
      </div>
      <div className='card card-playback indicatorlist'>
        <h3 className='cardTitle'>Playback Status</h3>
        <div className='indicator active'>{data.playbacks.playback1.name}</div>
        <div className='indicator'>{data.playbacks.playback2.name}</div>
        <div className='indicator'>{data.playbacks.playback3.name}</div>
        <div className='indicator'>{data.playbacks.playback4.name}</div>
        <div className='indicator'>{data.playbacks.playback5.name}</div>
        <div className='indicator'>{data.playbacks.playback6.name}</div>
      </div>
      <div className='card card-messages'>
        <h3 className='cardTitle'>Messages</h3>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>From</th>
              <th>Protocol</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>15:04:10</td>
              <td>127.0.0.1</td>
              <td>UDP</td>
              <td>'UDP testing'</td>
            </tr>
            <tr>
              <td>15:04:00</td>
              <td>127.0.0.1</td>
              <td>TCP</td>
              <td>'TCP testing'</td>
            </tr>
            <tr>
              <td>15:03:10</td>
              <td>127.0.0.1</td>
              <td>OSC</td>
              <td>'OSC testing'</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='card card-heatmap'>
        <h3 className='cardTitle'>Heatmap</h3>
      </div>
    </div>
  );
}
