export default function Dashboard() {
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
      <div class='card card-general'>
        <h3 className='cardTitle'>{data.general.label}</h3>
        <ul>
          <li>
            <span>Last Seen:</span> <span>-------</span>
          </li>
          <li>
            <span>Uptime:</span> <span>{data.general.uptime}</span>
          </li>
        </ul>
      </div>
      <div class='card card-network'>
        <h3 className='cardTitle'>Network</h3>
        <ul>
          <li>
            <span>Date:</span> <span>{data.time.date}</span>
          </li>
          <li>
            <span>Time:</span> <span>{data.time.time}</span>
          </li>
          <li>
            <span>FW:</span> <span>{data.general.firmwareversion}</span>
          </li>
          <li>
            <span>IP:</span> <span>{data.network.ipaddress}</span>
          </li>
          <li>
            <span>SUB:</span> <span>{data.network.subnetmask}</span>
          </li>
        </ul>
      </div>
      <div class='card card-inputs indicatorlist'>

        <div className='indicator'>DMX A</div>
        <div className='indicator'>DMX B</div>
        <div className='indicator'>MIDI</div>
        <div className='indicator'>Art-Net</div>
        <div className='indicator'>sACN</div>
        <div className='indicator'>TCP</div>
        <div className='indicator'>UDP</div>
        <div className='indicator'>OSC</div>
      </div>
      <div class='card card-playback indicatorlist'>

        <div className='indicator'>{data.playbacks.playback1.name}</div>
        <div className='indicator'>{data.playbacks.playback2.name}</div>
        <div className='indicator'>{data.playbacks.playback3.name}</div>
        <div className='indicator'>{data.playbacks.playback4.name}</div>
        <div className='indicator'>{data.playbacks.playback5.name}</div>
        <div className='indicator'>{data.playbacks.playback6.name}</div>
      </div>
      <div class='card card-messages'>
        <h3 className='cardTitle'>Messages</h3>
        <ul>

          <li>
            <span>15:04:10</span> <span>127.0.0.1</span> <span>UDP</span>
            <span>'UDP testing'</span>
          </li>

          <li>
            <span>15:04:10</span> <span>127.0.0.1</span> <span>TCP</span>
            <span>'TCP testing'</span>
          </li>

          <li>
            <span>15:04:10</span> <span>127.0.0.1</span> <span>OSC</span>
            <span>'OSC testing'</span>
          </li>

        </ul>
      </div>
      <div class='card card-heatmap'>
        <h3 className='cardTitle'>Heatmap</h3>
      </div>
    </div>
  );
}
