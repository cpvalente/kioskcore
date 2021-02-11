export default function Dashboard() {

  return (
    <div className='dashboard'>
      <div class='card card-general'>
        <h3 className='cardTitle'>General</h3>
        <ul>
          <li>
            <span>MyCueCore</span>
          </li>
          <li>
            <span>Last Seen:</span> <span>-------</span>
          </li>
          <li>
            <span>Uptime:</span> <span>-------</span>
          </li>
        </ul>
      </div>
      <div class='card card-network'>
        <h3 className='cardTitle'>Network</h3>
        <ul>
          <li>
            <span>Date:</span> <span>-------</span>
          </li>
          <li>
            <span>Time:</span> <span>-------</span>
          </li>
          <li>
            <span>FW:</span> <span>-------</span>
          </li>
          <li>
            <span>IP:</span> <span>-------</span>
          </li>
          <li>
            <span>SUB:</span> <span>-------</span>
          </li>
        </ul>
      </div>
      <div class='card card-inputs'>
        <h3 className='cardTitle'>Inputs</h3>
        <span>DMX A</span> <span>-------</span>
        <span>DMX B</span> <span>-------</span>
        <span>MIDI</span> <span>-------</span>
        <span>Art-Net</span> <span>-------</span>
        <span>sACN</span> <span>-------</span>
        <span>TCP</span> <span>-------</span>
        <span>UDP</span> <span>-------</span>
        <span>OSC</span> <span>-------</span>
      </div>
      <div class='card card-playback'>
        <h3 className='cardTitle'>Playback</h3>
        <ul>
          <li>
            <span>1</span> <span>-------</span>
          </li>
          <li>
            <span>2</span> <span>-------</span>
          </li>
          <li>
            <span>3</span> <span>-------</span>
          </li>
          <li>
            <span>4</span> <span>-------</span>
          </li>
          <li>
            <span>5</span> <span>-------</span>
          </li>
          <li>
            <span>6</span> <span>-------</span>
          </li>
        </ul>
      </div>
      <div class='card card-messages'>
        <h3 className='cardTitle'>Messages</h3>
        <ul>
          <li>
            <span>Time</span> <span>From</span> <span>Type</span>{' '}
            <span>Data</span>
          </li>
          <li>
            <span>Time</span> <span>From</span> <span>Type</span>{' '}
            <span>Data</span>
          </li>
          <li>
            <span>Time</span> <span>From</span> <span>Type</span>{' '}
            <span>Data</span>
          </li>
          <li>
            <span>Time</span> <span>From</span> <span>Type</span>{' '}
            <span>Data</span>
          </li>
          <li>
            <span>Time</span> <span>From</span> <span>Type</span>{' '}
            <span>Data</span>
          </li>
          <li>
            <span>Time</span> <span>From</span> <span>Type</span>{' '}
            <span>Data</span>
          </li>
        </ul>
      </div>
      <div class='card card-heatmap'>
        <h3 className='cardTitle'>Heatmap</h3>
      </div>
    </div>
  );
}
