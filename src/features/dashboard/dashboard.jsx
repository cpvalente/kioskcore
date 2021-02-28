import { useParams } from 'react-router-dom';
import Error from '../../common/components/error';
import { getFromStorage } from '../../data/sessionData';
import CueDashboard from './cueDashboard';
import './dashboard.css';
import IODashboard from './ioDashboard';
import QuadDashboard from './quadDashboard';

export default function Dashboard(props) {
  // check which device is selected
  const params = useParams();

  // get all devices from config file
  const devices = window.config.devices;

  // get device config
  // eslint-disable-next-line eqeqeq
  const deviceConfig = devices.find((d) => d.id == params.id);

  // get device data from Storage
  const deviceInStorage = getFromStorage(params.id);

  const deviceGenData = deviceInStorage ?? {
    lastSeen: 'Retrieving data....',
    gen: {
      serial: 'Retrieving data....',
      upt: 'Retrieving data....',
      lbl: 'Retrieving data....',
    },
    ip: {
      ip: 'Retrieving data....',
      sn: 'Retrieving data....',
    },
    time: {
      d: 'Retrieving data....',
      t: 'Retrieving data....',
    },
    receiving: {
      d1: '-',
      d2: '-',
      midi: '-',
      ArtNet: '-',
      sACN: '-',
      TCP: '-',
      UDP: '-',
      OSC: '-',
    },
  };

  if (deviceConfig.type === 'Quadcore') {
    return (
      <QuadDashboard
        deviceConfig={deviceConfig}
        deviceGenData={deviceGenData}
        sleeping={props.sleeping}
      />
    );
  } else if (deviceConfig.type === 'IOCore') {
    return (
      <IODashboard
        deviceConfig={deviceConfig}
        deviceGenData={deviceGenData}
        sleeping={props.sleeping}
      />
    );
  } else if (deviceConfig.type === 'Cuecore') {
    return (
      <CueDashboard
        deviceConfig={deviceConfig}
        deviceGenData={deviceGenData}
        sleeping={props.sleeping}
      />
    );
  } else return <Error />;
}
