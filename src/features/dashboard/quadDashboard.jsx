import { useEffect, useState } from 'react';
import DashboardGeneral from '../../common/components/dashboardGeneral';
import DashboardHeatmap from '../../common/components/dashboardHeatmap';
import DashboardInputs from '../../common/components/dashboardInputs';
import DashboardMessages from '../../common/components/dashboardMessages';
import DashboardPlaybacks from '../../common/components/dashboardPlaybacks';
import Error from '../../common/components/error';
import { getDummyData } from '../../data/dummyData';

export default function QuadDashboard({ device }) {
  const [data, setData] = useState(getDummyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getQuadcoreData() {
    const url = device.ipaddress;
    Promise.all([
      fetch(`${url}ajax/get/index/status`).then((response) => response.json()),

      fetch(`${url}ajax/get/playback/playback`).then((response) =>
        response.json()
      ),

      fetch(`${url}ajax/get/monitor/tcp/in`).then((response) =>
        response.json()
      ),

      fetch(`${url}ajax/get/monitor/channels/0`).then((response) =>
        response.json()
      ),

      fetch(`${url}ajax/get/monitor/channels/256`).then((response) =>
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
    getQuadcoreData(device.type);
  }, []);

  if (loading && !error)
    return (
      <div className='loadingSkeleton quad'>
        <div className='card dashboardGeneralSkeleton' />
        <div className='card dashboardInputsSkeleton' />
        <div className='card dashboardPlaybacksSkeleton' />
        <div className='card dashboardMessagesSkeleton' />
        <div className='card dashboardHeatmapSkeleton' />
      </div>
    );

  if (error) return <Error />;

  return (
    <div className='dashboard quad'>
      <DashboardGeneral   data={data[0]} />
      <DashboardInputs    data={data[0].receiving} />
      <DashboardPlaybacks data={data[1].playbacks} />
      <DashboardMessages  data={data[2]} />
      <DashboardHeatmap
        data={[...data[3].channels.data, ...data[4].channels.data]}
      />
    </div>
  );
}
