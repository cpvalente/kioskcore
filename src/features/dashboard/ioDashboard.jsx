import { useEffect, useState } from 'react';
import DashboardGeneral from '../../common/components/dashboardGeneral';
import DashboardGPI from '../../common/components/dashboardGPI';
import DashboardGPO from '../../common/components/dashboardGPO';
import DashboardInputs from '../../common/components/dashboardInputs';
import DashboardMessages from '../../common/components/dashboardMessages';
import Error from '../../common/components/error';
import { getDummyData } from '../../data/dummyData';

export default function IODashboard({ device }) {
  const [data, setData] = useState(getDummyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getIOCoreData() {
    const url = device.ipaddress;
    Promise.all([
      fetch(`${url}ajax/get/index/status`).then((response) => response.json()),

      fetch(`${url}ajax/get/monitor/tcp/in`).then((response) =>
        response.json()
      ),
    ])
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(function (err) {
        setError(true);
        console.log(err.message);
      });
  }

  useEffect(() => {
    getIOCoreData(device.type);
  }, []);

  if (loading && !error)
    return (
      <div className='loadingSkeleton io'>
        <div className='card dashboardGeneralSkeleton' />
        <div className='card dashboardInputsSkeleton' />
        <div className='card dashboardMessagesSkeleton' />
        <div className='card dashboardGPISkeleton' />
        <div className='card dashboardGPOSkeleton' />
      </div>
    );

  if (error) return <Error />;

  return (
    <div className='dashboard io'>
    <DashboardGeneral  data={data[0]} />
    <DashboardInputs   data={data[0]} />
    <DashboardMessages data={data[1]} />
    <DashboardGPI      data={data[0].gpi}/>
    <DashboardGPO      data={data[0].gpo}/>
  </div>
  );
}
