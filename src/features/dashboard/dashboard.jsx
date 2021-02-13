import { useEffect, useState } from 'react';
import DashboardGeneral from '../../common/components/dashboardGeneral';
import DashboardInputs from '../../common/components/dashboardInputs';
import { getData, getDummyData } from '../../data/dummyData';
import Heatmap from './heatmap';

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

  return (
    <div className='dashboard'>
      <DashboardGeneral data={data[0]}/>
      <DashboardInputs data={data[0]} />
      <div className='card card-playback indicatorlist'>
        <h3 className='cardTitle'>Playback Status</h3>
        {data[1].playbacks.map((pb) => (
          <div className={pb.state === 1 ? 'indicator active' : 'indicator'}>
            <span>
              {pb.cue}/{pb.list}
            </span>
          </div>
        ))}
      </div>
      <div className='card card-messages'>
        <h3 className='cardTitle'>Messages</h3>
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>Prot.</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {data[2].tcpIn.map((tcp) => (
              <tr>
                <td>{tcp.ip}</td>
                <td>TCP</td>
                <td>{tcp.arg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='card card-heatmap'>
        <h3 className='cardTitle'>DMX Output A</h3>
            <Heatmap heatmapData={
              [...data[3].channels.data, ...data[4].channels.data]
            }/>
      </div>
    </div>
  );
}
