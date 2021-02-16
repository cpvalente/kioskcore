import { useParams } from 'react-router-dom';
import Error from '../../common/components/error';
import { config } from '../../config';
import CueDashboard from './cueDashboard';
import './dashboard.css';
import IODashboard from './ioDashboard';
import QuadDashboard from './quadDashboard';

export default function Dashboard({ sleeping }) {
  const params = useParams();
  // eslint-disable-next-line eqeqeq
  const device = config.devices.find((d) => d.id == params.id);

  if (device.type === 'Quadcore') {
    return <QuadDashboard device={device} sleeping={sleeping} />;
  } else if (device.type === 'IOCore') {
    return <IODashboard device={device} sleeping={sleeping} />;
  } else if (device.type === 'Cuecore') {
    return <CueDashboard device={device} sleeping={sleeping} />;
  } else return <Error />;
}
