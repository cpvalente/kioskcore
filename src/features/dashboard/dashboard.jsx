import { useParams } from 'react-router-dom';
import Error from '../../common/components/error';
import CueDashboard from './cueDashboard';
import './dashboard.css';
import IODashboard from './ioDashboard';
import QuadDashboard from './quadDashboard';

export default function Dashboard({ sleeping, genData }) {
  // check which device is selected
  const params = useParams();

  // get all devices from config file
  const devices = window.config.devices;

  // get device config
  // eslint-disable-next-line eqeqeq
  const deviceConfig = devices.find((d) => d.id == params.id);

  if (deviceConfig.type === 'Quadcore') {
    return <QuadDashboard
      deviceConfig={deviceConfig}
      sleeping={sleeping}
      genData={genData}
    />;
  } else if (deviceConfig.type === 'IOCore') {
    return <IODashboard
      deviceConfig={deviceConfig}
      sleeping={sleeping}
      genData={genData}
    />;
  } else if (deviceConfig.type === 'Cuecore') {
    return <CueDashboard
      deviceConfig={deviceConfig}
      sleeping={sleeping}
      genData={genData}
    />;

  } else return <Error />;
}
