import { useEffect, useState } from 'react';
import DashboardGeneral from '../../common/components/dashboardGeneral';
import DashboardHeatmap from '../../common/components/dashboardHeatmap';
import DashboardInputs from '../../common/components/dashboardInputs';
import DashboardMessages from '../../common/components/dashboardMessages';
import DashboardPlaybacks from '../../common/components/dashboardPlaybacks';
import { getDummyData } from '../../data/dummyData';

export default function Dashboard() {

  const [data, setData] = useState(getDummyData);
  const [loading, setLoading] = useState(false);

  async function getData() {
    Promise.all([
      fetch(
        'http://haarlem.visualproductions.nl:84/ajax/get/index/status'
      ).then((response) => response.json()),

      fetch(
        'http://haarlem.visualproductions.nl:84/ajax/get/playback/playback'
      ).then((response) => response.json()),

      fetch(
        'http://haarlem.visualproductions.nl:84/ajax/get/monitor/tcp/in'
      ).then((response) => response.json()),

      fetch(
        'http://haarlem.visualproductions.nl:84/ajax/get/monitor/channels/0'
      ).then((response) => response.json()),

      fetch(
        'http://haarlem.visualproductions.nl:84/ajax/get/monitor/channels/256'
      ).then((response) => response.json()),


    ]).then((data) => {
      console.log(data);
      setData(data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(data[2])

  return (
    <div className='dashboard'>
      <DashboardGeneral   data={data[0]}/>
      <DashboardInputs    data={data[0]}/>
      <DashboardPlaybacks data={data[1]}/>
      <DashboardMessages  data={data[2]}/>
      <DashboardHeatmap   data={[...data[3].channels.data, ...data[4].channels.data]}/>

    </div>
  );
}
