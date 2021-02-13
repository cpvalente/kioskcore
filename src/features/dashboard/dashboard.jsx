import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardGeneral from '../../common/components/dashboardGeneral';
import DashboardHeatmap from '../../common/components/dashboardHeatmap';
import DashboardInputs from '../../common/components/dashboardInputs';
import DashboardMessages from '../../common/components/dashboardMessages';
import DashboardPlaybacks from '../../common/components/dashboardPlaybacks';
import Error from '../../common/components/error';
import { config } from '../../config';
import { getDummyData } from '../../data/dummyData';
import CueDashboard from './cueDashboard';
import './dashboard.css';
import IODashboard from './ioDashboard';
import QuadDashboard from './quadDashboard';

export default function Dashboard() {

  const params = useParams();
  // eslint-disable-next-line eqeqeq
  const device = config.devices.find((d) => d.id == params.id);


  if (device.type === 'Quadcore') {
    return <QuadDashboard device={device} />
  }

  else if (device.type === 'IOCore') {
    return <IODashboard device={device} />
  }

  else if (device.type === 'IOCore') {
    return <CueDashboard device={device} />
  }

  else return <Error />;
}
