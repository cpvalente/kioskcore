import { useEffect, useState } from 'react';
import { getData, getDummyData } from '../../data/dummyData';
import Heatmap from './heatmap';

export default function Dashboard() {
  const lastSeen = '11.02.2021 19:59:23';
  const [data, setData] = useState(getDummyData);
  const [loading, setLoading] = useState(false);

  console.log(data)

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
      <div className='card card-general'>
        <h3 className='cardTitle'>{data[0].gen.lbl}</h3>
        <table>
          <tbody>
            <tr>
              <td className='field'>Last seen:</td>
              <td>{lastSeen}</td>
            </tr>
            <tr>
              <td className='field'>Uptime:</td>
              <td>{data[0].gen.upt}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='card card-network'>
        <h3 className='cardTitle'>Network</h3>
        <table>
          <tbody>
            <tr>
              <td className='field'>Date:</td>
              <td>{data[0].time.d}</td>
            </tr>
            <tr>
              <td className='field'>Time:</td>
              <td>{data[0].time.t}</td>
            </tr>
            <tr>
              <td className='field'>Firmware:</td>
              <td>{data[0].gen.fw}</td>
            </tr>
            <tr>
              <td className='field'>IP Address:</td>
              <td>{data[0].ip.ip}</td>
            </tr>
            <tr>
              <td className='field'>Subnet:</td>
              <td>{data[0].ip.sn}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='card card-inputs indicatorlist'>
        <h3 className='cardTitle'>Inputs</h3>
        <div
          className={
            data[0].receiving.d1 === 'yes' ? 'indicator active' : 'indicator'
          }
        >
          DMX A
        </div>
        <div
          className={
            data[0].receiving.d2 === 'yes' ? 'indicator active' : 'indicator'
          }
        >
          DMX B
        </div>
        <div
          className={
            data[0].receiving.midi === 'yes' ? 'indicator active' : 'indicator'
          }
        >
          MIDI
        </div>
        <div
          className={
            data[0].receiving.a === 'yes' ? 'indicator active' : 'indicator'
          }
        >
          Art-Net
        </div>
        <div
          className={
            data[0].receiving.s === 'yes' ? 'indicator active' : 'indicator'
          }
        >
          sACN
        </div>
        <div
          className={
            data[0].receiving.t === 'yes' ? 'indicator active' : 'indicator'
          }
        >
          TCP
        </div>
        <div
          className={
            data[0].receiving.u === 'yes' ? 'indicator active' : 'indicator'
          }
        >
          UDP
        </div>
        <div
          className={
            data[0].receiving.o === 'yes' ? 'indicator active' : 'indicator'
          }
        >
          OSC
        </div>
      </div>
      <div className='card card-playback indicatorlist'>
        <h3 className='cardTitle'>Playback Status</h3>
        {data[1].playbacks.map((pb) => (
          <div className={pb.state === 1 ? 'indicator active' : 'indicator'}>
            <span>{pb.label}</span>
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
              <th>Timestamp</th>
              <th>From</th>
              <th>Protocol</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {data[2].tcpIn.map((tcp) => (
              <tr>
                <td>15:04:10</td>
                <td>{tcp.ip}</td>
                <td>TCP</td>
                <td>{tcp.arg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='card card-heatmap'>
        <h3 className='cardTitle'>Heatmap</h3>
            <Heatmap heatmapData={
              [...data[3].channels.data, ...data[4].channels.data]
            }/>
      </div>
    </div>
  );
}
