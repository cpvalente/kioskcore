import { useEffect, useRef, useState } from 'react';
import DashboardGeneral from '../../common/components/dashboardGeneral';
import DashboardHeatmap from '../../common/components/dashboardHeatmap';
import DashboardInputs from '../../common/components/dashboardInputs';
import DashboardMessages from '../../common/components/dashboardMessages';
import DashboardPlaybacks from '../../common/components/dashboardPlaybacks';
import Error from '../../common/components/error';
import { getDummyData } from '../../data/dummyData';
import { fetchPlaybackData } from '../../data/fetchAPI';

export default function CueDashboard( props ) {
  const [data, setData] = useState(getDummyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isMountedRef = useRef(null);

  let deviceData = {
    lastSeen : 'Retrieving data....',
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
    receiving: {}
  };

  if (props.genData) {
    let dd = props.genData.find((d) => d.id == props.deviceConfig.id);
    if (dd) {
      deviceData = dd;
    }
  }

  async function getCuecoreData() {
    const d = await fetchPlaybackData(deviceData.ipaddress);
    // keep getting an object here (the promise)
    if (isMountedRef.current) {
      setData(d);
    }
    setLoading(false);
  }


  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useEffect(() => {
    isMountedRef.current = true;
    getCuecoreData();

    return function cleanup() {
      isMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    if (isMountedRef.current && !loading && !props.sleeping) {
      getCuecoreData();
    }  }, 3000);

  if (loading && (deviceData === undefined))
    return (
      <div className='loadingSkeleton cue'>
        <div className='card dashboardGeneralSkeleton' />
        <div className='card dashboardInputsSkeleton' />
        <div className='card dashboardPlaybacksSkeleton' />
        <div className='card dashboardMessagesSkeleton' />
        <div className='card dashboardHeatmapSkeleton' />
      </div>
    );

  // if (error) return <Error />;

  return (
    <div className='dashboard cue'>
      <DashboardGeneral
        label = {deviceData.gen.lbl}
        lastSeen = {deviceData.lastSeen}
        upt = {deviceData.gen.upt}
        date = {deviceData.gen.d}
        time = {deviceData.gen.t}
        ip = {deviceData.ip.ip}
        sn = {deviceData.ip.sn}
      />
      <DashboardInputs data={deviceData.receiving} />
      <DashboardPlaybacks data={data[0].playbacks} />
      <DashboardMessages
        ipaddress={props.deviceConfig.ipaddress}
        type={props.deviceConfig.type}
        sleeping={props.sleeping}
      />
      <DashboardHeatmap
        url={props.deviceConfig.ipaddress}
        sleeping={props.sleeping}
      />
    </div>
  );
}
